import React from "react";
import { Link, useStaticQuery, graphql, navigate } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid } from "../util/helper";
import BackgroundImage from "gatsby-background-image";
import GetInTouch from "../components/get-in-touch";
import Img from "gatsby-image";

interface PageMenu {
	label: string;
	text: string;
	link: string;
}

const PAGE_MENU: PageMenu[] = [
	{
		label: "Műszaki vizsga",
		text: "Profi szakszervizzel egybekötött műszaki vizsga",
		link: "szolgaltatasok#muszaki-vizsga",
	},
	{
		label: "Autószerviz",
		text: "Szakembereink maximális hatékonysággal állnak rendelkezésre",
		link: "szolgaltatasok#autoszerviz",
	},
	{
		label: "Eredetiség vizsgálat",
		text: "Gyanús forrásból származik az autója, mi megmondjuk honnan jött",
		link: "szolgaltatasok#eredetiseg-vizsgalat",
	},
	{
		label: "Gumiszerviz",
		text: "Személy és tehergépjárművek gumiabroncsainak szakszerű és gyors cseréje",
		link: "szolgaltatasok#gumiszerviz",
	},
];

const BEST_SOLUTION_ITEMS: {
	svg: string;
	viewBox: string;
	strokeWidth: string;
	height: string;
	title: string;
	text: string;
}[] = [
	{
		svg:
			"M100.785 16.62c-34.193.036-61.897 27.791-61.861 61.989.036 34.204 62.035 103.148 62.035 103.148s61.855-69.074 61.819-103.278c-.036-34.199-27.796-61.895-61.993-61.859zm.093 87.724c-17.098.018-30.972-13.83-30.99-30.929-.018-17.098 13.831-30.968 30.925-30.986 17.103-.018 30.976 13.823 30.994 30.921.018 17.099-13.827 30.976-30.929 30.994z",
		viewBox: "34.39342682926829 12.592268292682927 132.9151463414634 173.19246341463415",
		strokeWidth: "6",
		height: "60px",
		title: "Folyamatos nyitvatartás",
		text:
			"Ez egy bekezdés. Ide bármilyen szöveget lehet tenni. Ez egy megfelelő hely arra, hogy az ügyfeleidnek adj egy jó sztorit.",
	},
	{
		svg:
			"M79.534 71.002c0-2.485 2.963-11.852 16.822-11.852 15.484 0 16.631 9.462 16.631 11.47 0 5.83 4.683 10.514 10.514 10.514 5.83 0 10.514-4.683 10.514-10.514 0-9.08-3.632-17.3-10.323-23.322-3.728-3.345-8.029-5.83-13.19-7.36-.765-.287-2.294-.86-2.294-3.154v-4.779c.096-5.926-4.875-10.801-10.896-10.801-6.022 0-10.992 4.875-10.992 10.896v4.779c0 2.103-1.625 2.676-2.39 2.867-16.058 4.683-25.424 18.16-25.424 31.255 0 43.394 57.54 24.182 57.54 51.327 0 3.345-2.103 12.617-19.212 12.617-17.205 0-19.976-12.425-19.976-17.3 0-5.83-4.683-10.514-10.514-10.514s-10.514 4.683-10.514 10.514c0 10.514 4.014 20.168 11.183 27.145 4.588 4.397 10.227 7.551 16.535 9.367.86.287 2.867 2.294 2.867 3.823v3.919c0 6.022 4.97 10.896 10.992 10.896 6.022 0 10.896-4.779 10.896-10.801v-4.683c0-1.529 1.434-2.676 2.294-2.867 5.639-1.434 10.514-3.919 14.719-7.264 7.646-6.213 11.852-15.006 11.852-24.755.002-45.975-57.634-30.969-57.634-51.423z",
		viewBox: "34.39342682926829 12.592268292682927 132.9151463414634 173.19246341463415",
		strokeWidth: "6",
		height: "60px",
		title: "Verhetetlen árak",
		text:
			"Ez egy bekezdés. Ide bármilyen szöveget lehet tenni. Ez egy megfelelő hely arra, hogy az ügyfeleidnek adj egy jó sztorit.",
	},
	{
		svg:
			"M176.842 0l54.634 110.714 122.208 17.77-88.432 86.194 20.877 121.692-109.287-57.449L67.535 336.37l20.876-121.692L0 128.484l122.189-17.77L176.842 0z",
		viewBox: "-11.409161290322572 -77.1119677419355 376.50232258064517 490.593935483871",
		strokeWidth: "20",
		height: "60px",
		title: "Professzionális minőség",
		text:
			"Ez egy bekezdés. Ide bármilyen szöveget lehet tenni. Ez egy megfelelő hely arra, hogy az ügyfeleidnek adj egy jó sztorit.",
	},
];

const IndexPage = () => {
	const data = useStaticQuery(graphql`
		query IndexPageQuery {
			allFile(
				filter: { relativePath: { in: ["banner/home2.png", "banner/home_mobile2.png", "sos_main4.png"] } }
			) {
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

	const fluidBanner = getFluid(data.allFile.edges, "banner/home2.png");
	const fluidBannerMobile = getFluid(data.allFile.edges, "banner/home_mobile2.png");
	const sos = getFluid(data.allFile.edges, "sos_main4.png");

	return (
		<Layout>
			<SEO title="Kezdőlap" />
			{/* Banner */}
			<div className="text-brand-grayt hidden lg:block">
				<div>
					<BackgroundImage
						id="banner"
						Tag="div"
						className="bg-gray-400 text-black"
						style={{
							backgroundSize: "100% auto",
							backgroundAttachment: "fixed",
							backgroundPosition: "center top",
							height: "400px",
							backgroundColor: "transparent",
							filter: "brightness(0.6)",
						}}
						fluid={fluidBanner}
					></BackgroundImage>
				</div>
			</div>

			<div className="text-brand-grayt block lg:hidden">
				<div>
					<BackgroundImage
						id="banner"
						Tag="div"
						className="bg-gray-400 text-black"
						style={{
							backgroundSize: "100% auto",
							backgroundAttachment: "fixed",
							backgroundPosition: "center top",
							height: "400px",
							backgroundColor: "transparent",
							filter: "brightness(0.8)",
						}}
						fluid={fluidBannerMobile}
					></BackgroundImage>
				</div>
			</div>

			<div id="pageMenu" className="">
				<div className="container bg-brand-yellow text-black py-4">
					<div className="md:flex w-full justify-between">
						{PAGE_MENU.map((menu, i) => {
							return (
								<React.Fragment key={i}>
									<div
										className="px-4 cursor-pointer hover:text-red-600"
										onClick={() => navigate(menu.link)}
									>
										<div className="text-xl font-semibold mb-2">{menu.label}</div>
										<div>{menu.text}</div>
									</div>
									{i !== PAGE_MENU.length - 1 ? (
										<div className="border border-r-0 border-b-0 my-4 md:my-0 border-black"></div>
									) : (
										""
									)}
								</React.Fragment>
							);
						})}
					</div>
				</div>
			</div>

			{/* Appointment */}
			<div className="container py-8 ">
				<div className="font-semibold text-red-600 text-4xl text-center">
					<div className="hidden md:block">Bejelentkezés: +36 (30) 131 4101</div>
					<div className="md:hidden px-4">
						<div>Bejelentkezés:</div>
						<div>+36 (30) 131 4101</div>
					</div>
				</div>
				{/* <div className="flex justify-around mt-4">
					<Link to="/idopont-foglalas">
						<div className="btn btn-primary">Időpont foglalás</div>
					</Link>
				</div> */}
			</div>

			{/* Come and visit us */}
			<div className="py-12" style={{ backgroundColor: "#EEFFF0" }}>
				<h2 className="pb-4 w-full text-center title title-wide">Látogasson el hozzánk</h2>
				<div className="flex justify-around">
					<Link to="/szolgaltatasok">
						<div className="btn btn-primary">Szolgáltatások</div>
					</Link>
				</div>
			</div>

			{/* SOS */}
			<div className="container py-12">
				<div className="md:flex justify justify-between p-4 mx-4 md:px-16 md:mx-0 border-4 border-red-600">
					<div className="md:mr-8">
						<h2 className="pb-4 w-full text-center md:text-left title title-wide text-red-600 underline">
							S.O.S Műszaki vizsga
						</h2>
						<div className="text-center md:text-left">
							Későn vette észre, hogy lejárt a műszaki vizsgája? Esetleg a rendőrök figyelmeztették?
							Hozzánk bármikor hozhatja az autóját, akár 4 órán belül levizsgáztatjuk.
						</div>
						<h2 className="hidden lg:block py-4 w-full title title-wide text-red-600 underline">
							S.O.S Eredetiségvizsgálat
						</h2>
						<h2 className="lg:hidden text-center md:text-left py-4 w-full title title-wide text-red-600 underline">
							S.O.S Eredetiség-vizsgálat
						</h2>
						<div className="text-center md:text-left">Hipergyors vizsgálat bármelyik kategóriában.</div>
						<div className="mt-8 text-center md:text-right">
							<Link to="/szolgaltatasok#sos">
								<div className="btn btn-primary">Részletek</div>
							</Link>
						</div>
					</div>
					<div className="mt-8 md:mt-0">
						<div className="hidden md:block mt-0 ml-8">
							<Img fluid={sos} alt="SOS" style={{ width: "300px" }} />
						</div>
						<div className="md:hidden">
							<Img className="m-auto" fluid={sos} alt="SOS" style={{ maxWidth: "300px" }} />
						</div>
					</div>
				</div>
			</div>

			{/* Best solutions */}
			<div style={{ backgroundColor: "#EEFFF0" }}>
				<div className="container px-4">
					<div className="text-3xl uppercase flex justify-around py-8 text-center">
						<div>Nálunk jobbat nem talál</div>
					</div>
					<div className="lg:px-32 text-center">
						Szakembereink hosszú évek óta a tökéletesre törekszenek. Folyamatosan követik a trendeket,
						csiszolják elméjüket. Szervizünk mindig igyekszik az elérhető legjobb technológiával dolgozni.
					</div>
					<div className="sm:flex py-4 justify-between">
						{BEST_SOLUTION_ITEMS.map((item, i) => {
							return (
								<div key={i} className="flex flex-col items-center md:px-4">
									<div
										style={{
											strokeWidth: item.strokeWidth,
											fillOpacity: 0,
											stroke: "rgba(206, 32, 38, 1)",
											strokeOpacity: 1,
											fill: "rgba(255, 255, 255, 1)",
										}}
									>
										<svg
											style={{ vectorEffect: "non-scaling-stroke", height: item.height }}
											className="mr-2"
											xmlns="http://www.w3.org/2000/svg"
											viewBox={item.viewBox}
											role="img"
										>
											<g>
												<path d={item.svg}></path>
											</g>
										</svg>
									</div>
									<div className="text-2xl my-4 font-thin">{item.title}</div>
									{/* <div className="text-center">{item.text}</div> */}
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<GetInTouch />
		</Layout>
	);
};

export default IndexPage;
