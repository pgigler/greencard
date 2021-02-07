import { default as moment } from "moment";

export const getFluid = (images: any, relativePath: string) => {
	return images.filter((image) => image.node.relativePath === relativePath)[0].node.childImageSharp.fluid;
};

export const getFixed = (images: any, relativePath: string) => {
	return images.filter((image) => image.node.relativePath === relativePath)[0].node.childImageSharp.fixed;
};

export const shiftRight = (list: any) => {
	return [list[list.length - 1], ...list.slice(0, list.length - 1)];
};

export const shiftLeft = (list: any) => {
	return [...list.slice(1), list[0]];
};

export const getImageUrlFromAsset = (getAsset: (...args: any[]) => any, assetName: string) => {
	if (getAsset) {
		const globalAssetName = assetName.replace(/\//, "-slash-");
		return getAsset(globalAssetName);
	} else {
		return "image not found";
	}
};

export const isBrowser = () => typeof window !== "undefined";

export const withErrorHandling = async (
	callback: () => Promise<void> | void,
	errorHandler: (error: any) => void,
	finallyFunc?: () => void
) => {
	try {
		await callback();
	} catch (error) {
		if (error && error.statusCode === 401) {
			window.location.reload();
		} else {
			errorHandler(error);
		}
	} finally {
		if (finallyFunc) {
			finallyFunc();
		}
	}
};

export const formatMoney = (pNum: number | string) => {
	const num = typeof pNum === "string" ? parseFloat(pNum) : pNum;
	return Intl.NumberFormat("hu-HU", { maximumSignificantDigits: 2 }).format(num) + " Ft";
};

export const validateEmail = (email: string) => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

export const isNumeric = (text: string) => {
	return text === text.replace(/[^\d]/g, "");
};

// source: https://prog.hu/tudastar/180161/javascript-adoszam-regex
export const validateHungarianTaxNumber = (taxNumber: string) => {
	const matches = taxNumber.match(/^(\d{7})(\d)\-([1-5])\-(0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/);

	if (!matches) {
		return false;
	}

	const mul = [9, 7, 3, 1, 9, 7, 3];
	const firstSevenDigit = matches[1].split("");
	const checkDigit = parseInt(matches[2]);
	const checkSum = [0, 1, 2, 3, 4, 5, 6].reduce((aggr, i) => aggr + parseInt(firstSevenDigit[i]) * mul[i], 0) % 10;
	return checkDigit === (checkSum > 0 ? 10 - checkSum : checkSum);
};

export const isEmpty = (text: string | undefined) => {
	return text === undefined || text.trim().length === 0;
};

export const getQueryParam = (paramName: string, defaultValue?: string): string | undefined => {
	if (isBrowser()) {
		const list = getSearchParamList(window.location.search);
		const filteredList = list.filter((item) => item[0] === paramName);
		if (filteredList.length > 0) {
			return filteredList[0][1];
		}
	}

	return defaultValue;
};

export const hasQueryParam = (paramName: string) => {
	if (isBrowser()) {
		const list = getSearchParamList(window.location.search);
		return list.some((item) => item[0] === paramName);
	}

	return false;
};

const getSearchParamList = (search = ``) => {
	const hashes = search.slice(search.indexOf(`?`) + 1).split(`&`);
	return hashes.reduce((acc, hash) => {
		const [key, val] = hash.split(`=`);
		acc.push([key, decodeURIComponent(val)]);
		return acc;
	}, [] as string[][]);
};

const DefaultDateFormat = "YYYY-MM-DD";
const DefaultDateTimeFormat = "YYYY-MM-DD HH:mm";
const DefaultTimestampFormat = "YYYY-MM-DD HH:mm:ss.SSS";
export const parseDate = (dateStr: string): moment.Moment => {
	return moment(dateStr, DefaultDateFormat);
};
export const parseDateTime = (dateStr: string): moment.Moment => {
	return moment(dateStr, DefaultDateTimeFormat);
};
export const parseTimestamp = (dateStr: string): moment.Moment => {
	return moment(dateStr, DefaultTimestampFormat);
};
export const formatDate = (date: Date | moment.Moment): string => {
	if (!date) {
		return "undefined";
	} else if (date instanceof Date) {
		return moment(date).format(DefaultDateFormat);
	} else {
		return date.format(DefaultDateFormat);
	}
};
export const formatDateTime = (date: Date | moment.Moment): string => {
	if (!date) {
		return "undefined";
	} else if (date instanceof Date) {
		return moment(date).format(DefaultDateTimeFormat);
	} else {
		return date.format(DefaultDateTimeFormat);
	}
};
export const formatTimestamp = (date: Date | moment.Moment): string => {
	if (!date) {
		return "undefined";
	} else if (date instanceof Date) {
		return moment(date).format(DefaultTimestampFormat);
	} else {
		return date.format(DefaultDateTimeFormat);
	}
};
