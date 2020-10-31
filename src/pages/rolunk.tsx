import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const AboutUsPage = () => {
	return (
		<Layout>
			<SEO title="Rólunk" />
			<div className="container px-4">
				<h1 className="pt-12 text-4xl leading-tight font-semibold">Rólunk</h1>
				<p className="text-lg my-8">
					Cégünk kezdetben...
				</p>


			</div>
		</Layout>
	);
};

export default AboutUsPage;
