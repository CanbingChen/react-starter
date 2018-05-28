'use strict'; // eslint-disable-line

var path = require('path');

var rootPath = path.resolve(__dirname, '..'); // 项目根目录
var paths = {
	srcPath: path.join(rootPath, './src'),
	htmlPath: path.join(rootPath, './src/index.html')
}


module.exports = {
	entry: [
		path.join(rootPath, './src/app.js'),
	],
	output: {
		path: path.join(rootPath, './dist'),
		publicPath: '/',
	},

	resolve: {
		extensions: ['.web.js', '.js', '.json', '.jsx'],
		alias: {
			'SRC': paths.srcPath,
			'LESS': path.join(rootPath, './src/assets/less'),
			'IMAGES': path.join(rootPath, './src/assets/images'),
			'SVGS': path.join(rootPath, './src/assets/svgs'),
			'CONTAINERS': path.join(rootPath, './src/containers'),
			'COMPONENTS': path.join(rootPath, './src/components'),
			'CONSTANTS': path.join(rootPath, './src/constants'),
			'SERVICE': path.join(rootPath, './src/service'),
			'UTILS': path.join(rootPath, './src/utils'),
			'REDUX': path.join(rootPath, './src/redux'),
			'CONFIG': path.join(rootPath, './src/config'),
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
							"modules": false,
						}],
						"react",
						"stage-3",
					],
					plugins: [
						"transform-runtime",
						'transform-class-properties',
						"syntax-dynamic-import", ["import", {
							"style": "css",
							"libraryName": "antd",
						}],
					],
					"env": {
						"production": {
							"plugins": [
								"transform-remove-console",
								"transform-react-remove-prop-types", // 去除propTypes
							],
						}
					},
					comments: false
				},
			}],
		}, {
			test: /\.json$/,
			use: ['json-loader'],
		}, {
			test: /\.(png|jpe?g|gif)$/,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10240, // 10KB 以下使用 base64
					name: 'static/image/[name]-[hash:6].[ext]',
				},
			}],
		}, {
			test: /\.svg$/,
			include: path.join(rootPath, './src/static/svgs'),
			use: [{
					loader: 'svg-sprite-loader',
					options: {},
				},
				'svg-fill-loader',
			]
		}, {
			test: /\.(woff2?|eot|ttf|otf|svg)$/,
			exclude: path.join(rootPath, './src/static/svgs'),
			use: [{
				loader: 'url-loader',
				options: {
					limit: 10240, // 10KB 以下使用 base64
					name: 'static/fonts/[name]-[hash:6].[ext]',
				},
			}],
		}],
	},
}
