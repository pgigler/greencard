import { useEffect, useState, component } from "haunted";
import {
	CheckoutMode,
	CheckoutChangeEvent,
	ActionFinishedEvent,
	ActionType,
	ActionFinishedEventDetail,
	CheckoutChangeEventDetail,
} from "../pages/megrendeles";
import homeDeliveryPlaces from "../../data/home_delivery_places.json";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";
import "../ui/dc-components";
import * as DC from "../ui/dc-components-typing";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "te-transport-modes";

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

export type TransportMode = "personal_collection" | "home_delivery" | "none";

const TRANSPORT_MODES: { [key in TransportMode]: string } = {
	personal_collection: "Személyes átvétel (cím: 8360 Keszthely, Sömögyei út. 3; telefonszám: +36 (30) 207 0883)",
	home_delivery: "Házhozszállítás",
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

	const validateAllField = () => {
		setValidationMessage("");
		if (checkoutData.transportMode === "none") {
			setValidationMessage("Szállítási mód kiválasztása kötelező");
		} else if (checkoutData.transportMode === "home_delivery" && isEmpty(checkoutData.shippingAddress.zip)) {
			setValidationMessage("Kérem válasszon települést");
		} else {
			return true;
		}
	};

	const handleChange = (e: DC.Radio.ChangeEvent) => {
		const transportMode = e.detail.itemId as TransportMode;
		checkoutData.transportMode = transportMode;
		host.dispatchEvent(
			new CustomEvent<CheckoutChangeEventDetail>("change", { detail: { checkoutData } })
		);
	};

	const handlePlaceChange = (e: DC.Select.SelectChangeEvent) => {
		const selectedPlace: any = homeDeliveryPlaces[e.detail.selectedIndex as number];
		CheckoutData.setSelectedPlace(checkoutData, selectedPlace.place, selectedPlace.zip);
		host.dispatchEvent(
			new CustomEvent<CheckoutChangeEventDetail>("change", { detail: { checkoutData } })
		);
	};

	// TEMPLATE

	const header = () => {
		return html`<h1 class="text-2xl leading-tight font-semibold">Szállítási mód</h1>`;
	};

	const normalTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-yellow-100">
				<div class="mb-2">
					<dc-radio
						.name=${"deliveryMode"}
						.itemId=${"personal_collection"}
						.checked=${checkoutData.transportMode === "personal_collection"}
						@change=${handleChange}
						.content=${html`${TRANSPORT_MODES.personal_collection}`}
					></dc-radio>
				</div>
				<div>
					<dc-radio
						.name=${"deliveryMode"}
						.itemId=${"home_delivery"}
						.checked=${checkoutData.transportMode === "home_delivery"}
						.content=${html`${TRANSPORT_MODES.home_delivery}`}
						@change=${handleChange}
					></dc-radio>
					<div class="${checkoutData.transportMode === "home_delivery" ? "" : "hidden"}">
						<div>Kérem adjon meg irányítószámot vagy településnevet *:</div>
						<div class="sm:w-2/3 md:w-1/2">
							<dc-select
								.dataSource=${homeDeliveryPlaces.map((item) => `${item.place}, ${item.zip}`)}
								.selectedValues=${`${checkoutData.shippingAddress?.city}, ${checkoutData.shippingAddress?.zip}`}
								@change=${handlePlaceChange}
							></dc-select>
						</div>
						<div class="mb-2 mt-4">
							Házhozszállítás az alábbi településeken lehetséges jelenleg:
						</div>
						<ul>
							${homeDeliveryPlaces.map((item) => html`<li>${item.place}, ${item.zip}</li>`)}
						</ul>
					</div>
				</div>
				<div class="text-red-500 pt-4">${validationMessage}</div>
			</div>
		</div> `;
	};

	const collapsedTemplate = () => {
		return html`<div>
			${header()}
			<div class="p-2 border bg-gray-100">
				<span class="checkout-data"
					>${TRANSPORT_MODES[checkoutData.transportMode]}
					${checkoutData.transportMode === "home_delivery"
						? `(${checkoutData.shippingAddress?.city}, ${checkoutData.shippingAddress?.zip})`
						: ""}
				</span>
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
import { isEmpty, isBrowser } from "../util/helper";

const TransportModes = (props) => {
	const [ref] = useCustomElement(props);
	return (
		<div>
			<te-transport-modes ref={ref} />
		</div>
	);
};

export default TransportModes;
