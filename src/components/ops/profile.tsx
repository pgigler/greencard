import React from "react";
import { getCurrentUser } from "../../util/auth";

const OpsProfile = () => {
	const user = getCurrentUser();

	return (
		<div className="container p-4">
			<h1 className="mb-4 text-2xl font-semibold">Profil</h1>
			<div>
				<ul>
					<li>Név: {user?.name}</li>
					<li>Email: {user?.email}</li>
				</ul>
			</div>
		</div>
	);
};

export default OpsProfile;
