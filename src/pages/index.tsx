import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import BackgroundImage from "gatsby-background-image";
import GetInTouch from "../components/get-in-touch";

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query IndexPageQuery {
			allFile(filter: { relativePath: { in: ["banner/home.jpg"] } }) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 1920) {
								...GatsbyImageSharpFluid
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
				}
			}
		}
	`);

	const fluidBanner = getFluid(data.allFile.edges, "banner/home.jpg");

	return (
		<Layout>
			<SEO title="Kezdőlap" />
			{/* Banner */}
			<div className="text-brand-grayt">
				<div>
					<BackgroundImage
						id="banner"
						Tag="div"
						className="bg-gray-400 text-black bg-cover"
						fluid={fluidBanner}
					>
						<div className="banner">
							<div className="lg:ml-56 text-white flex ml-6">
								<div className="banner-text w-1/2">
									<div className="text-4xl sm:text-6xl tracking-wide uppercase font-semibold font-sans">
										<span className="whitespace-no-wrap">Műszaki vizsga</span>
									</div>

								</div>
							</div>
						</div>
					</BackgroundImage>
				</div>
			</div>

			{/* Come and visit us */}
			<div className="py-12">
				<h2 className="pb-4 w-full text-center title title-wide">Látogasson el hozzánk</h2>
				<div className="mb-12 flex justify-around">
					<Link to="/szolgaltatasok">
						<div className="btn btn-primary">Szolgáltatások</div>
					</Link>
				</div>
			</div>

			{/* Best solutions */}
			<div className="">
			</div>
			<GetInTouch />
		</Layout>
	);
};

export default IndexPage;
