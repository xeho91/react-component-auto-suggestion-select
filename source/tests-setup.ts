import { setLogger } from "react-query";

import { server } from "$mocks/server";

// Establish API mocking before all tests.
beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
	server.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
	server.close();
});

// Silence react-query errors
setLogger({
	/* eslint-disable no-console */
	log: console.log,
	warn: console.warn,
	/* eslint-enable no-console */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	error: () => {},
});
