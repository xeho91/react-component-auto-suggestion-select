const url = new URL(import.meta.url);
const ladleConfigPath = ".ladle/config.mjs";

export default {
	resolve: {
		alias: {
			// prettier-ignore
			"$components": url.pathname.replace(ladleConfigPath, "source/components"),
			$globals: url.pathname.replace(ladleConfigPath, "source/globals"),
			$helpers: url.pathname.replace(ladleConfigPath, "source/helpers"),
			$hooks: url.pathname.replace(ladleConfigPath, "source/hooks"),
			$mocks: url.pathname.replace(ladleConfigPath, "source/mocks"),
			$stores: url.pathname.replace(ladleConfigPath, "source/stores"),
			$styles: url.pathname.replace(ladleConfigPath, "source/styles"),
			$utils: url.pathname.replace(ladleConfigPath, "source/utils"),
		},
	},
	stories: "source/**/*.stories.{ts,tsx}",
};
