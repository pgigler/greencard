import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { getFixed } from "../util/helper";
import Img from "gatsby-image";

const Footer = () => {
	return (
		<footer className="main-footer bg-brand-gray2 text-brand-gray3 text-sm whitespace-no-wrap">
			<div className="container">
				<section className="flex flex-col items-center sm:flex-row sm:justify-between max-w-screen-xl mx-auto sm:items-start p-3">
					<div className="pb-12 flex flex-col md:w-1/3 items-center sm:items-start">
						<h2 className="text-white uppercase font-semibold text-lg mb-1">Cégadatok</h2>
						<div>Cégjegyzékszám: 01-06-617448</div>
						<div>Adószám: 28918721242-2-42</div>
					</div>
					<div id="kapcsolat" className="flex items-center flex-col md:w-1/3 pb-12">
						<h2 className="text-white uppercase font-semibold text-lg mb-1">Kapcsolat</h2>
						<div className="flex items-center">
							<span>
								<svg
									className="h-4 w-4 fill-current mr-2"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M1600 1240q0 27-10 70.5t-21 68.5q-21 50-122 106-94 51-186 51-27 0-53-3.5t-57.5-12.5-47-14.5-55.5-20.5-49-18q-98-35-175-83-127-79-264-216t-216-264q-48-77-83-175-3-9-18-49t-20.5-55.5-14.5-47-12.5-57.5-3.5-53q0-92 51-186 56-101 106-122 25-11 68.5-21t70.5-10q14 0 21 3 18 6 53 76 11 19 30 54t35 63.5 31 53.5q3 4 17.5 25t21.5 35.5 7 28.5q0 20-28.5 50t-62 55-62 53-28.5 46q0 9 5 22.5t8.5 20.5 14 24 11.5 19q76 137 174 235t235 174q2 1 19 11.5t24 14 20.5 8.5 22.5 5q18 0 46-28.5t53-62 55-62 50-28.5q14 0 28.5 7t35.5 21.5 25 17.5q25 15 53.5 31t63.5 35 54 30q70 35 76 53 3 7 3 21z" />
								</svg>
							</span>
							<span>+36 (XX) XXX XXXX</span>
						</div>
						<div>
							<a
								href="mailto:info@greencardbt.com"
								itemProp="email"
								className="flex items-center hover:text-brand-green"
							>
								<svg
									className="h-4 w-4 fill-current mr-2"
									viewBox="0 0 1792 1792"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z" />
								</svg>
								<span className="email-address">info@greencardbt.com</span>
							</a>
						</div>
					</div>
					<div className="flex flex-col md:w-1/3 items-center sm:items-end">
						<h2 className="text-white uppercase font-semibold text-lg mb-1">Zöldkártya Bt (1997)</h2>
						<div className="hover:text-brand-green">
							<a
								href="https://www.google.hu/maps/dir//47.4624743,19.1670784/@47.4624791,19.1670463,20.67z/data=!4m2!4m1!3e0?hl=hu"
								className="flex flex-col items-end"
							>
								<div itemScope itemType="http://schema.org/address" className="flex items-center">
									<svg
										className="h-4 w-4 fill-current mr-1"
										viewBox="0 0 1792 1792"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M1152 640q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm256 0q0 109-33 179l-364 774q-16 33-47.5 52t-67.5 19-67.5-19-46.5-52l-365-774q-33-70-33-179 0-212 150-362t362-150 362 150 150 362z" />
									</svg>
									<span itemProp="PostalAddress">Csombor u. 15. III/9</span>
								</div>
								<div itemScope itemType="http://schema.org/postalAddress">
									H-<span itemProp="PostalCode">1103</span> Budapest
								</div>
							</a>
							<div className="text-white flex my-2 justify-center sm:justify-end">
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
											className="h-8 w-8 fill-current hover:text-brand-green"
											viewBox="0 0 1792 1792"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm138 0q0 164-115 279t-279 115-279-115-115-279 115-279 279-115 279 115 115 279zm108-410q0 38-27 65t-65 27-65-27-27-65 27-65 65-27 65 27 27 65zm-502-220q-7 0-76.5-.5t-105.5 0-96.5 3-103 10-71.5 18.5q-50 20-88 58t-58 88q-11 29-18.5 71.5t-10 103-3 96.5 0 105.5.5 76.5-.5 76.5 0 105.5 3 96.5 10 103 18.5 71.5q20 50 58 88t88 58q29 11 71.5 18.5t103 10 96.5 3 105.5 0 76.5-.5 76.5.5 105.5 0 96.5-3 103-10 71.5-18.5q50-20 88-58t58-88q11-29 18.5-71.5t10-103 3-96.5 0-105.5-.5-76.5.5-76.5 0-105.5-3-96.5-10-103-18.5-71.5q-20-50-58-88t-88-58q-29-11-71.5-18.5t-103-10-96.5-3-105.5 0-76.5.5zm768 630q0 229-5 317-10 208-124 322t-322 124q-88 5-317 5t-317-5q-208-10-322-124t-124-322q-5-88-5-317t5-317q10-208 124-322t322-124q88-5 317-5t317 5q208 10 322 124t124 322q5 88 5 317z" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>

			<section className="bg-brand-gray1">
				<div className="flex flex-col items-center sm:flex-row sm:justify-around max-w-screen-xl mx-auto px-3 pb-2 pt-3">
					<div className="mb-2">
						<Link className="hover:text-brand-green" to="/adatvedelmi-tajekoztato">
							Adatvédelmi tájékoztató
						</Link>{" "}
						|{" "}
						<Link className="hover:text-brand-green" to="/altalanos-szerzodesi-feltetelek">
							Általános szerződési feltételek
						</Link>
					</div>
				</div>
			</section>
		</footer>
	);
};

export default Footer;
