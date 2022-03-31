import faker from "@faker-js/faker";

import { List as Component, ListProperties } from "$components/children/List";
import mockedUniversitiesList from "$mocks/universities-data-list.json";
import { UniversitiesDataList } from "$utils/UniversitiesDataList";

const MOCKED_DATA: ListProperties["data"] = new UniversitiesDataList(
	mockedUniversitiesList,
).names.map((name) => ({
	value: name,
	selected: faker.datatype.boolean(),
}));

export const Empty = () => <Component id="test" data={[]} />;

export const WithData = () => <Component id="test" data={MOCKED_DATA} />;
