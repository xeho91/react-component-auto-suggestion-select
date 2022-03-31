import { Input as Component } from "$components/Input";

export const Empty = () => <Component label="Universities" />;

export const Invalid = () => (
	<Component defaultValue="123" label="Universities" />
);

export const Valid = () => (
	<Component defaultValue="University of Wroclaw" label="Universities" />
);
