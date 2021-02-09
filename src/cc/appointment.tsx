import { html } from "lit-html";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";
import {
	addMonths,
	AppointmentModel,
	CalendarItem,
	generateCalendar,
	getCalendarItemClass,
	getFirstDayOfMonth,
	getNow,
	getTimeSlotClass,
	getTimeSlots,
	getValidationMessage,
	MONTH_NAMES,
	SERVICE_TYPES,
	TimeSlot,
	ValidationKey,
	WEEK_DAYS,
	DayModel,
	getLastDayOfMonth,
	isWeekDay,
	ServiceType,
} from "./AppointmentHelpers";
import { NotificationContainer, NotificationManager } from "react-notifications";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "gc-appointment";

const DEFAULTS: Properties = {
	mode: "PUBLIC",
};

type AppintmentMode = "PUBLIC" | "ADMIN";

interface Properties {
	mode: AppintmentMode;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
	};

	// HELPER

	const isAdmin = () => {
		return props.mode === "ADMIN";
	};

	const getAppointment = (serviceType?: string, date?: Date, timeSlotStr?: string): AppointmentModel => {
		const dateStr = date !== undefined ? formatDate(date) : undefined;
		if (isAdmin()) {
			if (serviceType !== undefined && date !== undefined && timeSlotStr !== undefined) {
				const existingAppt = qAppointments.find(
					(appt) =>
						appt.timeSlotStr === timeSlotStr && appt.serviceType === serviceType && appt.day === dateStr
				);
				if (existingAppt !== undefined) {
					return existingAppt;
				}
			}
			// Admin mode cleans up model between slot changes
			return { serviceType, day: dateStr, timeSlotStr } as AppointmentModel;
		} else {
			// Non admin mode keeps values between slot changes
			return { ...currentAppointment, serviceType, day: dateStr, timeSlotStr } as AppointmentModel;
		}
	};

	const handleCalendarDayClick = (date: Date) => {
		setCurrentDate(date);
		setCurrentAppointment(getAppointment(currentServiceType, date, undefined));
		setValidations({});
		setErrorMessage("");
	};

	const send = () => {
		setErrorMessage("");
		const validationResult = validateAllField();
		if (validationResult) {
			withErrorHandling(
				async () => {
					await apiClient.post(`/api/public/add_appointment.php`, {
						...currentAppointment,
						timeSlot: currentAppointment.timeSlotStr,
					});

					setSent(true);
				},
				(error) => {
					if (error instanceof ApiError && error.status === 422) {
						NotificationManager.error("Sajnos ez az időpont már nem elérhető, kérem válasszon másikat.");
					} else {
						NotificationManager.error(error.message);
					}
				}
			);
		} else {
			setErrorMessage("Hiba. Kérem ellenőrizze az adatokat.");
		}
	};

	const saveOrAddAppt = () => {
		setErrorMessage("");
		const validationResult = validateAllField();
		if (validationResult) {
			withErrorHandling(
				async () => {
					await apiClient.post(`/api/add_or_update_appointment.php`, {
						...currentAppointment,
						timeSlot: currentAppointment.timeSlotStr,
					});

					await loadCurrentMonth();
					NotificationManager.info("Sikeres mentés");
				},
				(error: Error) => {
					NotificationManager.error(error.message);
				}
			);
		} else {
			setErrorMessage("Hiba. Kérem ellenőrizze az adatokat.");
		}
	};

	const deleteAppt = () => {
		if (confirm("Biztosan törölni akarja a foglalást?")) {
			withErrorHandling(
				async () => {
					await apiClient.post(`/api/delete_appointment.php`, {
						...currentAppointment,
						timeSlot: currentAppointment.timeSlotStr,
					});

					loadCurrentMonth();
					setCurrentAppointment(
						getAppointment(currentServiceType, currentDate, currentAppointment.timeSlotStr)
					);
					NotificationManager.info("Foglalás törölve");
				},
				(error: Error) => {
					NotificationManager.error(error.message);
				}
			);
		}
	};

	const validateAllField = () => {
		const toValidateList: { [key in ValidationKey]?: string } = {
			email: currentAppointment.email,
			name: currentAppointment.name,
			phone: currentAppointment.phone,
			regNumber: currentAppointment.regNumber,
			autoType: currentAppointment.autoType,
			remark: currentAppointment.remark,
		};

		const evaluation: { [key in ValidationKey]?: string } = {};

		Object.keys(toValidateList).forEach((key: string) => {
			evaluation[key] = getValidationMessage(key as ValidationKey, toValidateList[key]);
		});

		setValidations({
			...validations,
			...evaluation,
		});

		return Object.keys(evaluation).reduce((aggr, key) => {
			return aggr && evaluation[key] === undefined;
		}, true);
	};

	const validateField = (field: ValidationKey, value: string) => {
		const validatedField = {};
		const message = getValidationMessage(field, value);
		validatedField[field] = message;
		setValidations({
			...validations,
			...validatedField,
		});
	};

	const canClose = () => {
		if (currentDate !== undefined) {
			const dayRecordFromDB = qDays.find((day) => day.day === formatDate(currentDate));
			return (
				(isWeekDay(currentDate) && dayRecordFromDB === undefined) ||
				(!isWeekDay(currentDate) && dayRecordFromDB?.status === "Enabled")
			);
		} else {
			return false;
		}
	};

	const toggleDay = async () => {
		if (currentDate !== undefined) {
			withErrorHandling(
				async () => {
					const tempIsWeekDay = isWeekDay(currentDate);
					const dayRecordFromDB = qDays.find((day) => day.day === formatDate(currentDate));
					if (
						(tempIsWeekDay && dayRecordFromDB?.status === "Disabled") ||
						(!tempIsWeekDay && dayRecordFromDB?.status === "Enabled")
					) {
						// DELETE
						await apiClient.post(`/api/delete_day.php`, {
							id: dayRecordFromDB.id,
						});
						await loadCurrentMonth();
					} else if (dayRecordFromDB === undefined) {
						await apiClient.post(`/api/add_day.php`, {
							day: formatDate(currentDate),
							status: tempIsWeekDay ? "DISABLED" : "ENABLED",
						});
						await loadCurrentMonth();
					}
				},
				(error: Error) => {
					NotificationManager.error(error.message);
				}
			);
		}
	};

	// COMPONENT

	const apiClient = useApiClient();
	const [loading, dispatchLoading] = useLoadingReducer();
	const [accessDenied, setAccessDenied] = useState<boolean>(false);
	const [currentMonth, setCurrentMonth] = useState<Date>(getFirstDayOfMonth(getNow()));
	const [calendar, setCalendar] = useState<CalendarItem[]>([]);
	const [currentTimeSlots, setCurrentTimeSlots] = useState<TimeSlot[]>([]);
	const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
	const [currentServiceType, setCurrentServiceType] = useState<ServiceType | undefined>(undefined);
	const [currentAppointment, setCurrentAppointment] = useState<AppointmentModel>({} as AppointmentModel);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [validations, setValidations] = useState<
		{
			[key in ValidationKey]?: string;
		}
	>({});
	const [sent, setSent] = useState<boolean>(false);
	const [qAppointments, setQAppointments] = useState<AppointmentModel[]>([]);
	const [qDays, setQDays] = useState<DayModel[]>([]);

	useEffect(() => {
		setCalendar(generateCalendar(qDays, currentMonth));
	}, [currentMonth, qDays]);

	useEffect(() => {
		setCurrentTimeSlots(getTimeSlots(qAppointments, currentServiceType, currentDate));
	}, [currentDate, qAppointments, currentServiceType]);

	const loadCurrentMonth = async () => {
		withErrorHandling(
			async () => {
				dispatchLoading("inc");
				if (isAdmin()) {
					const result = await apiClient.post(`/api/appointments.php`, {
						fromDate: formatDate(currentMonth),
						toDate: formatDate(getLastDayOfMonth(currentMonth)),
					});
					setQAppointments(
						result.resp.appointments.map((appt) => ({
							...appt,
							day: formatDate(parseDate(appt.day)),
							timeSlotStr: appt.timeSlot,
						}))
					);
					setQDays(
						result.resp.days.map((day) => ({
							id: day.id,
							day: formatDate(parseDate(day.day)),
							status: day.status === "ENABLED" ? "Enabled" : "Disabled",
						}))
					);
				} else {
					const result = await apiClient.get(`/api/public/appointments.php`);
					setQAppointments(
						result.resp.appointments.map((appt) => ({
							...appt,
							day: formatDate(parseDate(appt.day)),
							timeSlotStr: appt.timeSlot,
						}))
					);
					setQDays(
						result.resp.days.map((day) => ({
							id: day.id,
							day: formatDate(parseDate(day.day)),
							status: day.status === "ENABLED" ? "Enabled" : "Disabled",
						}))
					);
				}
			},
			(error) => {
				if (error instanceof ApiError && error.status === 403) {
					setAccessDenied(true);
				} else {
					NotificationManager.error(error.message);
				}
			},
			() => dispatchLoading("dec")
		);
	};

	useEffect(async () => {
		if (!isAdmin()) {
			await loadCurrentMonth();
		}
	}, []);

	useEffect(async () => {
		if (isAdmin()) {
			await loadCurrentMonth();
		}
	}, [currentMonth]);

	useEffect(() => {
		if (currentServiceType !== undefined) {
			setCurrentAppointment(getAppointment(currentServiceType, currentDate, undefined));
		}
	}, [currentServiceType]);

	// TEMPLATE

	const templateServiceTypes = () =>
		html`<div class="mt-4">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				${SERVICE_TYPES.map(
					(service) => html`<a href="#" @click=${() => setCurrentServiceType(service.type)}>
						<div
							class="text-center border border-black py-4 ${currentAppointment.serviceType ===
							service.type
								? "bg-brand-yellow"
								: ""}"
						>
							${service.name}
						</div>
					</a>`
				)}
			</div>
		</div>`;

	const templateDayToggler = () => {
		if (currentDate !== undefined) {
			return html`<div class="mr-4">
				<a class="inline-block" href="#" @click=${() => toggleDay()}>
					<span class="btn btn-primary">${canClose() ? "Lezár" : "Megnyit"}</span>
				</a>
			</div>`;
		} else {
			return "";
		}
	};

	const templateCalendar = () =>
		html`<div>
			<div class="mt-4 flex justify-between pb-2 items-center">
				<div>
					<a
						href="#"
						@click=${() => {
							setCurrentMonth(addMonths(currentMonth, -1));
						}}
					>
						<span class="btn btn-small">&lt;</span>
					</a>
				</div>
				<div class="font-semibold">${currentMonth.getFullYear()} ${MONTH_NAMES[currentMonth.getMonth()]}</div>
				<div class="flex">
					${isAdmin() ? templateDayToggler() : ""}
					<a
						href="#"
						@click=${() => {
							setCurrentMonth(addMonths(currentMonth, 1));
						}}
					>
						<span class="btn btn-small">&gt;</span>
					</a>
				</div>
			</div>
			<div class="grid grid-cols-7 w-full bg-white">
				${WEEK_DAYS?.map(
					(weekDay) => html`
						<div class=${`text-center py-2 uppercase bg-brand-yellowdark font-semibold text-black`}>
							${weekDay}
						</div>
					`
				)}
				${calendar?.map(
					(calendarItem, i) =>
						html`<div class="text-center ${getCalendarItemClass(calendarItem, currentDate)}">
							${calendarItem.enabled || isAdmin()
								? html`<a href="#" @click=${() => handleCalendarDayClick(calendarItem.date)}>
										<div class="py-2 md:hover:bg-gray-500">${calendarItem.date.getDate()}</div>
								  </a>`
								: html` <div class="py-2">${calendarItem.date.getDate()}</div> `}
						</div>`
				)}
			</div>
		</div>`;

	const templateTimeSlots = () =>
		html`<div class="mt-4">
			<div class="grid grid-rows-5 grid-cols-4 grid-flow-col gap-4">
				${currentTimeSlots.map((timeSlot) => {
					if (timeSlot.free || isAdmin()) {
						return html`<a
							href="#"
							@click=${() => {
								setCurrentAppointment(getAppointment(currentServiceType, currentDate, timeSlot.label));
							}}
						>
							<div class=${getTimeSlotClass(timeSlot, currentAppointment.timeSlotStr === timeSlot.label)}>
								${timeSlot.label}
							</div>
						</a>`;
					} else {
						return html`<div
							class=${getTimeSlotClass(timeSlot, currentAppointment.timeSlotStr === timeSlot.label)}
						>
							${timeSlot.label}
						</div>`;
					}
				})}
			</div>
		</div>`;

	const templatePersonalInfo = () =>
		html`<div class="mt-4">
			<div class="grid gap-4">
				<dc-input
					.label=${"Email cím*"}
					.value=${currentAppointment.email}
					.validationMessage=${validations.email}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("email", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, email: e.detail.value });
					}}
				></dc-input>
				<dc-input
					.label=${"Név*"}
					.placeholder=${"pl: Kiss Béla"}
					.value=${currentAppointment.name}
					.validationMessage=${validations.name}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("name", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, name: e.detail.value });
					}}
				></dc-input>
				<dc-input
					.label=${"Telefonszám*"}
					.placeholder=${"pl: 06 20 543 4567"}
					.value=${currentAppointment.phone}
					.validationMessage=${validations.phone}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("phone", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, phone: e.detail.value });
					}}
				></dc-input>
				<dc-input
					.label=${"Autó típusa*"}
					.placeholder=${"pl: Ford Mondeo"}
					.value=${currentAppointment.autoType}
					.validationMessage=${validations.autoType}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("autoType", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, autoType: e.detail.value });
					}}
				></dc-input>
				<dc-input
					.label=${"Rendszám*"}
					.placeholder=${"pl: FTC-123"}
					.value=${currentAppointment.regNumber}
					.validationMessage=${validations.regNumber}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("regNumber", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, regNumber: e.detail.value });
					}}
				></dc-input>
				<dc-input
					.label=${"Megjegyzés (opcionális)"}
					.value=${currentAppointment.remark}
					.multiline=${true}
					.validationMessage=${validations.remark}
					.rows=${6}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("remark", e.detail.value);
						setCurrentAppointment({ ...currentAppointment, remark: e.detail.value });
					}}
				></dc-input>
			</div>
		</div>`;

	const templateSend = () => html`<div>
		<div class="mt-4 flex justify-around md:justify-start w-full">
			${isAdmin()
				? html`<a class="inline-block" href="#" @click=${saveOrAddAppt}>
							<span class="btn btn-primary">Mentés</span> </a
						><a class="inline-block ml-4" href="#" @click=${deleteAppt}>
							<span class="btn btn-primary">Törlés</span>
						</a>`
				: html`<a class="inline-block" href="#" @click=${send}>
						<span class="btn btn-primary">Küldés</span>
				  </a>`}
		</div>
		${errorMessage.length > 0 ? html`<div class="mt-4 text-red-500">${errorMessage}</div>` : ""}
	</div>`;

	const templateSuccess = () => html`<div class="mt-4 xl:w-1/2">
		<div>
			<h2 class="pt-8 text-3xl text-green-600">Sikeres foglalás</h2>
			<p class="py-2">A foglalásról emailben visszaigazolást küldünk.</p>
			<p class="py-2">
				Ha nem érkezne meg az email pár percen belül, kérem vegye fel ügyfélszolgálatunkkal a kapcsolatot
				emailben:
				<a class="text-brand-blue font-semibold" href="mailto:zoldkartyabt1@gmail.com"
					>vizsgaallomas1@gmail.com</a
				>
				vagy munkaidőben telefonon: <span class="text-brand-blue font-semibold">+36 (30) 131 4101</span>.
			</p>
		</div>
	</div>`;

	if (loading.count > 0) {
		return html`<div class="pt-12">Kérem várjon míg lekérdezzük az foglaltságot...</div>`;
	} else if (accessDenied) {
		return html`<h1 class="pt-12 text-4xl leading-tight font-semibold text-center">Hozzáférés megtagadva</h1>`;
	} else if (!sent) {
		return html`<div>
			<h1 class="pt-12 text-4xl leading-tight font-semibold">Időpont foglalás</h1>
			${templateServiceTypes()} ${currentAppointment.serviceType !== undefined ? templateCalendar() : ""}
			${currentDate !== undefined ? templateTimeSlots() : ""}
			${currentAppointment.timeSlotStr !== undefined ? templatePersonalInfo() : ""}
			${currentAppointment.timeSlotStr !== undefined ? templateSend() : ""}
		</div>`;
	} else {
		return templateSuccess();
	}
};

if (isBrowser() && customElements.get(name) === undefined) {
	// eslint-disable-next-line no-console
	customElements.define(
		name,
		component<HTMLElement & Properties>(Component, {
			useShadowDOM,
			observedAttributes,
		})
	);
}

// React Wrapper

import React from "react";
import useCustomElement from "../util/useCustomElement";
import { formatDate, isBrowser, parseDate, withErrorHandling } from "../util/helper";
import { HauntedFunc, useApiClient, useEffect, useLoadingReducer, useState } from "../util/CustomHauntedHooks";
import { component } from "haunted";
import { ApiError } from "../util/ApiClient";

const Appointment = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<gc-appointment ref={ref}></gc-appointment>
			<NotificationContainer />
		</div>
	);
};

export default Appointment;
