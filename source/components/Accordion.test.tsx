import { describe, expect, it } from "vitest";

import { Accordion } from "$components/Accordion";
import { fireEvent, render, screen, waitFor } from "test";

const TEST_IDS = {
	button: "accordion-button",
	panel: "accordion-panel",
};

describe("<Accordion />", () => {
	it("Should render the component in DOM", async () => {
		render(<Accordion title="Accordion" />);
		expect(screen.getByRole("banner")).toBeInTheDocument();
	});

	describe("Panel:", () => {
		it("Should be hidden (not expanded) by default", async () => {
			render(<Accordion title="Accordion" />);
			expect(screen.getByTestId(TEST_IDS.panel)).not.toBeVisible();
		});

		it(`Should be expanded (visible) when provided "expanded" prop`, async () => {
			render(<Accordion title="Accordion" expanded />);
			expect(screen.getByTestId(TEST_IDS.panel)).toBeInTheDocument();
			expect(screen.getByTestId(TEST_IDS.panel)).toBeVisible();
		});
	});

	describe(`Button:`, () => {
		test(`Should expand(show) panel on button click - when panel is hidden`, async () => {
			render(<Accordion title="Accordion" />);

			const button = screen.getByTestId(TEST_IDS.button);
			const panel = screen.getByTestId(TEST_IDS.panel);

			fireEvent.click(button);
			await waitFor(() => {
				expect(panel).not.toHaveStyle({ display: "hidden" });
			});
		});

		test(`Should hide panel on button click - when panel is visible`, async () => {
			render(<Accordion title="Accordion" expanded />);

			const button = screen.getByTestId(TEST_IDS.button);
			const panel = screen.getByTestId(TEST_IDS.panel);

			fireEvent.click(button);
			await waitFor(() => {
				expect(panel).toHaveStyle({ display: "block" });
			});
		});
	});
});
