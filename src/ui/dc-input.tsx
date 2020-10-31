import { useEffect, useState, component } from "haunted";
import "./dc-input.scss";

import { html } from "lit-html";
import { HauntedFunc } from "../util/customhooks";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "dc-input";

const DEFAULTS: Properties = {
	label: "",
	placeholder: "",
	value: "",
	readonly: false,
	email: false,
};

interface Properties {
	label: string;
	placeholder: string;
	value: string;
	email: boolean;
	validationMessage?: string;
	readonly?: boolean;
	multiline?: boolean;
	rows?: number;
}

interface ChangeEventDetail {
	value: string;
}

export interface ChangeEvent {
	detail: ChangeEventDetail;
}

interface KeyUpEventDetail {
	keyCode: number;
}

export interface KeyUpEvent {
	detail: KeyUpEventDetail;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		label: host.label !== undefined ? host.label : DEFAULTS.label,
		placeholder: host.placeholder !== undefined ? host.placeholder : DEFAULTS.placeholder,
		value: host.value !== undefined ? host.value : DEFAULTS.value,
		email: host.email !== undefined ? host.email : DEFAULTS.email,
		validationMessage: host.validationMessage,
		readonly: host.readonly !== undefined ? host.readonly : DEFAULTS.readonly,
		multiline: host.multiline !== undefined ? host.multiline : DEFAULTS.multiline,
		rows: host.rows !== undefined ? host.rows : DEFAULTS.rows,
	};

	// Event Handlers

	const onChange = (e: CustomEvent) => {
		if (!props.readonly) {
			e.stopPropagation();
			host.dispatchEvent(
				new CustomEvent<ChangeEventDetail>("change", {
					detail: {
						value: (e.currentTarget as any).value,
					},
				})
			);
		}
	};

	const onKeyUp = (e: KeyboardEvent) => {
		if (!props.readonly) {
			e.stopPropagation();
			host.dispatchEvent(
				new CustomEvent<ChangeEventDetail>("keyUp", {
					detail: {
						value: (e.currentTarget as any).value,
					},
				})
			);
		}
	};

	// COMPONENT

	const [componentId, setComponentId] = useState<string>("");

	useEffect(() => {
		const elem = document.getElementById(componentId) as HTMLInputElement;

		if (elem) {
			elem.value = props.value;
		}
	}, [props.value]);

	useEffect(() => {
		const id = `_${name}_${Math.random().toString(36).substr(2, 9)}`;
		setComponentId(id);
	}, []);

	// TEMPLATE

	return html`
		${props.label !== undefined ? html`<label class="form-label">${props.label}</label>` : ""}
		<div class="mb-4 relative">
			${props.multiline
				? html`<textarea
						id=${componentId}
						class=${props.validationMessage ? "invalid" : ""}
						?readonly=${props.readonly}
						@change=${onChange}
						@keyup=${onKeyUp}
						placeholder=${props.placeholder}
						rows=${props.rows}
				  >
${props.value}</textarea
				  >`
				: html`<input
						id=${componentId}
						type=${props.email ? "email" : "text"}
						class=${props.validationMessage ? "invalid" : ""}
						value=${props.value}
						?readonly=${props.readonly}
						@change=${onChange}
						@keyup=${onKeyUp}
						placeholder=${props.placeholder}
				  />`}
			${props.validationMessage && !props.multiline
				? html` <div class="validation-result-input">${props.validationMessage}</div> `
				: ""}
			${props.validationMessage && props.multiline
				? html` <div class="validation-result-textarea">${props.validationMessage}</div> `
				: ""}
		</div>
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

const DCInput = (props) => {
	const [ref] = useCustomElement(props);
	return <dc-input class={props.embedded ? "embedded" : ""} ref={ref} />;
};

export default DCInput;
