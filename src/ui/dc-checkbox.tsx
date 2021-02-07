import "./dc-checkbox.scss";

import { html } from "lit-html";

import { useEffect, useState, component } from "haunted";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "dc-checkbox";

const DEFAULTS: Properties = {
	checked: false,
	label: "",
	readonly: false,
};

interface Properties {
	checked: boolean;
	label: string;
	readonly?: boolean;
}

interface ChangeEventDetail {
	checked: boolean;
}

export interface ChangeEvent {
	detail: ChangeEventDetail;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		checked: host.checked !== undefined ? host.checked : DEFAULTS.checked,
		label: host.label !== undefined ? host.label : DEFAULTS.label,
		readonly: host.readonly !== undefined ? host.readonly : DEFAULTS.readonly,
	};

	// Event Handlers

	const onClicked = (e: Event) => {
		if (!props.readonly) {
			e.stopPropagation();
			setChecked(!checked);
			host.dispatchEvent(
				new CustomEvent<ChangeEventDetail>("change", {
					detail: {
						checked,
					},
				})
			);
		}
	};

	// COMPONENT

	const [checked, setChecked] = useState(false);
	const [componentId, setComponentId] = useState<string>("");

	useEffect(() => {
		setChecked(props.checked);
	}, [props.checked]);

	useEffect(() => {
		const id = `_${name}_${Math.random().toString(36).substr(2, 9)}`;
		setComponentId(id);
	}, []);

	// TEMPLATE

	return html`
		<input
			type="checkbox"
			class="dc-checkbox"
			id="${componentId}"
			@click=${onClicked}
			?checked=${checked}
			?readonly=${props.readonly}
		/>
		<label class="form-label" for="${componentId}">${props.label}</label>
	`;
};

if (isBrowser()) {
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
import { isBrowser } from "../util/helper";
import { HauntedFunc } from "../util/CustomHauntedHooks";

const DCCheckbox = (props) => {
	const [ref] = useCustomElement(props);
	return <dc-checkbox ref={ref} />;
};

export default DCCheckbox;
