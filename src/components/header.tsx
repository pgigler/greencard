import { Link, useStaticQuery, graphql } from "gatsby";
import React, { useState, useEffect, useContext } from "react";
import { isBrowser } from "../util/helper";

interface Menu {
	title: string;
	slug: string;
	hash?: string;
}

const MENUS: Menu[] = [
	{ title: "Kezdőlap", slug: "/" },
	{ title: "Szolgáltatások", slug: "/szolgaltatasok" },
	{ title: "Rólunk", slug: "/rolunk" },
	{ title: "Kapcsolat", slug: "/#kapcsolat" },
];

const Header = () => {
	const [client, setClient] = useState(false);

	useEffect(() => {
		setClient(true);
	}, []);

	let path = "";
	if (isBrowser()) {
		path = window.location.pathname;
	}
	const [menuVisible, setMenuVisible] = useState(false);

	return (
		<header className="sticky top-0 z-40 h-16 md:flex md:justify-between md:items-center select-none shadow bg-white">
			<div className="flex items-center h-full w-full justify-between md:p-0">
				<div className="text-black flex mb-2 ml-2">
					<div>
						<a href="https://www.facebook.com/Z%C3%B6ldk%C3%A1rtya-Bt-104471474543433/">
							<svg
								className="h-8 w-8 fill-current hover:text-brand-green mr-2"
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z" />
							</svg>
						</a>
					</div>
					<div>
						<a href="https://instagram.com/zoldkartyabt">
							<svg
								className="h-8 w-8 fill-current hover:text-brand-green mr-2"
								viewBox="0 0 1792 1792"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z" />
							</svg>
						</a>
					</div>
				</div>
				<div className="text-4xl font-semibold tracking-wide font-sans">
					<Link to="/">Zöldkártya Bt.</Link>
				</div>
				<div className="md:block"></div>

			</div>
			<nav
				className={`${
					menuVisible ? "block" : "hidden"
				} relative md:flex bg-white md:bg-transparent md:h-full md:pb-0 z-10`}
			>
				{MENUS.map((item) => (
					<Link
						key={`${item.slug}${client}`}
						to={`${item.slug}${item.hash ? `#${item.hash}` : ""}`}
						className={`menu relative whitespace-no-wrap py-4 pl-2 md:py-0 md:pl-0 flex items-center ${
							(item.slug === "/" && (path === "/" || path === "/greencard/")) ||
							(item.slug !== "/" && path.indexOf(item.slug) > -1)
								? "active"
								: ""
						}`}
					>
						<h1 className="uppercase font-medium text-brand-grayt md:mx-2 z-20">{item.title}</h1>
						<div className="absolute bottom-0 left-0 w-full h-0"></div>
					</Link>
				))}
			</nav>
		</header>
	);
};

export default Header;
