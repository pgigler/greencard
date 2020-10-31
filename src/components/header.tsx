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
		<header className="container top-0 z-40 h-16 md:flex md:justify-between md:items-center select-none bg-white">
			<div className="flex items-center h-full w-full justify-between md:p-0">
				<div className="text-4xl font-semibold tracking-wide font-sans text-brand-green1 ml-4">
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
