/* eslint-disable import/export */
import type { ReactElement } from "react";
import { render } from "@testing-library/react";

const customRender = (ui: ReactElement, options = {}) =>
	render(ui, {
		// wrap provider(s) here if needed
		wrapper: ({ children }) => children,
		...options,
	});

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
