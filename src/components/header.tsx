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
					<Link to="/">ZÖLDKÁRTYA Bt</Link>
				</div>
				<div className="md:block"></div>
				<div className="md:hidden mr-4 flex items-center">
					<button
						onClick={() => setMenuVisible(!menuVisible)}
						type="button"
						className="block text-gray-600 focus:outline-none"
					>
						<div className={menuVisible ? "block" : "hidden"}>
							<svg
								className="h-4 w-4 fill-current hover:text-brand-blue"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
							>
								<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
							</svg>
						</div>
						<div className={menuVisible ? "hidden" : "block"}>
							<div className="flex">
								<svg
									className="h-4 w-4 fill-current hover:text-brand-blue"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
								>
									<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
								</svg>
							</div>
						</div>
					</button>
				</div>
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
