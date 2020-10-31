import "./dc-select.scss";

import { html } from "lit-html";
import { classMap } from "lit-html/directives/class-map";

import { useState, useEffect, component } from "haunted";
import { HauntedFunc } from "../util/customhooks";

const observedAttributes: (keyof Properties)[] = [];
const useShadowDOM = false;
const name = "dc-select";

const DEFAULTS: Properties = {
	multiSelect: false,
	dataSource: [] as string[],
	selectedValues: [] as number[],
	selectedIndices: [] as number[],
};

interface Properties {
	multiSelect: boolean;
	dataSource: (SelectItem | { label: string; value: number } | string | number)[];
	selectedValues: string | number | (string | number)[];
	selectedIndices: number[];
	label?: string;
}

interface ChangeEventDetail {
	selectedIndex?: number;
	selectedIndices?: number[];
	selectedValue?: string;
	selectedValues?: string[];
}

export interface SelectItem {
	label: string;
	value: string;
}

export interface SelectChangeEvent {
	detail: ChangeEventDetail;
}

const Component: HauntedFunc<Properties> = (host) => {
	const props: Properties = {
		multiSelect: host.multiSelect !== undefined ? host.multiSelect : DEFAULTS.multiSelect,
		dataSource: host.dataSource !== undefined ? host.dataSource : DEFAULTS.dataSource,
		selectedValues: host.selectedValues !== undefined ? host.selectedValues : DEFAULTS.selectedValues,
		selectedIndices: host.selectedIndices !== undefined ? host.selectedIndices : DEFAULTS.selectedIndices,
		label: host.label !== undefined ? host.label : DEFAULTS.label,
	};

	// Event Handlers

	const onItemClicked = (index: number) => {
		return (_e: Event) => {
			let newIndices: number[] = [];
			if (props.multiSelect) {
				newIndices = selectedIndices.some((i) => i === index)
					? selectedIndices.filter((i) => i !== index)
					: selectedIndices.concat([index]);
			} else {
				newIndices = [index];
			}

			setSelectedIndices(newIndices);

			if (props.multiSelect) {
				host.dispatchEvent(
					new CustomEvent("change", {
						detail: {
							selectedIndices: newIndices,
							selectedValues: newIndices.map((i) => dataSource[i].value),
						},
					})
				);
			} else {
				setOpened(false);
				host.dispatchEvent(
					new CustomEvent("change", {
						detail: {
							selectedIndex: index,
							selectedValue: dataSource[index].value,
						},
					})
				);
			}
		};
	};

	// COMPONENT

	const [dataSource, setDataSource] = useState<SelectItem[]>([]);
	const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
	const [opened, setOpened] = useState(false);

	const init = () => {
		const onClickedOutside = (e: Event) => {
			if (!host.contains(e.target as Node)) {
				setOpened(false);
			}
		};
		const onCloseOnEscKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setOpened(false);
			}
		};
		document.addEventListener("keyup", onCloseOnEscKey, true);
		document.addEventListener("click", onClickedOutside);
		return () => {
			document.removeEventListener("keyup", onCloseOnEscKey);
			document.removeEventListener("click", onClickedOutside);
		};
	};

	useEffect(init, []);

	useEffect(() => {
		const newDataSource = props.dataSource.map((item) => {
			if (typeof item === "string") {
				return { label: item, value: item };
			} else if (typeof item === "number") {
				return {
					label: item.toString(),
					value: item.toString(),
				};
			} else {
				if (typeof item.value === "number") {
					return {
						label: item.label,
						value: item.value.toString(),
					};
				} else {
					return item as SelectItem;
				}
			}
		});

		setDataSource(newDataSource);

		if (props.selectedValues) {
			let tempSelectedValues: string[];
			if (typeof props.selectedValues === "string") {
				tempSelectedValues = [props.selectedValues];
			} else if (typeof props.selectedValues === "number") {
				tempSelectedValues = [props.selectedValues.toString()];
			} else {
				tempSelectedValues = props.selectedValues.map((v) => (typeof v === "number" ? v.toString() : v));
			}
			setSelectedIndices(
				newDataSource.reduce((aggr: number[], item, currentIndex) => {
					return aggr.concat(
						tempSelectedValues.some((selVal) => selVal === item.value) ? [currentIndex] : []
					);
				}, [])
			);
		} else {
			setSelectedIndices(props.selectedIndices || []);
		}
	}, [props.dataSource, props.selectedIndices, props.selectedValues]);

	// TEMPLATE

	// TODO Add PerfectScrollbar
	// TODO Handle opening upwards if needed (with adding an onOpen event)
	return html`
		<div class=${classMap({ "dc-select": true, opened })} @click=${() => setOpened(!opened)}>
			${props.label !== undefined ? html`<label class="form-label">${props.label}</label>` : ""}
			<input
				class="select-input"
				readonly="readonly"
				value=${selectedIndices.map((selInd) => dataSource[selInd].label).join(", ")}
			/>
			${opened
				? html`
						<ul class="select-items">
							${dataSource.map(
								(item, index) =>
									html`
										<li
											@click=${onItemClicked(index)}
											class=${classMap({
												selected: selectedIndices.some((i) => i === index),
											})}
										>
											${item.label}
										</li>
									`
							)}
						</ul>
				  `
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

const DCSelect = (props) => {
	const [ref] = useCustomElement(props);
	return <dc-select ref={ref} />;
};

export default DCSelect;
