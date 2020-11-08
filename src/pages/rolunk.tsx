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
					Cégünk 2007-ben alakult. Kezdetben környezetvédelmi felülvizsgálattal valamint teljes körű gépjármű
					szereléssel foglalkozott. Szolgáltatásainkat ügyfeleink igényeihez igazítva kibővítettük. 2009 óta
					telephelyünk Hatóságilag kijelölt vizsgaállomás, ahol gépjárművére, kisteherautójára, motorjára
					EREDETISÉG és MŰSZAKI VIZSGÁT is készítünk.
				</p>
				<p className="text-lg my-8">
					Szervizünkben a teljes gépjármű szervizelés,karbantartás részeként, igény szerint gumiszerelést,
					fényszóró polírozást, belső motortisztítást, ózonos belső tisztítást is végzünk.
				</p>
				<p className="text-lg my-8">
					Fontos számunkra a bizalom. Ügyfeleink igényeit szem előtt tartva, a szerelés során felmerülő
					kérdésekre autószerelő kollegánk készséggel áll az önök rendelkezésére.
				</p>
			</div>
		</Layout>
	);
};

export default AboutUsPage;
