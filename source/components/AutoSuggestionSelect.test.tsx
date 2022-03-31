import { domAnimation, LazyMotion } from "framer-motion";
import { QueryClientProvider } from "react-query";
import { describe, expect, it } from "vitest";

import { AutoSuggestionSelect } from "$components/AutoSuggestionSelect";
import { APIQueryClient } from "$globals/API";
import { render, screen } from "test";

describe("AutoSuggestionSelect", () => {
	it("Should render the component in DOM", async () => {
		render(
			<LazyMotion features={domAnimation} strict>
				<QueryClientProvider
					client={APIQueryClient}
					contextSharing={true}
				/>
				<AutoSuggestionSelect />
			</LazyMotion>,
		);

		expect(screen.getByRole("combobox")).toBeInTheDocument();
	});
});
