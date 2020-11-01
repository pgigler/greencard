import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { isBrowser } from "../util/helper";

const ServicesPage = () => {
	let hash = "";
	if (isBrowser()) {
		hash = window.location.hash;
	}

	const muszakiVizsga = (
		<div>
			<p
				id="muszaki-vizsga"
				className="text-4xl text-brand-greendark font-semibold my-8 text-center md:text-left"
			>
				Műszaki vizsga
			</p>
			<div>Feltüntetett áraink bruttóban értendők, valamint tartalmazzák az előzetes átvizsgálás díját.</div>
			<div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
					<tr>
						<td className="bg-brand-greendark font-semibold text-white">Típus</td>
						<td className="bg-brand-greendark font-semibold text-white">Díjak (bruttó)</td>
					</tr>
					<tr>
						<td>Személygépjármű (M1)</td>
						<td className="font-bold text-brand-greendark">22.000 Ft</td>
					</tr>
					<tr>
						<td>Személygépjármű (M1G)</td>
						<td className="font-bold text-brand-greendark">26.000 Ft</td>
					</tr>
					<tr>
						<td>Tehergépjármű (3.5 Tonnáig)</td>
						<td className="font-bold text-brand-greendark">27.000 Ft</td>
					</tr>
					<tr>
						<td>Motorkerékpár</td>
						<td className="font-bold text-brand-greendark">9.900 Ft</td>
					</tr>
					<tr>
						<td>Utánfutó (Fék nélkül)</td>
						<td className="font-bold text-brand-greendark">16.000 Ft</td>
					</tr>
					<tr>
						<td>Komplett állapotfelmérés</td>
						<td className="font-bold text-brand-greendark">10.000 Ft</td>
					</tr>
				</table>
			</div>
			<div className="pt-4">(fék,futómű átvizsgálás,festékréteg mérés,lengéscsillapító mérés)</div>
			<div className="pt-4">
				A műszaki vizsgára minden esetben előzetes átvizsgálás után kerül sor, melynek költségét a vizsga ára
				tartalmazza.
			</div>
			<div className="pt-4">
				Ha a gépjármű állapota nem megfelelő az átvizsgálási díj kerül felszámításra, melynek összege bruttó
				<span className="font-bold text-brand-greendark"> 5710 Ft.</span>
			</div>
			<div className="pt-4">
				Hiba esetén szervizünkben teljes körű javításra van lehetőség. Amennyiben gépjárművét nálunk javítatja,
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
			<p id="autoszerviz" className="text-4xl text-brand-greendark font-semibold mt-8 text-center md:text-left">
				Autószervíz
			</p>
			<div className="pt-4">Teljeskörű gépjárműjavítás</div>
			<ul className="list-disc list-inside mt-4 ml-4">
				<li>Fék, Futóműszervíz</li>
				<li>Motorszervíz</li>
				<li>Gépjármű diagnosztika</li>
				<li>Időszakos karbantartás</li>
				<li>Fényszóró polírozás</li>
				<li>Műszaki vizsgára való felkészítés</li>
				<li>Gépjármű vásárlás előtti állapotfelmérés</li>
			</ul>
			<div className="pt-4">
				A gépjármű javítás díja bruttó<span className="font-bold text-brand-greendark"> 7500/óra</span>
			</div>
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
				className="text-4xl text-brand-greendark font-semibold mt-8 text-center md:text-left"
			>
				Eredetiség vizsgálat
			</p>
			<div>
				<div className="mt-4 font-semibold">Hatósági árak (bruttó):</div>
				<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5" style={{ minWidth: "300px" }}>
					<tr>
						<td className="bg-brand-greendark font-semibold text-white">Személygépjármű</td>
						<td className="bg-brand-greendark font-semibold text-white"></td>
					</tr>
					<tr>
						<td>1400 ccm3-ig</td>
						<td className="font-bold text-brand-greendark">17.000 Ft</td>
					</tr>
					<tr>
						<td>1401-2000 ccm3</td>
						<td className="font-bold text-brand-greendark">18.500 Ft</td>
					</tr>
					<tr>
						<td>2000 ccm3 felett</td>
						<td className="font-bold text-brand-greendark">20.000 Ft</td>
					</tr>
					<tr>
						<td className="bg-brand-greendark font-semibold text-white">Tehergépjármű</td>
						<td className="bg-brand-greendark font-semibold text-white"></td>
					</tr>
					<tr>
						<td>3,5 tonnáig</td>
						<td className="font-bold text-brand-greendark">20.000 Ft</td>
					</tr>
					<tr>
						<td className="bg-brand-greendark font-semibold text-white">Motorkerékpár</td>
						<td className="bg-brand-greendark font-semibold text-white"></td>
					</tr>
					<tr>
						<td>500 ccm3 alatt</td>
						<td className="font-bold text-brand-greendark">15.000 Ft</td>
					</tr>
					<tr>
						<td>500 ccm3 felett</td>
						<td className="font-bold text-brand-greendark">17.000 Ft</td>
					</tr>
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
			<p id="gumiszerviz" className="text-4xl text-brand-greendark font-semibold mt-8 text-center md:text-left">
				Gumiszervíz
			</p>
			<div className="mt-4">Komplett szerelési árak (átszerelés, centírozás, kerékcsere)</div>
			<table className="mt-4 bg-gray-100 m-4" cellSpacing="5" cellPadding="5">
				<tr>
					<td className="bg-brand-greendark font-semibold text-white"></td>
					<td className="bg-brand-greendark font-semibold text-white">Lemezfelni</td>
					<td className="bg-brand-greendark font-semibold text-white">Alufelni</td>
				</tr>
				<tr>
					<td>Személygépjármű (13"-15")</td>
					<td className="font-bold text-brand-greendark">2000 Ft/db</td>
					<td className="font-bold text-brand-greendark">2500 Ft/db</td>
				</tr>
				<tr>
					<td>Személygépjármű (16"-17")</td>
					<td className="font-bold text-brand-greendark">2500 Ft/db</td>
					<td className="font-bold text-brand-greendark">3000 Ft/db</td>
				</tr>
				<tr>
					<td>Tehergépjármű</td>
					<td className="font-bold text-brand-greendark text-center" colSpan={2}>
						3500 Ft/db
					</td>
				</tr>
				<tr>
					<td>Gumiszelepház</td>
					<td className="font-bold text-center text-brand-greendark" colSpan={2}>
						250 Ft/db
					</td>
				</tr>
				<tr>
					<td>Kerék le- és felszerelés centírozással</td>
					<td className="font-bold text-brand-greendark">1500 Ft/db</td>
					<td className="font-bold text-brand-greendark">1750 Ft/db</td>
				</tr>
			</table>
			<div>Áraink bruttóban értendők és tartalmazzák a centírozáshoz szükséges anyagokat</div>
		</div>
	);

	const sos = (
		<div>
			<p id="sos" className="text-4xl text-red-600 font-semibold mt-8 text-center md:text-left">
				S.O.S műszaki vizsga / eredetvizsgálat
			</p>
			<div className="mt-4 py-2 font-semibold">Lejárt a műszaki vizsgája?</div>
			<div className="py-2 font-semibold">Azonnali megoldást keres?</div>
			<div className="py-2 font-semibold">Sürgős eredetiségvizsgára lenne szüksége?</div>
			<div className="mt-4 underline">
				Az S.O.S. vizsga kizárólag munkanapon, nyitvatartási időben történik. A bejelentkezés napján, a
				bejelentkezést követő 4 órán belül tudjuk válalni.
			</div>
			<div className="mt-4">
				A bejelentkezéshez minden esetben telefonos egyeztetés szükséges. Ebben az esetben online időpont
				foglalás nem lehetséges.
			</div>
			<div className="mt-4">
				Az S.O.S. szolgáltatás díja bruttó <span className="font-bold text-brand-greendark">5000 Ft</span>, mely
				a Műszaki vizsga illetve az Eredetiség vizsga díján felül értendő.
			</div>
		</div>
	);

	return (
		<Layout>
			<SEO title="Szolgáltatások" />
			<SEO title="Rólunk" />
			<div className="container px-4">
				<div className="w-full md:w-2/3 lg:w-1/2 mb-8">
					{muszakiVizsga}
					{autoSzerviz}
					{eredetisegVizsgalat}
					{gumiSzerviz}
					{sos}
				</div>
			</div>
		</Layout>
	);
};

export default ServicesPage;
