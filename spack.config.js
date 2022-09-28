module.exports = {
	entry: {
		// 打包的入口
		bundle: __dirname + "/src/index.ts",
	},
	output: {
		// 打包后输出的文件夹
		path: __dirname + "/dist",
	},

	options: {
		jsc: {
			//解析配置
			parser: {
				syntax: "typescript", //输入文件格式
				tsx: false, // 是否支持tsx
				dynamicImport: false, //是否支持动态导入
				decorators: false, //是否支持装饰器
			},
			transform: null,
			target: "es5", //转译目标
			loose: false,
			externalHelpers: false,
			keepClassNames: false,
		},
		// 输出文件配置
		module: {
			type: "commonjs",
			strict: false,
			strictMode: true,
			lazy: false,
			noInterop: false,
			ignoreDynamic: false,
		},
	},
};
