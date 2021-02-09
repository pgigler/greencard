import React from "react";
import Appointment from "../../cc/appointment";
import { isBrowser } from "../../util/helper";

const OpsAppointments = () => {
    return <div className="container px-4 mb-8">{isBrowser() ? <Appointment mode="ADMIN" /> : ""}</div>;
};

export default OpsAppointments;
