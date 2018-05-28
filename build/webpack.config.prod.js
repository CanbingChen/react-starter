

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ImageminPlugin = require('imagemin-webpack-plugin').default

var rootPath = path.resolve(__dirname, '..');
var paths = {
    srcPath: path.join(rootPath, './src'),
    htmlPath: path.join(rootPath, './src/index.html'),
    distPath: path.join(rootPath, './dist'),
    staticPath: path.join(rootPath, './static'),
    nodeModulesPath: path.join(rootPath, './node_modules'),
}

const baseConfig = require('./webpack.config.base');
baseConfig.devtool = 'source-map';
baseConfig.output.filename = 'static/js/[name].[chunkhash:8].js';
baseConfig.output.chunkFilename = 'static/js/[name].[chunkhash:8].chunk.js';
baseConfig.module.rules = baseConfig.module.rules.concat([{
    test: /\.less$/,
    exclude: /\.local.less$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
            loader: 'css-loader',
            options: {
                minimize: true, // 进行css压缩
                importLoaders: 1,
                sourceMap: true,
            }
        }, {
            loader: 'postcss-loader',
            options: {
                plugins: loader => [ // eslint-disable-line
                    require('autoprefixer')(),
                ]
            },
        }, 'less-loader'],
    })
}, {
    test: /\.local.less$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
            loader: 'css-loader',
            options: {
                modules: true,
                // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentName: '[local]__[hash:base64:7]',
                sourceMap: true,
                minimize: true, // 进行css压缩
            }
        }, {
            loader: 'postcss-loader',
            options: {
                plugins: loader => [ // eslint-disable-line
                    require('autoprefixer')(),
                ]
            },
        }, 'less-loader'],
    }),
}, {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [{
            loader: 'css-loader',
            options: {
                sourceMap: true,
                minimize: true,
            }
        }],
    }),
}]);
baseConfig.plugins = [
    new ImageminPlugin({
      pngquant: {
        quality: '90-100'
      }
    }),

    new CleanWebpackPlugin('dist', {
        root: rootPath,
        verbose: true, // write logs to console
    }),

    new CopyWebpackPlugin([{
        context: paths.staticPath,
        from: '**/*',
        to: 'static/js/'
    }]),

    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'CONFIG_ENV': JSON.stringify(process.env.NODE_ENV),
        __DEV__:false
    }),

    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        output: {
            comments: false,
        }
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module) {
            return module.resource &&
                /\.js$/.test(module.resource) &&
                module.context && module.context.indexOf("node_modules") !== -1;
        }
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: paths.htmlPath,
        inject: 'body',
        minify: {
            removeComments: true,
            removeAttributeQuotes: true,
            collapseWhitespace: true
        }
    }),

    new ExtractTextPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        allChunks: true, // 是否把所有模块的css都分离出来
    })

];

module.exports = baseConfig;
