/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 08.06.2017
 * Time: 14:05
 */

var webpack = require('webpack');

module.exports = {
	entry: {
		'boreas': './src/js/main',
		'boreas.min': './src/js/main',
	},
	output: {
		filename: '[name].js',
		library: 'Boreas',
	},
	watch: true,
	devtool: 'source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] },
				}],
			},

			// Loaders for other file types can go here
		],
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			include: /\.min\.js$/,
			compress: {
				warnings: true
			}
		})
	],
};