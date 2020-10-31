import React from "react";
import { getCurrentUser } from "../../util/auth";

const Customers = () => {
	const user = getCurrentUser();

	return (
		<div className="container p-4">
			<h1 className="mb-4 text-2xl font-semibold">Ügyfelek</h1>
		</div>
	);
};

export default Customers;
