import { rest } from "msw";

import { API, getRouteURL } from "$globals/API";
import mockedUniversitiesDataList from "$mocks/universities-data-list.json";

export const handlers = [
	rest.get(
		getRouteURL(API.routes.universities.search),
		(request, response, context) => {
			return response(
				context.status(200),
				context.json(mockedUniversitiesDataList),
			);
		},
	),
];
