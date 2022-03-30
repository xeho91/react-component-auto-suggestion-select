import { QueryClient } from "react-query";

import { hoursToMilliseconds, secondsToMilliseconds } from "$helpers/date";

const API_BASENAME_URL = process.env["API_BASENAME_URL"];

if (!API_BASENAME_URL) {
	throw new Error(
		"The API basename URL was not set in the environment variables!",
	);
}

export const APIQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchOnReconnect: true,
			useErrorBoundary: true,
		},
	},
});

/**
 * @description Queries which can be added to the API route URL.
 */
type APIRouteURLQueries = string[][] | Record<string, string>;

/**
 * @description Set API route URL based on the proviced route and queries.
 */
export function getRouteURL(route: APIRoute, queries?: APIRouteURLQueries) {
	if (!route) {
		throw new Error(`Target route was not specified!`);
	} else {
		const url = new URL(route, API.baseNameURL);

		if (queries) {
			url.search = new URLSearchParams(queries).toString();
		}

		return url.toString();
	}
}

export const API = {
	baseNameURL: API_BASENAME_URL,

	routes: {
		universities: {
			search: "/universities/search",
		},
	},

	settings: {
		intervals: {
			//
		},

		requestTimeout: secondsToMilliseconds(5),

		retries: {
			universities: 2,
		},

		staleTimes: {
			universities: hoursToMilliseconds(1),
		},
	},
} as const;

export type APIMainRouteName = keyof typeof API.routes;
export type APISubRouteName = keyof typeof API.routes[APIMainRouteName];
/**
 * @description Currently integrated & configured routes from the API in this project.
 */
export type APIRoute = typeof API.routes[APIMainRouteName][APISubRouteName];
