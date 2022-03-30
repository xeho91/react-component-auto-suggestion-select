declare module "*.module.scss" {
	const classes: { [key: string]: string };
	export default classes;
}

// TODO: Replace axios with a custom fetch wrapper (built-in in Node.js now)
declare module "axios/lib/adapters/http";
