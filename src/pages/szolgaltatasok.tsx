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
			<SEO title="Rólunk" />
			<div className="container px-4">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Szolgáltatásaink</h1>
				<p id="muszakivizsga" className="text-lg my-8">
					Műszaki vizsga
				</p>
				<p id="szakszerviz" className="text-lg my-8">
					Szakszervíz
				</p>
				<p id="gyorsszerviz" className="text-lg my-8">
					Gyorsszervíz
				</p>
				<p id="zoldkartya" className="text-lg my-8">
					Zöldkártya
				</p>
			</div>
		</Layout>
	);
};

export default ServicesPage;
