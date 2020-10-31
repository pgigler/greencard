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
const name = "te-payment-modes";

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

export type PaymentMode = "cash" | "bank_transfer" | "card" | "none";

const PAYMENT_MODES: { [key in PaymentMode]: string } = {
	cash: "Készpénz",
	bank_transfer: "Banki átutalás",
	card: "Bankkártya",
	none: "Nincs kiválasztva",
};

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		mode: host.mode !== undefined ? host.mode : DEFAULTS.mode,
		checkoutData: host.checkoutData !== undefined ? host.checkoutData : DEFAULTS.checkoutData,
		actionTriggered: host.actionTriggered !== undefined ? host.actionTriggered : DEFAULTS.actionTriggered,
	};

	const [checkoutData, setCheckoutData] = useState<CheckoutData>(props.checkoutData);
	const [validationMessage, setValidationMessage] = useState<string>("");

	useEffect(() => {
		setCheckoutData(props.checkoutData);
	}, [props.checkoutData]);

	useEffect(() => {
		if (props.actionTriggered === "validate_and_next") {
			const validationResult = validateAllField();
			host.dispatchEvent(
				new CustomEvent<ActionFinishedEventDetail>("actionFinished", { detail: { validationResult } })
			);
		}
	}, [props.actionTriggered]);

	const handleChange = (e: DC.Radio.ChangeEvent) => {
		const paymentMode = e.detail.itemId as PaymentMode;
		checkoutData.paymentMode = paymentMode;
		host.dispatchEvent(
			new CustomEvent<CheckoutChangeEventDetail>("change", { detail: { checkoutData } })
		);
	};

	// TEMPLATE

	const header = () => {
		return html`<h1 class="text-2xl leading-tight font-semibold">Fizetési mód</h1>`;
	};

	const validateAllField = () => {
		setValidationMessage("");
		if (checkoutData.paymentMode === "none") {
			setValidationMessage("Fizetési mód kiválasztása kötelező");
		} else {
			return true;
		}
	};

	const normalTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-yellow-100">
				<div class="mb-2">
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"bank_transfer"}
						.checked=${checkoutData.paymentMode === "bank_transfer"}
						.content=${html`${PAYMENT_MODES.bank_transfer}`}
						@change=${handleChange}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"cash"}
						.checked=${checkoutData.paymentMode === "cash"}
						@change=${handleChange}
						.content=${html`<div>
							${PAYMENT_MODES.cash}
						</div>`}
					></dc-radio>
				</div>
				<!-- <div class="mb-2">
					<dc-radio
						.name=${"paymentMode"}
						.itemId=${"card"}
						@change=${handleChange}
						.content=${html`<div>
					<div>Kártya</div>
				</div>`}
					></dc-radio>
				</div> -->
				<div class="text-red-500 pt-4">${validationMessage}</div>
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-gray-100">
				<span class="checkout-data">${PAYMENT_MODES[checkoutData.paymentMode]}</span>
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
import { CheckoutData } from "../models/v1/CheckoutData";
import { isBrowser } from "../util/helper";

const PaymentModes = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-payment-modes ref={ref} />
		</div>
	);
};

export default PaymentModes;
