import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/ops/private-route";
import Login from "../components/ops/login";
import Home from "../components/ops/home";
import LayoutOps from "../components/layout_ops";
import { isBrowser } from "../util/helper";
import OpsAppointments from "../components/ops/appointments";
import OpsCustomers from "../components/ops/customers";
import OpsProfile from "../components/ops/profile";

const Ops = () => (
	<LayoutOps>
		<Router basepath={isBrowser() ? __PATH_PREFIX__ : ""}>
			<PrivateRoute path="/ops" component={Home} />
			<PrivateRoute path="/ops/appointments" component={OpsAppointments} />
			<PrivateRoute path="/ops/customers" component={OpsCustomers} />
			<PrivateRoute path="/ops/profile" component={OpsProfile} />
			<Login path="/ops/login" />
		</Router>
	</LayoutOps>
);

export default Ops;
