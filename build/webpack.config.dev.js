'use strict'; // eslint-disable-line

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ProgressPlugin = require('webpack-simple-progress-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

var rootPath = path.resolve(__dirname, '..'); // 项目根目录
var paths = {
	srcPath: path.join(rootPath, './src'),
	htmlPath: path.join(rootPath, './src/index.html'),
  staticPath: path.join(rootPath, './static'),
}

const baseConfig = require('./webpack.config.base');
baseConfig.devtool = 'cheap-module-eval-source-map';
// baseConfig.devtool = 'source-map';
baseConfig.entry = [
		'webpack-dev-server/client?http://localhost:9000',
		'webpack/hot/dev-server'
	]
	.concat(baseConfig.entry)

baseConfig.output.filename = 'static/js/[name].js';
baseConfig.output.chunkFilename = 'static/js/[name].chunk.js';
baseConfig.module.rules = baseConfig.module.rules.concat([{
	test: /\.less$/,
	exclude: /\.local.less$/,
	use: ['style-loader', {
			loader: "css-loader",
			options: {
				importLoaders: 1
			}
		}, {
			loader: 'postcss-loader',
			// options: {
			// 	plugins: loader => [ // eslint-disable-line
			// 		require('autoprefixer')(),
			// 	]
			// },
		},
		'less-loader'
	],
}, {
	test: /\.local.less$/,
	use: ['style-loader', {
		loader: "css-loader",
		options: {
			modules: true,
			importLoaders: 1,
			localIdentName: '[local]__[hash:base64:7]'
			// camelCase: 'dashesOnly',
		}
	}, {
		loader: 'postcss-loader',
	}, 'less-loader'],
}, {
	test: /\.css$/,
	use: ['style-loader', 'css-loader']
}]);
baseConfig.plugins = [
  new DashboardPlugin(),
	new ProgressPlugin(),

  new CopyWebpackPlugin([{
      context: paths.staticPath,
      from: '**/*',
      to: 'static/js/'
  }]),

	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('development'),
    'CONFIG_ENV': JSON.stringify('development'),
  	'__DEV__':true
	}),

	new webpack.HotModuleReplacementPlugin(),
	new webpack.NamedModulesPlugin(),

	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: paths.htmlPath,
		inject: 'body',
		minify: {
			collapseWhitespace: true
		}
	})

];
module.exports = baseConfig;
