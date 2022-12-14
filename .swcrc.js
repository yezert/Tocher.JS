module.exports = {
	$schema: "https://json.schemastore.org/swcrc",
	env: {
		targets: {
			ie: "11",
		},
		mode: "entry",
		corejs: "3",
	},
	jsc: {
		parser: {
			syntax: "typescript",
			tsx: true,
			decorators: true,
			dynamicImport: true,
		},
		transform: {
			legacyDecorator: true,
			decoratorMetadata: true,
		},
		target: "es5",
		loose: true,
		externalHelpers: false,
	},
	module: {
		type: "commonjs",
		strict: false,
		strictMode: true,
		lazy: false,
		noInterop: false,
	},
	sourceMaps: true,
	minify: false,
};
