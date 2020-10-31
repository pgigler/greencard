import React from "react";

const mapEventListenerKey = (customMapping, key: string) => {
	const customMapped = customMapping[key];
	if (customMapped) {
		return customMapped;
	} else {
		if (key.startsWith("on") && key.length > 2) {
			return key.substring(2, 3).toLowerCase() + key.substring(3);
		} else {
			return key;
		}
	}
};

const useCustomElement = (props, customMapping = {}) => {
	const ref = React.createRef<HTMLElement>();

	React.useLayoutEffect(() => {
		const { current } = ref;

		let fns;

		if (current) {
			// Add properties

			Object.keys(props)
				.filter((key) => !(props[key] instanceof Function))
				.forEach((key) => {
					const prop = props[key];
					const computedKey = customMapping[key] || key;

					if (computedKey === "class") {
						current.setAttribute(computedKey, prop);
					} else if (computedKey === "style") {
						Object.keys(prop).forEach((styleKey) => {
							current.style[styleKey] = prop[styleKey];
						});
					} else {
						current[computedKey] = prop;
					}
				});

			// Add event listeners
			fns = Object.keys(props)
				.filter((key) => props[key] instanceof Function)
				.map((key) => ({
					key: mapEventListenerKey(customMapping, key),
					fn: (customEvent) => {
						if (customEvent.detail !== undefined) {
							props[key](customEvent);
						}
					},
				}));

			fns.forEach(({ key, fn }) => current.addEventListener(key, fn));
		}

		return () => {
			if (current) {
				fns.forEach(({ key, fn }) => current.removeEventListener(key, fn));
			}
		};
	}, [customMapping, props, ref]);

	return [ref];
};

export default useCustomElement;
