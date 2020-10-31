import { useLayoutEffect, useState, useEffect as reactUseEffect } from "react";
import { ApiClient } from "./ApiClient";
import { TemplateResult } from "lit-html";

export interface HauntedFunc<P extends object> {
	(this: (Element & P) | unknown, host: Element & P): TemplateResult | string;
	observedAttributes?: (keyof P)[];
}

export function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener("resize", updateSize);
		updateSize();
		return () => window.removeEventListener("resize", updateSize);
	}, []);
	return size;
}

export function useApiClient() {
	const [client] = useState<ApiClient>(
		(() => {
			const apiClient = new ApiClient();
			apiClient.init();
			return apiClient;
		})()
	);

	useEffect(() => {
		return () => {
			client?.teardown();
		};
	}, []);

	return client;
}

export function useEffect(
	callback: () => Promise<(() => void) | void> | ((() => void) | void),
	values?: unknown[] | undefined
): void {
	reactUseEffect(() => {
		// setTimeout is used, because useEffect can cascade between embedded components and can cause an update skipped (such as an "initial render")
		// const result = callback();
		// globalThis.setTimeout(() => {
		const result = callback();
		if (result instanceof Promise) {
			result.catch(async (reason) => {
				// eslint-disable-next-line no-console
				console.error(reason);
			});
		}
		// }, 0);
	}, values);
}
