const config = {
	extends: ["@terminal-nerds", "plugin:react/jsx-runtime"],

	env: {
		// Specify the environment(s)
		// https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
		browser: true,
		node: true,
	},

	settings: {
		react: {
			version: "detect",
		},
	},
};

// eslint-disable-next-line unicorn/prefer-module
module.exports = config;
