import "./dc-radio.scss";

import { html, TemplateResult } from "lit-html";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "dc-radio";

const DEFAULTS: Properties = {
	name: "",
	itemId: "",
	checked: false,
	content: html``,
};

interface Properties {
	name: string;
	itemId: string;
	checked: boolean;
	content: TemplateResult;
}

interface ChangeEventDetail {
	itemId: string;
}

export interface ChangeEvent {
	detail: ChangeEventDetail;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		name: host.name !== undefined ? host.name : `_${Math.random().toString(36).substr(2, 9)}`,
		itemId: host.itemId !== undefined ? host.itemId : DEFAULTS.itemId,
		checked: host.checked !== undefined ? host.checked : DEFAULTS.checked,
		content: host.content || DEFAULTS.content,
	};

	// Event Handlers

	const onChange = (e: CustomEvent, itemId: string) => {
		e.stopPropagation();
		host.dispatchEvent(
			new CustomEvent<ChangeEventDetail>("change", {
				detail: {
					itemId,
				},
			})
		);
	};

	// COMPONENT

	// TEMPLATE

	return html`
		<label class="flex items-center">
			<div class="container flex w-full items-center">
				<div class="w-9 mr-2 relative">
					<input
						type="radio"
						name=${props.name}
						?checked=${props.checked}
						@change=${(e: CustomEvent) => onChange(e, props.itemId)}
					/>
					<div class="checkmark"></div>
				</div>
				<div class="">${props.content}</div>
			</div>
		</label>
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
import { component } from "haunted";

const DCRadio = (props) => {
	const [ref] = useCustomElement(props);
	return <dc-radio ref={ref} />;
};

export default DCRadio;
