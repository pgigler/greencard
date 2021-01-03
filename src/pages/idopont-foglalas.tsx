import { directive } from "lit-html";
import React, { useEffect, useState } from "react";
import Appointment from "../cc/appointment";
import Layout from "../components/layout";
import SEO from "../components/seo";

interface CalendarItem {
	date: Date;
	enabled: boolean;
	inCurrentMonth: boolean;
}

const SERVICE_TYPES = [
	{ name: "Műszaki vizsga", type: "MotTest" },
	{ name: "Autószerviz", type: "AutoService" },
	{ name: "Eredetiség vizsgálat", type: "InformationCheck" },
	{ name: "Gumiszerviz", type: "TireService" },
];
const WEEK_DAYS = ["h", "k", "sze", "cs", "p", "szo", "v"];
const MONTH_NAMES = [
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
const TIME_SLOTS = [
	"8:00",
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
	"16:00",
];

const AppointmentPage = () => {
	// TEMPLATE

	return (
		<Layout>
			<SEO title="Időpont foglalás" />
			<div className="container px-4 mb-8">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Időpont foglalás</h1>
				<Appointment mode="PUBLIC" />
			</div>
		</Layout>
	);
};

export default AppointmentPage;
