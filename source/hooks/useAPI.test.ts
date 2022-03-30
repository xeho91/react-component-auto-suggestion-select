import { faker } from "@faker-js/faker";
import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it, test } from "vitest";

import { useAPI } from "$hooks/useAPI";
import {
	API_QUERY_STATUSES,
	apiQueryStatusStore,
} from "$stores/api-query-status";

describe("useAPI()", () => {
	describe(".baseNameURL", () => {
		const { baseNameURL } = renderHook(() => useAPI()).result.current;

		it("Should return the set environment variable", () => {
			expect(baseNameURL).toBeDefined();
			expect(baseNameURL).toBe(process.env["API_BASENAME_URL"] as string);
		});
	});

	describe(".client", () => {
		const { client } = renderHook(() => useAPI()).result.current;
		const methods = ["delete", "get", "post", "put"] as const;

		test.each(methods)(".%s() - should be available", (method) => {
			expect(client[method]).toBeTypeOf("function");
			expect(client).toHaveProperty(method);
		});
	});

	describe(".getRouteURL(route, queries?)", () => {
		const { baseNameURL, getRouteURL, routes } = renderHook(() => useAPI())
			.result.current;
		const country = faker.address.country();
		const expectedURL = new URL(routes.universities.search, baseNameURL);
		const routeURL = getRouteURL(routes.universities.search, { country });

		expectedURL.search = new URLSearchParams({ country }).toString();

		it(`Should return a correct URL with random country "${country}" as query param: "${expectedURL}"`, () => {
			expect(routeURL).toBe(expectedURL.toString());
		});
	});

	describe(".lastQuery", () => {
		const { result } = renderHook(() => apiQueryStatusStore());

		it(`.status - should be "idle" by default`, () => {
			expect(result.current.status).toBe("idle");
		});

		test.each(API_QUERY_STATUSES)(
			`.update("%s") - should update the store "status" key`,
			async (status) => {
				const { result } = renderHook(() => apiQueryStatusStore());

				result.current.update(status);
				expect(result.current.status).toBe(status);
			},
		);
	});

	describe(".routes", () => {
		const { routes } = renderHook(() => useAPI()).result.current;

		describe(".universities", () => {
			const searchRoute = "/universities/search";

			test(`.search - should be: "${searchRoute}"`, () => {
				expect(routes.universities.search).toBe(searchRoute);
			});
		});
	});
});
