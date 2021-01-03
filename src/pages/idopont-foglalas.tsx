import React from "react";
import Appointment from "../cc/appointment";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { isBrowser } from "../util/helper";

const AppointmentPage = () => {
	// TEMPLATE

	return (
		<Layout>
			<SEO title="Időpont foglalás" />
			<div className="container px-4 mb-8">{isBrowser() ? <Appointment mode="PUBLIC" /> : ""}</div>
		</Layout>
	);
};

export default AppointmentPage;
