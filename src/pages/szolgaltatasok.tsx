import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { isBrowser } from "../util/helper";

const ServicesPage = () => {
	let hash = "";
	if (isBrowser()) {
		hash = window.location.hash;
	}

	return (
		<Layout>
			<SEO title="Szolgáltatások" />
			<div className="container text-lg px-4">
				Szolgáltatások
			</div>
		</Layout>
	);
};

export default ServicesPage;
