import React from "react";
import { getCurrentUser } from "../../util/auth";

const Home = () => {
	const user = getCurrentUser();

	return (
		<div className="container p-4">
			<div className="text-3xl">Hello!</div>
		</div>
	);
};

export default Home;
