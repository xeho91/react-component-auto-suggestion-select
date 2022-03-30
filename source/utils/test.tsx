/* eslint-disable import/export */

import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { APIQueryClient } from "$globals/API";

const customRender = (ui: ReactElement, options = {}): RenderResult =>
	render(ui, {
		wrapper: ({ children }) => children,
		...options,
	});

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
}

export function createWrapper() {
	const testQueryClient = createTestQueryClient();

	// eslint-disable-next-line react/display-name
	return ({ children }: { children: ReactNode }) => (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	);
}

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
