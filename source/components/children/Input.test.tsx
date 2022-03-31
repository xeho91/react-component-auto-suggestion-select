import { describe, expect, fn, it } from "vitest";

import { Input } from "$components/children/Input";
import { fireEvent, render, screen } from "$test";

describe("<Input />", () => {
	it("Should render the component in DOM", async () => {
		render(<Input label="Universities" />);
		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});

	describe("Properties:", () => {
		const defaultValue = "University of Wroclaw";

		test(`Should have valued based on passed property - defaultValue: "${defaultValue}"`, () => {
			render(<Input defaultValue={defaultValue} label="Universities" />);

			const input = screen.getByRole("combobox");

			expect(input).toHaveValue(defaultValue);
		});

		const onChange = fn();

		test(`Should fire "onChange" on user input`, () => {
			render(<Input onChange={onChange} label="Universities" />);

			const input = screen.getByRole("combobox");

			fireEvent.input(input, { target: { value: defaultValue } });
			expect(onChange).toHaveBeenCalled();
		});
	});

	describe("Validity:", () => {
		const validValue = "University";

		test(`Should be VALID on user input: "${validValue}"`, () => {
			render(<Input label="Universities" />);

			const input = screen.getByRole("combobox");

			fireEvent.input(input, { target: { value: validValue } });
			expect(input).toBeValid();
		});

		const invalidValue = "@123";

		test(`Should be INVALID on user input: "${invalidValue}"`, () => {
			render(<Input label="Universities" />);

			const input = screen.getByRole("combobox");

			fireEvent.input(input, { target: { value: invalidValue } });
			expect(input).toBeInvalid();
		});

		describe("Feedback:", () => {
			it(`Should be visible on INVALID value`, () => {
				render(<Input label="Universities" />);

				const input = screen.getByRole("combobox");

				fireEvent.input(input, { target: { value: invalidValue } });
				expect(screen.getByRole("alert")).toBeInTheDocument();
			});

			it(`Should be hidden on VALID value`, () => {
				render(<Input label="Universities" />);

				const input = screen.getByRole("combobox");

				fireEvent.input(input, { target: { value: validValue } });
				expect(screen.queryByRole("alert")).not.toBeInTheDocument();
			});
		});
	});
});
