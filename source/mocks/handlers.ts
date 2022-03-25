import { rest } from "msw";

export const handlers = [
	rest.post("/login", (request, response, context) => {
		const { username } = request.body;

		return response(
			context.json({
				id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
				username,
				firstName: "John",
				lastName: "Maverick",
			}),
		);
	}),
];
