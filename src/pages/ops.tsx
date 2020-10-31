import React from "react";
import { Router } from "@reach/router";
import PrivateRoute from "../components/ops/private-route";
import Login from "../components/ops/login";
import Home from "../components/ops/home";
import LayoutOps from "../components/layout_ops";
import Profile from "../components/ops/profile";
import Appointments from "../components/ops/appointments";
import Customers from "../components/ops/customers";
import { isBrowser } from "../util/helper";

const Ops = () => (
	<LayoutOps>
		<Router basepath={isBrowser() ? __PATH_PREFIX__ : ""}>
			<PrivateRoute path="/ops" component={Home} />
			<PrivateRoute path="/ops/idopontfoglalasok" component={Appointments} />
			<PrivateRoute path="/ops/ugyfelek" component={Customers} />
			<PrivateRoute path="/ops/profil" component={Profile} />
			<Login path="/ops/login" />
		</Router>
	</LayoutOps>
);

export default Ops;
