import { getCurrentUser } from "./auth";

const apiUrl = process.env.GATSBY_API_URL;

export interface ApiResponse {
	status: number;
	resp: any;
}

export class ApiClient {
	private abortController;

	public init() {
		this.abortController = new AbortController();
	}

	public async get(path: string): Promise<ApiResponse> {
		return this.fetch(path, "GET");
	}

	public async post(path: string, pBody: string | object): Promise<ApiResponse> {
		let body = "";
		if (typeof pBody === "string") {
			body = pBody;
		} else {
			body = JSON.stringify(pBody);
		}
		return this.fetch(path, "POST", body);
	}

	private async fetch(path: string, method: string, body?: string): Promise<ApiResponse> {
		const url = `${apiUrl}${path}`;

		const user = getCurrentUser();
		const options = { headers: {} as any, signal: this.abortController.signal } as RequestInit;
		options.headers = new Headers();
		options.headers.set("Content-Type", "application/json; charset=UTF-8");
		options.headers.set("Accept", "application/json; charset=UTF-8");
		options.method = method;
		if (body) {
			options.body = body;
		}

		if (user) {
			options.headers.set("X-Authorization", `Bearer ${user.id_token}`);
		}

		const resp = await fetch(url, options);

		if (resp.status < 300 && resp.status >= 200) {
			return { status: resp.status, resp: await resp.json() };
		} else if (resp.status === 401) {
			throw Error("401 - Authentication failed");
		} else if (resp.status === 404) {
			throw Error("404 - Not Found");
		} else if (resp.status === 409) {
			throw Error("409 - Conflict");
		} else if (resp.status === 500) {
			throw Error("500 - Server error");
		} else {
			throw Error(`${resp.status} - Unexpected error`);
		}
	}

	public teardown() {
		this.abortController.abort();
	}
}
