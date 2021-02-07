import React from "react";
import Appointment from "../../cc/appointment";
import { getCurrentUser } from "../../util/auth";
import { isBrowser } from "../../util/helper";

const Home = () => {
	const user = getCurrentUser();

	return <div className="container px-4 mb-8">{isBrowser() ? <Appointment mode="ADMIN" /> : ""}</div>;
};

export default Home;
