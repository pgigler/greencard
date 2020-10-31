import React from "react";
import { navigate, withPrefix } from "gatsby";
import { isLoggedIn } from "../../util/auth";
import { isBrowser } from "../../util/helper";

const PrivateRoute = ({ component: Component, ...rest }) => {
	if (!isLoggedIn() && isBrowser() && location.pathname !== withPrefix(`/ops/login`)) {
		// If we’re not logged in, redirect to the home page.
		navigate(`/ops/login`);
		// eslint-disable-next-line no-null/no-null
		return null;
	}

	return <Component {...rest} />;
};

export default PrivateRoute;
