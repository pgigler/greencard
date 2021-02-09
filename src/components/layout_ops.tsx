import React from "react";

import Footer from "./footer";
import "./../../assets/main.scss";

import Loadable from "@loadable/component";
import HeaderOps from "./ops/header_ops";

const LayoutOps = ({ children }: any) => {
	return (
		<>
			<HeaderOps />
			<div style={{ backgroundColor: "#acc3dc" }}>
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
		</>
	);
};

// const HeaderOps = Loadable(() => import("./ops/header_ops"));

export default LayoutOps;
