import { Button as Component } from "./Button";

export const Button = () => (
	<Component
		title="Click!"
		label="Don't you dare to click me"
		onClick={() => alert("Why did you do this?")}
	/>
);
