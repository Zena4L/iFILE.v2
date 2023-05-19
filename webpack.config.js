var path = require('path');

module.exports = {
	target: 'electron-renderer',
	mode: 'development',
	devtool: 'inline-source-map',
	entry: `./src/public/fe/index.ts`,
	output: {
		path: path.resolve(__dirname, 'dist','public','fe'),
		filename: 'index.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: "ts-loader" }
		]
	},
  watch: true,
};