import axios from "axios";
import adapter from "axios/lib/adapters/http";
import { useErrorHandler } from "react-error-boundary";
import { createTrackedSelector } from "react-tracked";

import { API, getRouteURL } from "$globals/API";
import {
	APIError,
	type APIErrorProperties,
	API_ERRORS_MAP,
} from "$utils/APIError";
import { apiQueryStatusStore } from "$stores/api-query-status";

const IS_TEST = Boolean(process?.env.VITEST === "true");

/**
 * @description React custom hook function for a quick usage of the API client
 * routes.
 */
export function useAPI() {
	const lastQuery = createTrackedSelector(apiQueryStatusStore)();
	const errorHandler = useErrorHandler();
	// TODO: Replace axios with a custom fetch wrapper (built-in in Node.js now)
	const client = axios.create({
		adapter: IS_TEST ? adapter : undefined,
		baseURL: API.baseNameURL,
		headers: {
			"Access-Control-Allow-Origin": API.baseNameURL,
		},
		timeout: API.settings.requestTimeout,
	});

	// Use React Error Boundary to handle no connection with the API
	client.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.message === "Network Error") {
				errorHandler(
					new APIError(API_ERRORS_MAP.get(500) as APIErrorProperties),
				);
			} else {
				throw error;
			}
		},
	);

	return {
		...API,
		client,
		getRouteURL,
		lastQuery,
	};
}
