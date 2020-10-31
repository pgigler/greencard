import { CheckoutData as CheckoutDataV1 } from "../models/v1/CheckoutData";

export class CheckoutManager {
	private sessionStorage: Storage;

	constructor(sessionStorage: Storage) {
		this.sessionStorage = sessionStorage;
	}

	public saveCheckoutData = (checkoutData: CheckoutDataV1) => {
		this.sessionStorage.checkoutData = JSON.stringify(checkoutData);
		this.sessionStorage.checkoutDataVersion = checkoutData.version;
	};

	public removeCheckoutData = () => {
		this.sessionStorage.removeItem("checkoutData");
		this.sessionStorage.removeItem("checkoutDataVersion");
	};

	public getCheckoutData = (): CheckoutDataV1 => {
		if (this.sessionStorage.checkoutData) {
			if (this.sessionStorage.checkoutDataVersion === "v1") {
				const checkoutData = JSON.parse(this.sessionStorage.checkoutData);
				return checkoutData;
			} else {
				this.removeCheckoutData();
				return new CheckoutDataV1();
			}
		} else {
			return new CheckoutDataV1();
		}
	};
}
