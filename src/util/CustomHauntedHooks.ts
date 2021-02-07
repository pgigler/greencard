import {
	useEffect as hauntedUseEffect,
	useState as hauntedUseState,
	useMemo as hauntedUseMemo,
	useLayoutEffect as hauntedUseLayoutEffect,
	useReducer as hauntedUseReducer,
} from "haunted";
import { ApiClient } from "./ApiClient";
import { TemplateResult } from "lit-html";

export interface HauntedFunc<P extends object> {
	(this: (Element & P) | unknown, host: Element & P): TemplateResult | string;
	observedAttributes?: (keyof P)[];
}

export function useWindowSize() {
	const [size, setSize] = hauntedUseState([0, 0]);
	hauntedUseLayoutEffect(() => {
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
	const [client] = hauntedUseState<ApiClient>(
		(() => {
			const apiClient = new ApiClient();
			apiClient.init();
			return apiClient;
		})()
	);

	hauntedUseEffect(() => {
		return () => {
			client?.teardown();
		};
	}, []);

	return client;
}

export const useState = hauntedUseState;
export const useMemo = hauntedUseMemo;
export const useReducer = hauntedUseReducer;

export function useEffect(
	callback: () => Promise<(() => void) | void> | ((() => void) | void),
	values?: unknown[] | undefined
): void {
	hauntedUseEffect(() => {
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

export const useLoadingReducer = () =>
	hauntedUseReducer(
		(state: { count: number }, action: "inc" | "dec") => {
			if (action === "inc") {
				return { count: state.count + 1 };
			} else if (action === "dec") {
				return { count: state.count - 1 };
			} else {
				return state;
			}
		},
		{ count: 0 }
	);
