import { useEffect, useState, component } from "haunted";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
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
	getTimeSlots,
	getValidationMessage,
	MONTH_NAMES,
	SERVICE_TYPES,
	ValidationKey,
	WEEK_DAYS,
} from "./AppointmentHelpers";

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

	const validateAllField = () => {
		const toValidateList: { [key in ValidationKey]?: string } = {
			email: currentAppointment.email,
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

	// COMPONENT

	const [currentMonth, setCurrentMonth] = useState<Date>(getFirstDayOfMonth(getNow()));
	const [calendar, setCalendar] = useState<CalendarItem[]>([]);
	const [currentAppointment, setCurrentAppointment] = useState<AppointmentModel>({} as AppointmentModel);
	const [validations, setValidations] = useState<
		{
			[key in ValidationKey]?: string;
		}
	>({});

	useEffect(() => {
		setCalendar(generateCalendar(currentMonth));
	}, [currentMonth]);

	// TEMPLATE

	const templateServiceTypes = () =>
		html`<div class="mt-4">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				${SERVICE_TYPES.map(
					(service, serviceIndex) => html`<a
						href="#"
						@click=${() => setCurrentAppointment({ ...currentAppointment, serviceIndex })}
					>
						<div
							class="text-center border border-black py-4 ${currentAppointment.serviceIndex ===
							serviceIndex
								? "bg-brand-yellow"
								: ""}"
						>
							${service.name}
						</div>
					</a>`
				)}
			</div>
		</div>`;

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
				<div>
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
						html`<div class="text-center ${getCalendarItemClass(calendarItem, currentAppointment.date)}">
							${calendarItem.enabled
								? html`<a
										href="#"
										@click=${() =>
											setCurrentAppointment({
												...currentAppointment,
												date: calendarItem.date,
												slotIndex: undefined,
											})}
								  >
										<div class="py-2 md:hover:bg-gray-500">${calendarItem.date.getDate()}</div>
								  </a>`
								: html` <div class="py-2">${calendarItem.date.getDate()}</div> `}
						</div>`
				)}
			</div>
		</div>`;

	const templateTimeSlots = () =>
		html`<div class="mt-4">
			<!-- ${currentAppointment.date?.toDateString()} -->
			<div class="grid grid-rows-5 grid-cols-4 grid-flow-col gap-4">
				${getTimeSlots(currentAppointment.date).map(
					(slot, slotIndex) => html` <a
						href="#"
						@click=${() => {
							setCurrentAppointment({ ...currentAppointment, slotIndex });
						}}
					>
						<div
							class="text-center border border-black ${currentAppointment.slotIndex === slotIndex
								? "bg-brand-yellow"
								: ""}"
						>
							${slot}
						</div>
					</a>`
				)}
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
			</div>
		</div>`;

	return html`<div>
		${templateServiceTypes()} ${currentAppointment.serviceIndex !== undefined ? templateCalendar() : ""}
		${currentAppointment.date !== undefined ? templateTimeSlots() : ""}
		${currentAppointment.slotIndex !== undefined ? templatePersonalInfo() : ""}
	</div>`;
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
import { isBrowser } from "../util/helper";

const Appointment = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<gc-appointment ref={ref}></gc-appointment>
		</div>
	);
};

export default Appointment;
