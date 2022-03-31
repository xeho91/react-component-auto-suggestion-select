import faker from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { List, type ListProperties } from "$components/children/List";
import mockedUniversitiesList from "$mocks/universities-data-list.json";
import { render, screen } from "$test";
import { UniversitiesDataList } from "$utils/UniversitiesDataList";

const MOCKED_DATA: ListProperties["data"] = new UniversitiesDataList(
	mockedUniversitiesList,
).names.map((name) => ({
	value: name,
	selected: faker.datatype.boolean(),
}));

describe("<List />", () => {
	it("Should render the component in DOM", async () => {
		render(<List data={[]} id="universities" />);
		expect(screen.getByRole("listbox")).toBeInTheDocument();
	});

	test(`Should show placeholder on empty data in the list`, () => {
		render(<List data={[]} id="universities" />);

		const alert = screen.getByRole("alert");

		expect(alert).toBeInTheDocument();
	});

	test(`Should show items (placeholder not visible)`, () => {
		render(<List data={MOCKED_DATA} id="universities" />);

		const options = screen.getAllByRole("option");

		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
		options.every((option) => {
			return expect(option).toBeInTheDocument();
		});
	});
});
