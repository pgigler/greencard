import React from "react";

import Header from "./header";
import Footer from "./footer";
import "./../../assets/main.scss";

const Layout = ({ children }: any) => {
	return (
		<div style={{ backgroundColor: "#e8e3d1" }}>
			<Header />
			<div>
				<main>{children}</main>
				{process.env.NODE_ENV === "development" ? (
					<div className="fixed bottom-0 left-0 bg-gray-400 text-gray-700 font-medium p-4 z-10">
						<div className="sm:hidden">XS</div>
						<div className="hidden sm:block md:hidden">SM</div>
						<div className="hidden md:block lg:hidden">MD</div>
						<div className="hidden lg:block xl:hidden">LG</div>
						<div className="hidden xl:block">XL</div>
					</div>
				) : (
					""
				)}
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
