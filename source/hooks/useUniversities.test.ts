import { renderHook } from "@testing-library/react-hooks";
import { describe, expect, it } from "vitest";

import { useUniversities } from "$hooks/useUniversities";
import mockedUniversitiesDataList from "$mocks/universities-data-list.json";
import { createWrapper } from "$utils/test";
import { UniversitiesDataList } from "$utils/UniversitiesDataList";

describe("useUniversities(name, country?)", () => {
	describe(".query", () => {
		describe(".status", () => {
			it(`Should have "success" status (when provided name is >= 3 characters)`, async () => {
				const { result, waitFor } = renderHook(
					() => useUniversities("MIT"),
					{ wrapper: createWrapper() },
				);

				await waitFor(() => result.current.query.isFetched);
				expect(result.current.query.status).toBe("success");
			});

			it(`Should have "idle" status when name is < 3 characters`, async () => {
				const { result, waitFor } = renderHook(
					() => useUniversities("Un"),
					{ wrapper: createWrapper() },
				);

				await waitFor(() => result.current.query.isIdle);
				expect(result.current.query.status).toBe("idle");
			});
		});

		describe(".data", () => {
			it(`Should return universities list in the query data (name: Wroclaw, country: Poland)`, async () => {
				const { result, waitFor } = renderHook(
					() => useUniversities("Wroclaw", "Poland"),
					{ wrapper: createWrapper() },
				);

				await waitFor(() => result.current.query.isSuccess);
				expect(result.current.query.data).toEqual(
					new UniversitiesDataList(mockedUniversitiesDataList),
				);
			});
		});
	});
});
