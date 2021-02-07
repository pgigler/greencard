import { formatDate } from "../util/helper";

export type ServiceType = "MotTest" | "InfoCheck";
export const SERVICE_TYPES: { name: string; type: ServiceType }[] = [
	{ name: "Műszaki vizsga", type: "MotTest" },
	{ name: "Eredetiség vizsgálat", type: "InfoCheck" },
];
export const WEEK_DAYS = ["h", "k", "sze", "cs", "p", "szo", "v"];
export const MONTH_NAMES = [
	"Január",
	"Február",
	"Március",
	"Április",
	"Május",
	"Június",
	"Július",
	"Augusztus",
	"Szeptember",
	"Október",
	"November",
	"December",
];

export const TIME_SLOTS = [
	"8:30",
	"9:00",
	"9:30",
	"10:00",
	"10:30",
	"11:00",
	"11:30",
	"12:00",
	"12:30",
	"13:00",
	"13:30",
	"14:00",
	"14:30",
	"15:00",
	"15:30",
];

export interface TimeSlot {
	label: string;
	free: boolean;
}

export interface CalendarItem {
	date: Date;
	enabled: boolean;
	inCurrentMonth: boolean;
}

export interface AppointmentModelShort {
	day: string;
	serviceType: ServiceType;
	timeSlotStr?: string;
}

export interface AppointmentModel extends AppointmentModelShort {
	id: number;
	email: string;
	name: string;
	phone: string;
	autoType: string;
	regNumber: string;
	remark: string;
}

export interface DayModelShort {
	day: string;
	status: "Enabled" | "Disabled";
}

export interface Daymodel extends DayModelShort {
	id: number;
}

export const getTimeSlots = (
	qAppointments: AppointmentModelShort[],
	serviceType?: ServiceType,
	date?: Date
): TimeSlot[] => {
	if (date !== undefined && serviceType !== undefined) {
		const temp = qAppointments.filter((appt) => appt.day === formatDate(date) && appt.serviceType === serviceType);
		const appointmentsForDate = temp.length === 1 ? temp : [];
		return TIME_SLOTS.filter((_, i) => date?.getDay() !== 5 || i < TIME_SLOTS.length - 1).map((label) => ({
			label,
			free: !appointmentsForDate.some((appt) => appt.timeSlotStr === label),
		}));
	} else {
		return [];
	}
};

export const getCalendarItemClass = (calendarItem: CalendarItem, selectedDate?: Date) => {
	const classes = [] as string[];
	const isTodaySelected = calendarItem.date.toDateString() === selectedDate?.toDateString();
	if (isTodaySelected) {
		classes.push("bg-brand-yellow", "border", "text-black");
	} else if (!calendarItem.enabled) {
		classes.push("bg-white", "text-gray-500");
	} else {
		classes.push("bg-brand-gray2", "border", "text-white");
	}

	return classes.join(" ");
};

export const getTimeSlotClass = (timeSlot: TimeSlot, selected: boolean) => {
	const classes = ["text-center", "border", "border-black"];
	if (selected) {
		classes.push("bg-brand-yellow");
	} else if (timeSlot.free) {
		classes.push("bg-green-600");
	} else {
		classes.push("bg-red-600");
	}
	return classes.join(" ");
};

export const generateCalendar = (qDays: DayModelShort[], currentDate: Date): CalendarItem[] => {
	const thirtyDaysLater = addDays(new Date(), 40); // appointment can be made 40 days in advance
	const firstDayOfMonth = getFirstDayOfMonth(currentDate);
	const lastDayOfMonth = getLastDayOfMonth(currentDate);
	const firstWeekday = firstDayOfMonth.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday
	const lastWeekday = lastDayOfMonth.getDay();
	const leftPad = ((firstWeekday + 6) % 7) - 1;
	const rightPad = 6 - ((lastWeekday + 6) % 7) - 1;
	const days = lastDayOfMonth.getDate() - firstDayOfMonth.getDate();
	return [
		...createRange(0, leftPad).map((num) => {
			const date = addDays(firstDayOfMonth, num - leftPad - 1);
			const enabled = false;
			return {
				date,
				enabled,
				inCurrentMonth: false,
			};
		}),
		...createRange(0, days).map((num) => {
			const date = addDays(firstDayOfMonth, num);
			let enabled = (date.getDay() + 6) % 7 < 5 && date > getNow();
			enabled =
				(date <= thirtyDaysLater &&
					enabled &&
					!qDays.some((day) => day.day === formatDate(date) && day.status === "Disabled")) ||
				(!enabled && qDays.some((day) => day.day === formatDate(date) && day.status === "Enabled"));
			return {
				date,
				enabled,
				inCurrentMonth: true,
			};
		}),
		...createRange(0, rightPad).map((num) => {
			const date = addDays(firstDayOfMonth, num + 1);
			const enabled = false;
			return {
				date,
				enabled,
				inCurrentMonth: false,
			};
		}),
	];
};

export const getFirstDayOfMonth = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = (date: Date) => {
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const addDays = (date: Date, days: number) => {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const addMonths = (date: Date, months: number) => {
	return new Date(date.setMonth(date.getMonth() + months));
};

export const createRange = (start: number, end: number) => {
	if (end < start) {
		return [];
	} else {
		return [...Array(end - start + 1).keys()].map((i) => i + start);
	}
};

export const getNow = () => {
	return addDays(new Date(), 0);
};

// Validation

export type ValidationKey = "email" | "name" | "phone" | "regNumber" | "autoType" | "remark";

// eslint-disable-next-line complexity
export const getValidationMessage = (field: ValidationKey, value: string) => {
	if (field === "email") {
		if (value === undefined || value.length === 0) {
			return "Kötelező mező";
		} else if (value.length > 200) {
			return "Maximum 200 karakter";
		} else if (!validateEmail(value)) {
			return "Hibás email formátum";
		} else {
			return undefined;
		}
	}

	if (field === "name") {
		if (value === undefined || value.length === 0) {
			return "Kötelező mező";
		} else if (value.length > 200) {
			return "Maximum 200 karakter";
		}
	}

	if (field === "phone") {
		if (value === undefined || value.length === 0) {
			return "Kötelező mező";
		} else if (value.length > 20) {
			return "Maximum 20 karakter";
		}
	}

	if (field === "regNumber") {
		if (value === undefined || value.length === 0) {
			return "Kötelező mező";
		} else if (value.length > 10) {
			return "Maximum 10 karakter";
		}
	}

	if (field === "autoType") {
		if (value === undefined || value.length === 0) {
			return "Kötelező mező";
		} else if (value.length > 100) {
			return "Maximum 100 karakter";
		}
	}

	if (field === "remark") {
		if (value !== undefined && value.length > 500) {
			return "Maximum 500 karakter";
		}
	}

	return undefined;
};

export const validateEmail = (email: string) => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};
