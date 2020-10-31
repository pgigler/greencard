import { useEffect, useState, component } from "haunted";
import {
	CheckoutMode,
	CheckoutChangeEvent,
	ActionFinishedEvent,
	ActionType,
	ActionFinishedEventDetail,
	CheckoutChangeEventDetail,
} from "../pages/megrendeles";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "te-shipping-and-billing";

const DEFAULTS: Properties = {
	mode: "HIDDEN",
	checkoutData: new CheckoutData(),
	actionTriggered: "none",
};

interface Properties {
	mode: CheckoutMode;
	checkoutData: CheckoutData;
	actionTriggered: ActionType;
}

const dispatchCheckoutChanged = (host, checkoutData) => {
	host.dispatchEvent(
		new CustomEvent<CheckoutChangeEventDetail>("change", { detail: { checkoutData } })
	);
};

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
		checkoutData: host.checkoutData !== undefined ? host.checkoutData : DEFAULTS.checkoutData,
		actionTriggered: host.actionTriggered !== undefined ? host.actionTriggered : DEFAULTS.actionTriggered,
	};

	const [checkoutData, setCheckoutData] = useState<CheckoutData>(props.checkoutData);
	const [validations, setValidations] = useState<
		{
			[key in ValidationKey]?: string;
		}
	>({});

	useEffect(() => {
		setCheckoutData(props.checkoutData);
		if (props.checkoutData.checkoutState !== checkoutData.checkoutState) {
			setValidations({});
		}
	}, [props.checkoutData]);

	useEffect(() => {
		if (props.actionTriggered === "validate_and_next") {
			const validationResult = validateAllField();
			host.dispatchEvent(
				new CustomEvent<ActionFinishedEventDetail>("actionFinished", { detail: { validationResult } })
			);
		}
	}, [props.actionTriggered]);

	const validateAllField = () => {
		const toValidateList: { [key in ValidationKey]?: string } = {
			email: checkoutData.email,
			phone: checkoutData.phone?.number,
			billingCity: checkoutData.billingAddress.city,
			billingStreet: checkoutData.billingAddress.street,
			billingZip: checkoutData.billingAddress.zip,
		};

		if (checkoutData.transportMode === "home_delivery") {
			toValidateList.shippingName = checkoutData.shippingAddress.name;
			toValidateList.shippingCity = checkoutData.shippingAddress.city;
			toValidateList.shippingStreet = checkoutData.shippingAddress.street;
			toValidateList.shippingZip = checkoutData.shippingAddress.zip;
			toValidateList.shippingRemark = checkoutData.shippingAddress.remark;
		}

		if (checkoutData.billingAddress.isCompany) {
			toValidateList.billingCompanyName = checkoutData.billingAddress.companyName;
			toValidateList.billingTaxNumber = checkoutData.billingAddress.taxNumber;
		} else {
			toValidateList.billingPersonalName = checkoutData.billingAddress.personalName;
		}

		const evaluation: { [key in ValidationKey]?: string } = {};

		Object.keys(toValidateList).forEach((key: string) => {
			evaluation[key] = CheckoutData.getValidationMessage(key as ValidationKey, toValidateList[key]);
		});

		setValidations({
			...validations,
			...evaluation,
		});

		return Object.keys(evaluation).reduce((aggr, key) => {
			return aggr && evaluation[key] === undefined;
		}, true);
	};

	const validateField = (field: ValidationKey, value: string) => {
		const validatedField = {};
		const message = CheckoutData.getValidationMessage(field, value);
		validatedField[field] = message;
		setValidations({
			...validations,
			...validatedField,
		});
	};

	// TEMPLATE

	const shippingAddressTemplate = (readonly: boolean) => {
		return html`<h2 class="text-xl py-4">Szállítási cím</h2>
			<div>
				${checkoutData.transportMode === "personal_collection"
					? html`<div>Személyes átvétel</div>`
					: html`<div class="pb-2">
								<dc-input
									.label=${"Név (vagy cégnév)*"}
									.value=${checkoutData.shippingAddress.name}
									.validationMessage=${validations.shippingName}
									.readonly=${readonly}
									@change=${(e: DC.Input.ChangeEvent) => {
										validateField("shippingName", e.detail.value);

										checkoutData.shippingAddress.name = e.detail.value;
										dispatchCheckoutChanged(host, checkoutData);
									}}
								></dc-input>
							</div>
							<div class="pb-2">
								<dc-input
									.label=${"Utca, házszám*"}
									.placeholder=${"pl.: Kossuth Lajos u. 4."}
									.value=${checkoutData.shippingAddress.street}
									.validationMessage=${validations.shippingStreet}
									.readonly=${readonly}
									@change=${(e: DC.Input.ChangeEvent) => {
										validateField("shippingStreet", e.detail.value);

										checkoutData.shippingAddress.street = e.detail.value;
										dispatchCheckoutChanged(host, checkoutData);
									}}
								></dc-input>
							</div>
							<div class="pb-2 flex">
								<dc-input
									class="w-20"
									.label=${"Ir.szám*"}
									.value=${checkoutData.shippingAddress.zip}
									.validationMessage=${validations.shippingZip}
									.readonly=${true}
									@change=${(e: DC.Input.ChangeEvent) => {
										validateField("shippingZip", e.detail.value);

										checkoutData.shippingAddress.zip = e.detail.value;
										dispatchCheckoutChanged(host, checkoutData);
									}}
								></dc-input>
								<dc-input
									class="w-full ml-2"
									.label=${"Település*"}
									.value=${checkoutData.shippingAddress.city}
									.validationMessage=${validations.shippingCity}
									.readonly=${true}
									@change=${(e: DC.Input.ChangeEvent) => {
										validateField("shippingCity", e.detail.value);

										checkoutData.shippingAddress.city = e.detail.value;
										dispatchCheckoutChanged(host, checkoutData);
									}}
								></dc-input>
							</div>
							<div>
								<dc-input
									.label=${"Megjegyzés a szállítónak (opcionális)"}
									.value=${checkoutData.shippingAddress.remark}
									.multiline=${true}
									.validationMessage=${validations.shippingRemark}
									.readonly=${readonly}
									.rows=${6}
									@change=${(e: DC.Input.ChangeEvent) => {
										validateField("shippingRemark", e.detail.value);

										checkoutData.shippingAddress.remark = e.detail.value;
										dispatchCheckoutChanged(host, checkoutData);
									}}
								></dc-input>
							</div>`}
			</div>`;
	};

	const billingAddressTemplate = (readonly: boolean) => {
		return html`<div class="flex justify-between items-baseline">
				<div><h2 class="text-xl py-4">Számlázási adatok</h2></div>
				<div>
					${readonly
						? ""
						: html`<a
								class="link cursor-pointer"
								@click=${(e: any) => {
									e.preventDefault();
									checkoutData.billingAddress.isCompany = !checkoutData.billingAddress.isCompany;
									dispatchCheckoutChanged(host, checkoutData);
									return false;
								}}
								href="#"
								>${checkoutData.billingAddress.isCompany
									? "Magánszemélyként vásárolok"
									: "Cégként vásárolok"}</a
						  >`}
				</div>
			</div>
			<div>
				<div></div>
				<div class="pb-2 ${checkoutData.billingAddress.isCompany ? "hidden" : ""}">
					<dc-input
						.label=${"Név*"}
						.value=${checkoutData.billingAddress.personalName}
						.validationMessage=${validations.billingPersonalName}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingPersonalName", e.detail.value);

							checkoutData.billingAddress.personalName = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
				<div class="pb-2 ${checkoutData.billingAddress.isCompany ? "" : "hidden"}">
					<dc-input
						.label=${"Cégnév*"}
						.value=${checkoutData.billingAddress.companyName}
						.validationMessage=${validations.billingCompanyName}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingCompanyName", e.detail.value);

							checkoutData.billingAddress.companyName = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
				<div class="pb-2 ${checkoutData.billingAddress.isCompany ? "" : "hidden"}">
					<dc-input
						.label=${"Adószám*"}
						.value=${checkoutData.billingAddress.taxNumber}
						.validationMessage=${validations.billingTaxNumber}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingTaxNumber", e.detail.value);

							checkoutData.billingAddress.taxNumber = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
				<div class="pb-2">
					<dc-input
						.label=${"Utca, házszám*"}
						.placeholder=${"pl.: Kossuth Lajos u. 4."}
						.value=${checkoutData.billingAddress.street}
						.validationMessage=${validations.billingStreet}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingStreet", e.detail.value);

							checkoutData.billingAddress.street = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
				<div class="pb-2 flex">
					<dc-input
						class="w-20"
						.label=${"Ir.szám*"}
						.value=${checkoutData.billingAddress.zip}
						.validationMessage=${validations.billingZip}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingZip", e.detail.value);

							checkoutData.billingAddress.zip = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
					<dc-input
						class="w-full ml-2"
						.label=${"Település*"}
						.value=${checkoutData.billingAddress.city}
						.validationMessage=${validations.billingCity}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("billingCity", e.detail.value);

							checkoutData.billingAddress.city = e.detail.value;
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
			</div>`;
	};

	const emailAndPhoneTemplate = (readonly: boolean) => {
		return html`<div class="md:flex pb-2">
			<div class="md:w-1/2">
				<dc-input
					.label=${"Email*"}
					.value=${checkoutData.email}
					.validationMessage=${validations.email}
					.readonly=${readonly}
					.email=${true}
					@change=${(e: DC.Input.ChangeEvent) => {
						validateField("email", e.detail.value);

						checkoutData.email = e.detail.value;
						dispatchCheckoutChanged(host, checkoutData);
					}}
				></dc-input>
			</div>
			<div class="md:w-1/2 flex ">
				<div class="md:ml-8 mr-2 w-20">
					<dc-input class="pt-6" .value=${"+36"} .readonly=${true}></dc-input>
				</div>
				<div class="w-full">
					<dc-input
						.label=${"Telefonszám*"}
						.value=${checkoutData.phone?.number}
						.validationMessage=${validations.phone}
						.readonly=${readonly}
						@change=${(e: DC.Input.ChangeEvent) => {
							validateField("phone", e.detail.value);

							checkoutData.phone = { countryPrefix: "36", number: e.detail.value };
							dispatchCheckoutChanged(host, checkoutData);
						}}
					></dc-input>
				</div>
			</div>
		</div>`;
	};

	const normalTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási és számlázási adatok</h1>
			<div class="p-2 border bg-yellow-100">
				${emailAndPhoneTemplate(false)}
				<div class="md:flex">
					<div class="w-full">
						${shippingAddressTemplate(false)}
					</div>
					<div class="md:ml-8 w-full">${billingAddressTemplate(false)}</div>
				</div>
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			<h1 class="text-2xl leading-tight font-semibold">Szállítási és számlázási adatok</h1>
			<div class="p-2 border bg-gray-100">
				<div>Email: <span class="checkout-data">${checkoutData.email}</span></div>
				<div>
					Telefonszám:
					<span class="checkout-data"
						>+${checkoutData.phone?.countryPrefix} ${checkoutData.phone?.number}</span
					>
				</div>
				<div class="mt-4 mb-2 text-xl font-semibold">Szállítási cím</div>
				${checkoutData.transportMode === "personal_collection"
					? html`<div><span class="checkout-data">Személyes átvétel</span></div>`
					: html`<div>
							<div><span class="checkout-data">${checkoutData.shippingAddress?.name}</span></div>
							<div>
								<span class="checkout-data"
									>${checkoutData.shippingAddress.city}, ${checkoutData.shippingAddress?.street}</span
								>
							</div>
							<div><span class="checkout-data">${checkoutData.shippingAddress?.zip}</span></div>
							${!isEmpty(checkoutData.shippingAddress?.remark)
								? html`<div class="pt-2">
										Megjegyzés a szállítónak:
										<span class="checkout-data">${checkoutData.shippingAddress?.remark}</span>
								  </div>`
								: ""}
					  </div>`}

				<div class="mt-4 mb-2 text-xl font-semibold">Számlázási adatok</div>
				${checkoutData.billingAddress?.isCompany
					? html`<div>
								Cégnév: <span class="checkout-data">${checkoutData.billingAddress?.companyName}</span>
							</div>
							<div>
								Adószám: <span class="checkout-data">${checkoutData.billingAddress?.taxNumber}</span>
							</div>`
					: html`<div>
							<span class="checkout-data">${checkoutData.billingAddress?.personalName}</span>
					  </div>`}

				<div>
					<span class="checkout-data"
						>${checkoutData.billingAddress?.city}, ${checkoutData.billingAddress?.street}</span
					>
				</div>
				<div><span class="checkout-data">${checkoutData.billingAddress?.zip}</span></div>
			</div>
		</div> `;
	};

	if (props.mode === "OPEN") {
		return normalTemplate();
	} else if (props.mode === "COLLAPSED") {
		return collapsedTemplate();
	} else {
		return "";
	}
};

if (isBrowser() && customElements.get(name) === undefined) {
	customElements.define(
		name,
		component<HTMLElement & Properties>(Component, {
			useShadowDOM,
			observedAttributes,
		})
	);
}

// React Wrapper

import React from "react";
import useCustomElement from "../util/useCustomElement";
import { CheckoutData, ValidationKey } from "../models/v1/CheckoutData";
import { isEmpty, isBrowser } from "../util/helper";

const ShippingAndBillingInfo = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-shipping-and-billing ref={ref} />
		</div>
	);
};

export default ShippingAndBillingInfo;
