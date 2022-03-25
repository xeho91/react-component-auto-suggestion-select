import { QueryClient } from "react-query";

export const APIQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			refetchOnReconnect: true,
			useErrorBoundary: true,
		},
	},
});
