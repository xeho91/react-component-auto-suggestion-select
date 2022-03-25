const config = {
	extends: ["@terminal-nerds"],

	env: {
		// Specify the environment(s)
		// https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
		browser: true,
		node: true,
	},
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
