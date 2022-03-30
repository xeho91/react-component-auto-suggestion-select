import type { AxiosError } from "axios";
import { useCallback } from "react";
import { type QueryFunction, useQuery } from "react-query";

import { API } from "$globals/API";
import { useAPI } from "$hooks/useAPI";
import {
	type APIResponseUniversitiesList,
	UniversitiesDataList,
} from "$utils/UniversitiesDataList";

/**
 * @description React custom hook for every action related to the universities.
 */
export function useUniversities(name: string, country = "") {
	const { client, getRouteURL } = useAPI();

	/**
	 * @description API `GET` request for the pages list.
	 */
	const getUniversitiesList: QueryFunction<APIResponseUniversitiesList> =
		useCallback(
			async ({ signal }) => {
				const options = signal ? { signal } : {};
				try {
					const { data } = await client.get(
						getRouteURL(API.routes.universities.search, {
							country,
							name,
						}),
						options,
					);

					return data;
				} catch (error) {
					throw new Error(`${error}`);
				}
			},
			[client, country, getRouteURL, name],
		);

	const universitiesQuery = useQuery<
		APIResponseUniversitiesList,
		AxiosError,
		UniversitiesDataList
	>(["pages"], getUniversitiesList, {
		// FUN-FACT: https://www.worldatlas.com/articles/which-country-has-the-shortest-name.html
		enabled: name.length >= 3 || country.length >= 4,
		retry: API.settings.retries.universities,
		select: (data) => new UniversitiesDataList(data),
		staleTime: API.settings.staleTimes.universities,
	});

	return {
		query: universitiesQuery,
	};
}
