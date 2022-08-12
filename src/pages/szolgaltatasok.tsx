import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { getFluid, isBrowser } from "../util/helper";
import Img from "gatsby-image";

const ServicesPage = () => {
	const data = useStaticQuery(graphql`
		query ServicesPageQuery {
			allFile(
				filter: {
					relativePath: {
						in: [
							"eredetiseg.jpg"
							"gumiszerviz.png"
							"muszaki.jpg"
							"muszaki2.jpg"
							"autoszerviz.jpg"
							"sos_main4.png"
						]
					}
				}
			) {
				edges {
					node {
						relativePath
						childImageSharp {
							fluid(maxWidth: 400) {
								...GatsbyImageSharpFluid
								...GatsbyImageSharpFluidLimitPresentationSize
							}
						}
					}
				}
			}
		}
	`);

	const fluidEredetiseg = getFluid(data.allFile.edges, "eredetiseg.jpg");
	const fluidGumiSzerviz = getFluid(data.allFile.edges, "gumiszerviz.png");
	const fluidAutoSzerviz = getFluid(data.allFile.edges, "autoszerviz.jpg");
	const fluidMuszaki = getFluid(data.allFile.edges, "muszaki.jpg");
	const fluidMuszaki2 = getFluid(data.allFile.edges, "muszaki2.jpg");
	const fluidSos = getFluid(data.allFile.edges, "sos_main4.png");

	let hash = "";
	if (isBrowser()) {
		hash = window.location.hash;
	}

	const muszakiVizsga = (
		<div>
			<p
				id="muszaki-vizsga"
				className="text-4xl text-black font-semibold mb-8 text-center md:text-left underline"
			>
				Műszaki vizsga
			</p>
			<div>Feltüntetett áraink bruttóban értendők.</div>
			<p
				id="elozetes-atvizsgalas-muszaki-elott"
				className="text-xl text-black font-semibold mb-8 text-center md:text-left mt-2"
			>
				Műszaki vizsga díja
			</p>
			<div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
					<thead>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Típus</td>
							<td className="bg-brand-yellowdark font-semibold text-black">Díjak (bruttó)</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Személygépkocsi (M1)</td>
							<td className="font-bold text-black">16.290 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (N1)</td>
							<td className="font-bold text-black">17.090 Ft</td>
						</tr>
						<tr>
							<td>Motorkerékpár (L3e)</td>
							<td className="font-bold text-black">4.360 Ft</td>
						</tr>
						<tr>
							<td>Utánfutó (O1)</td>
							<td className="font-bold text-black">10.490 Ft</td>
						</tr>
						<tr>
							<td>Személygépkocsi (4x4 - M1G)</td>
							<td className="font-bold text-black">20.390 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (4x4 - N1G)</td>
							<td className="font-bold text-black">21.190 Ft</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p
				id="elozetes-atvizsgalas-muszaki-elott"
				className="text-xl text-black font-semibold mb-8 text-center md:text-left"
			>
				Előzetes átvizsgálás díja (külön kérelemre)
			</p>
			<div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
					<thead>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Típus</td>
							<td className="bg-brand-yellowdark font-semibold text-black">Díjak (bruttó)</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Személygépkocsi (M1)</td>
							<td className="font-bold text-black">7.710 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (N1)</td>
							<td className="font-bold text-black">7.910 Ft</td>
						</tr>
						<tr>
							<td>Motorkerékpár (L3e)</td>
							<td className="font-bold text-black">7.640 Ft</td>
						</tr>
						<tr>
							<td>Utánfutó (O1)</td>
							<td className="font-bold text-black">9.510 Ft</td>
						</tr>
						<tr>
							<td>Személygépkocsi (4x4 - M1G)</td>
							<td className="font-bold text-black">7.710 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (4x4 - N1G)</td>
							<td className="font-bold text-black">7.910 Ft</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="text-red-600 font-bold">
				A műszaki vizsgálatot megelőző úgynevezett előzetes átvizsgálást, kizárólag az ügyfél kérelmére
				végezzük, megrendelés alapján.
			</div>
			<p
				id="elozetes-atvizsgalas-muszaki-elott"
				className="text-xl text-black font-semibold mb-8 text-center md:text-left mt-2"
			>
				Műszaki vizsga díja <span className="underline">előzetes átvizsgálással együtt</span>
			</p>
			<div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
					<thead>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Típus</td>
							<td className="bg-brand-yellowdark font-semibold text-black">Díjak (bruttó)</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Személygépkocsi (M1)</td>
							<td className="font-bold text-black">24.000 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (N1)</td>
							<td className="font-bold text-black">25.000 Ft</td>
						</tr>
						<tr>
							<td>Motorkerékpár (L3e)</td>
							<td className="font-bold text-black">12.000 Ft</td>
						</tr>
						<tr>
							<td>Utánfutó (O1)</td>
							<td className="font-bold text-black">20.000 Ft</td>
						</tr>
						<tr>
							<td>Személygépkocsi (4x4 - M1G)</td>
							<td className="font-bold text-black">28.000 Ft</td>
						</tr>
						<tr>
							<td>Tehergépkocsi (4x4 - N1G)</td>
							<td className="font-bold text-black">29.000 Ft</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="pt-4">Bankkártyás fizetés átmenetileg nem elérhető</div>
			<div className="pt-4">
				Ha a gépjármű állapota nem megfelelő a kategória szerinti átvizsgálási díj kerül felszámításra.
			</div>
			<div className="pt-4">
				Hiba esetén szervizünkben teljes körű javításra van lehetőség. Amennyiben gépjárművét nálunk javíttatja,
				az előzetes átvizsgálás díja nem kerül felszámításra.
			</div>
			<div className="pt-4">A műszaki vizsgához szükséges okmányok:</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>gépjármű forgalmi engedély</li>
				<li>személyi igazolvány vagy vezetői engedély</li>
				<li>kötelező gépjármű felelősségbiztosítás igazolás</li>
			</ul>
			<div className="pt-4">Cégek esetében:</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>aláírási címpéldány</li>
				<li>cégkivonat</li>
				<li>kötelező gépjármű felelősségbiztosítás igazolás</li>
			</ul>
		</div>
	);

	const autoSzerviz = (
		<div>
			<p id="autoszerviz" className="text-4xl text-black font-semibold text-center md:text-left underline">
				Autószerviz
			</p>
			<div className="pt-4">Teljeskörű gépjárműjavítás</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>Fék, futóműszerviz</li>
				<li>Gépjármű diagnosztika</li>
				<li>Időszakos karbantartás</li>
				<li>Fényszóró polírozás</li>
				<li>Műszaki vizsgára való felkészítés</li>
				<li>Gépjármű vásárlás előtti állapotfelmérés</li>
			</ul>
			<div className="pt-4 text-red-600 font-bold">A gépjármű javítás díja: bruttó 7.500 Ft/óra</div>
			<div className="pt-4">
				A javítás minden esetben a hiba feltárása és az előzetes árajánlat után történik.
			</div>
			<div className="pt-4">
				Az elvégzett munkára minden esetben garanciát vállalunk, melynek időtartama függ az elvégzett munka
				típusától.
			</div>
			<div className="pt-4">
				Hozott alkatrészre garanciát nem vállalunk, ebben az esetben a munkadíj összege is változhat.
			</div>
		</div>
	);

	const eredetisegVizsgalat = (
		<div>
			<p
				id="eredetiseg-vizsgalat"
				className="text-4xl text-black font-semibold text-center md:text-left underline"
			>
				Eredetiség vizsgálat
			</p>
			<div>
				<div className="mt-4 font-semibold">Hatósági árak (bruttó):</div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5" style={{ minWidth: "300px" }}>
					<thead>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Személygépjármű</td>
							<td className="bg-brand-yellowdark font-semibold text-black"></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1400 ccm3-ig</td>
							<td className="font-bold text-black">17.000 Ft</td>
						</tr>
						<tr>
							<td>1401-2000 ccm3</td>
							<td className="font-bold text-black">18.500 Ft</td>
						</tr>
						<tr>
							<td>2000 ccm3 felett</td>
							<td className="font-bold text-black">20.000 Ft</td>
						</tr>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Tehergépjármű</td>
							<td className="bg-brand-yellowdark font-semibold text-black"></td>
						</tr>
						<tr>
							<td>3,5 tonnáig</td>
							<td className="font-bold text-black">20.000 Ft</td>
						</tr>
						<tr>
							<td className="bg-brand-yellowdark font-semibold text-black">Motorkerékpár</td>
							<td className="bg-brand-yellowdark font-semibold text-black"></td>
						</tr>
						<tr>
							<td>500 ccm3 alatt</td>
							<td className="font-bold text-black">15.000 Ft</td>
						</tr>
						<tr>
							<td>500 ccm3 felett</td>
							<td className="font-bold text-black">17.000 Ft</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="pt-4 font-semibold">Szükséges okmányok:</div>
			<div className="pt-4">Magánszemély esetében</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>gépjármű adásvételi szerződés</li>
				<li>személy igazolvány</li>
				<li>lakcímkártya</li>
			</ul>
			<div className="pt-4">Cég esetében</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>gépjármű adásvételi szerződés</li>
				<li>cégkivonat</li>
				<li>aláírási címpéldány</li>
			</ul>
		</div>
	);

	const gumiSzerviz = (
		<div>
			<p id="gumiszerviz" className="text-4xl text-black font-semibold text-center md:text-left underline">
				Gumiszerviz
			</p>
			<div className="mt-4">Komplett szerelési árak (átszerelés, centírozás, kerékcsere)</div>
			<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
				<thead>
					<tr>
						<td className="bg-brand-yellowdark font-semibold text-black"></td>
						<td className="bg-brand-yellowdark font-semibold text-black">Lemezfelni</td>
						<td className="bg-brand-yellowdark font-semibold text-black">Alufelni</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Személygépjármű (13"-15")</td>
						<td className="font-bold text-black">2.000 Ft/db</td>
						<td className="font-bold text-black">2.500 Ft/db</td>
					</tr>
					<tr>
						<td>Személygépjármű (16"-17")</td>
						<td className="font-bold text-black">2.500 Ft/db</td>
						<td className="font-bold text-black">3.000 Ft/db</td>
					</tr>
					<tr>
						<td>Tehergépjármű</td>
						<td className="font-bold text-black text-center" colSpan={2}>
							3.500 Ft/db
						</td>
					</tr>
					<tr>
						<td>Gumiszelepház</td>
						<td className="font-bold text-center text-black" colSpan={2}>
							250 Ft/db
						</td>
					</tr>
					<tr>
						<td>Kerék le- és felszerelés centírozással</td>
						<td className="font-bold text-black">1.500 Ft/db</td>
						<td className="font-bold text-black">1.750 Ft/db</td>
					</tr>
				</tbody>
			</table>
			<div>Áraink bruttóban értendők és tartalmazzák a centírozáshoz szükséges anyagokat</div>
		</div>
	);

	// const sos = (
	// 	<div>
	// 		<p id="sos" className="text-4xl text-red-600 font-semibold text-center md:text-left underline">
	// 			S.O.S műszaki vizsga / eredetvizsgálat
	// 		</p>
	// 		<div className="mt-4 py-2 font-semibold">Lejárt a műszaki vizsgája?</div>
	// 		<div className="py-2 font-semibold">Azonnali megoldást keres?</div>
	// 		<div className="py-2 font-semibold">Sürgős eredetiségvizsgára lenne szüksége?</div>
	// 		<div className="mt-4 underline">
	// 			Az S.O.S. vizsga kizárólag munkanapon, nyitvatartási időben történik. A bejelentkezés napján, a
	// 			bejelentkezést követő 4 órán belül tudjuk válalni.
	// 		</div>
	// 		<div className="mt-4">
	// 			A bejelentkezéshez minden esetben telefonos egyeztetés szükséges. Ebben az esetben online időpont
	// 			foglalás nem lehetséges.
	// 		</div>
	// 		<div className="mt-4">
	// 			<div className="flex items-center font-semibold text-red-600 text-2xl">
	// 				<span>
	// 					<svg
	// 						className="h-6 w-6 fill-current mr-2 mt-1"
	// 						viewBox="0 0 1792 1792"
	// 						xmlns="http://www.w3.org/2000/svg"
	// 					>
	// 						<path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z" />
	// 					</svg>
	// 				</span>
	// 				<span className="">+36 (30) 131 4101</span>
	// 			</div>
	// 		</div>
	// 		<div className="mt-4">
	// 			Az S.O.S. szolgáltatás díja bruttó <span className="font-bold text-black">10.000 Ft</span>, mely a
	// 			Műszaki vizsga illetve az Eredetiség vizsga díján felül értendő.
	// 		</div>
	// 	</div>
	// );

	return (
		<Layout>
			<SEO title="Szolgáltatások" />
			<div className="container px-4 my-8">
				<div className="w-full">
					<div className="md:flex justify-between">
						<div className="mr-8">{muszakiVizsga}</div>
						<div>
							<Img
								className="hidden md:block mt-24"
								fluid={fluidMuszaki}
								alt="Műszaki vizsga"
								style={{ width: "800px" }}
							/>
							<Img
								className="hidden md:block mt-24"
								fluid={fluidMuszaki2}
								alt="Műszaki vizsga 2"
								style={{ width: "800px" }}
							/>
							{/* Mobile */}
							<Img
								className="md:hidden mt-8 m-auto"
								fluid={fluidMuszaki}
								alt="Műszaki vizsga"
								style={{ width: "300px" }}
							/>
						</div>
					</div>
					<div className="md:flex justify-between mt-8">
						<div className="mr-8">{autoSzerviz}</div>
						<Img
							className="hidden md:block mr-0 mt-24"
							fluid={fluidAutoSzerviz}
							alt="Autó szerviz"
							style={{ width: "600px" }}
						/>
						{/* Mobile */}
						<Img
							className="md:hidden m-auto mt-8"
							fluid={fluidAutoSzerviz}
							alt="Autó szerviz"
							style={{ width: "300px" }}
						/>
					</div>
					<div className="md:flex justify-between mt-8">
						<div className="mr-8">{eredetisegVizsgalat}</div>
						<Img
							className="hidden md:block mt-24"
							fluid={fluidEredetiseg}
							alt="Eredetiség vizsgálat"
							style={{ width: "500px" }}
						/>
						{/* Mobile */}
						<Img
							className="md:hidden mt-8 m-auto"
							fluid={fluidEredetiseg}
							alt="Eredetiség vizsgálat"
							style={{ width: "300px" }}
						/>
					</div>
					<div className="md:flex justify-between mt-8">
						<div className="mr-8">{gumiSzerviz}</div>
						<Img
							className="hidden md:block mt-24"
							fluid={fluidGumiSzerviz}
							alt="Gumiszerviz"
							style={{ width: "600px" }}
						/>
						{/* Mobile */}
						<Img
							className="md:hidden mt-8 m-auto"
							fluid={fluidGumiSzerviz}
							alt="Gumiszerviz"
							style={{ width: "300px" }}
						/>
					</div>
					{/* <div className="md:flex justify-between mt-8 md:mt-32">
						<div className="mr-8">{sos}</div>
						<Img
							className="hidden md:block mt-24"
							fluid={fluidSos}
							alt="S.O.S"
							style={{ width: "700px" }}
						/>
						<Img
							className="md:hidden mt-8 m-auto"
							fluid={fluidSos}
							alt="S.O.S"
							style={{ width: "300px" }}
						/>
					</div> */}
				</div>
			</div>
		</Layout>
	);
};

export default ServicesPage;
