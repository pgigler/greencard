import React from "react";
import { Link } from "gatsby";

const GetInTouch = () => {
	return (
		<div id="getInTouch" className="bg-brand-green text-black">
			<div className="container p-4">
				<h1 className="mb-4 text-xl font-semibold">Lépjen velünk kapcsolatba!</h1>
				<ul className="list-disc list-inside mb-4">
					<li>Műszaki vizsga, autószerelés?</li>
					<li>
						Egy megbízható szolgáltatóra van szüksége, aki megfelelő szakmai segítséget is tud nyújtani?
					</li>
					<li>Máshol javíttatott és nem elégedett az eredménnyel?</li>
				</ul>
				<p>Nyugodtan forduljon hozzánk, segítünk amiben tudunk.</p>
				<a className="text-right link-inverse" href={`mailto:zoldkartyabt1@gmail.com?subject=weboldalról`}>
					<div className="uppercase">Email &#10230;</div>
				</a>
			</div>
		</div>
	);
};

export default GetInTouch;
