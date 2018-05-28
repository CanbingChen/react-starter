'use strict'; // eslint-disable-line

var webpack = require('webpack');
var path = require('path');
var rootPath = path.resolve(__dirname, '..'); // 项目根目录
var paths = {
	srcPath: path.join(rootPath, './src'),
	htmlPath: path.join(rootPath, './src/index.html')
}


module.exports = {
	devtool: 'inline-source-map',

	output: {
		path: path.join(rootPath, './dist'),
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/',
	},

	externals: {
		'cheerio': 'window',
		'react/addons': true,
		'react/lib/ExecutionEnvironment': true,
		'react/lib/ReactContext': true,
	},

	resolve: {
		extensions: ['.web.js', '.js', '.json', '.jsx'],
		alias: {
			'SRC': paths.srcPath,
			'LESS': path.join(rootPath, './src/assets/less'),
			'IMAGES': path.join(rootPath, './src/assets/images'),
			'CONTAINER': path.join(rootPath, './src/container'),
			'SVGS': path.join(rootPath, './src/assets/svgs'),
			'COMPONENTS': path.join(rootPath, './src/components'),
			'CONSTANTS': path.join(rootPath, './src/constants'),
			'SERVICE': path.join(rootPath, './src/service'),
			'UTILS': path.join(rootPath, './src/utils'),
			'REDUX': path.join(rootPath, './src/redux'),
		},
	},
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			include: paths.srcPath,
			use: [{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					babelrc: false,
					presets: [
						["es2015", {
							"modules": false
						}],
						"react",
						"stage-3",
					],
					plugins: [
						"transform-runtime",
						'transform-class-properties',
						"syntax-dynamic-import", ["import", {
							"style": "css",
							"libraryName": "antd-mobile",
						}]
					],
					"env": {
						"test": {
							"presets": ["stage-3"],
							"plugins": ["istanbul"],
						}
					},
					comments: false
				},
			}],
		}, {
			test: /\.json$/,
			use: ['json-loader'],
		}, {
			test: /\.(png|jpe?g|gif|svg)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10240, // 10KB 以下使用 base64
					name: '/aseets/image/[name]-[hash:6].[ext]',
				},
			}],
		},{
			test: /\.svg$/,
			include: path.join(rootPath, './src/assets/svgs'),
			use: [{
					loader: 'svg-sprite-loader',
					options: {},
				},
				'svg-fill-loader',
			],
		}, {
			test: /\.(woff2?|eot|ttf|otf)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10240, // 10KB 以下使用 base64
					name: '/aseets/fonts/[name]-[hash:6].[ext]',
				},
			}],
		}, {
			test: /\.less$/,
			use: ['style-loader', 'css-loader', 'less-loader'],
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
		}],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('test'),
		}),
	],
}
