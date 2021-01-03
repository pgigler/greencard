import React, { useState, useEffect } from "react";
import { logout, getCurrentUser } from "../../util/auth";
import { isBrowser } from "../../util/helper";
import { Link, navigate, withPrefix } from "gatsby";

interface Menu {
	title: string;
	slug: string;
}

const MENUS: Menu[] = [
	{ title: "Időpont foglalások", slug: "/ops/appointments" },
	{ title: "Ügyfelek", slug: "/ops/ugyfelek" },
	{ title: "Profil", slug: "/ops/profil" },
];

const HeaderOps = () => {
	const [client, setClient] = useState(false);

	useEffect(() => {
		setClient(true);
	}, []);

	let path = "";
	if (isBrowser()) {
		path = window.location.pathname;
	}
	const user = getCurrentUser();
	const isLoggedIn = user !== undefined;

	const [menuVisible, setMenuVisible] = useState(false);

	const loginLogout = (
		<div className="m-2">
			{isLoggedIn ? (
				<a
					href="#"
					onClick={(event) => {
						event.preventDefault();
						logout(() => navigate(`/ops/login`));
					}}
				>
					<span className="px-4 btn btn-primary">Kilépés</span>
				</a>
			) : (
				<Link to="/ops/login" className="btn btn-primary">
					Belépés
				</Link>
			)}
		</div>
	);

	const nav = (
		<nav
			className={`${
				menuVisible ? "block md:flex" : "hidden md:flex"
			} md:h-full relative bg-white md:bg-transparent md:pb-0 z-10`}
		>
			{MENUS.map((item) => (
				<a
					key={`${item.slug}${client}`}
					href={withPrefix(item.slug)}
					onClick={(event) => {
						event.preventDefault();
						setMenuVisible(false);
						navigate(item.slug);
					}}
					className={`${
						isLoggedIn ? "block" : "hidden"
					} menu relative whitespace-no-wrap py-4 pl-2 md:py-0 md:pl-0 flex items-center ${
						(item.slug === "/" && (path === "/" || path === "/greencard/")) ||
						(item.slug !== "/" && path.indexOf(item.slug) > -1)
							? "active"
							: ""
					}`}
				>
					<h1 className="uppercase font-medium text-brand-grayt md:mx-2 z-20">{item.title}</h1>
					<div className="absolute bottom-0 left-0 w-full h-0"></div>
				</a>
			))}
			<div className="hidden md:block">{loginLogout}</div>
		</nav>
	);

	return (
		<div>
			<header className="sticky top-0 z-40 h-16 md:flex md:justify-between md:items-center select-none shadow bg-white">
				<div className="flex items-center h-full w-full justify-between md:p-0">
					<div className="text-4xl font-semibold tracking-wide font-sans pl-4">
						<Link to="/ops">GC-OPS</Link>
					</div>
					<div>{user ? <div className="pl-4">{user?.email}</div> : ""}</div>
					<div className="md:block"></div>
					<div className="md:hidden mr-4 flex items-center">
						<div className="md:hidden">{loginLogout}</div>
						<button
							onClick={() => setMenuVisible(!menuVisible)}
							type="button"
							className="block text-gray-600 focus:outline-none"
						>
							<div className={isLoggedIn ? "block" : "hidden"}>
								<div className={menuVisible ? "block" : "hidden"}>
									<svg
										className="h-4 w-4 fill-current hover:text-brand-yellow"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
									>
										<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
									</svg>
								</div>
								<div className={menuVisible ? "hidden" : "block"}>
									<div className="flex">
										<svg
											className="h-4 w-4 fill-current hover:text-brand-yellow"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
										</svg>
									</div>
								</div>
							</div>
						</button>
					</div>
				</div>
				{nav}
			</header>
		</div>
	);
};

export default HeaderOps;
