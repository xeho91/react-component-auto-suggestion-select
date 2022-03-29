import create from "zustand";
import { devtools } from "zustand/middleware";

export type APIQueryStatus = typeof API_QUERY_STATUSES[number];
export const API_QUERY_STATUSES = [
	"error",
	"idle",
	"loading",
	"success",
] as const;

export interface APIQueryStatusStore {
	status: APIQueryStatus;
	update: (status: APIQueryStatus) => void;
}

export const apiQueryStatusStore = create<APIQueryStatusStore>(
	devtools(
		(set) => ({
			status: "idle",
			update: (status) => set({ status }),
		}),
		{ name: "API query status store" },
	),
);
