module.exports = {
	root: true, // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找配置文件。
	parser: 'babel-eslint',
	parserOptions: {
		// 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
		ecmaVersion: 7,
		sourceType: 'module'
	},
	"plugins": [
		"babel",
		"react"
	],
	settings: {
		'import/resolver': {
			webpack: {
				config: './build/webpack.config.base.js'
			}
		}
	},
	"globals": {
		jest: true,　// jest测试全局变量
		CONFIG_ENV: true,　// jest测试全局变量
	},
	extends: ['airbnb', "plugin:react/recommended"], // 配置代码检查风格
	'rules': {
		// react
		'react/jsx-filename-extension': 0,
		'react/prop-types': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/no-noninteractive-element-interactions':0,
		// common rules
		'comma-dangle': 0,
		'semi': 0,
		'no-tabs': 0,
		'no-param-reassign': [2,{"props":false}],
		'arrow-parens': [2, 'as-needed'],
		'no-underscore-dangle': 0,
		'no-plusplus': 0,
		'react/prefer-stateless-function': [1]
	},

	"env": {
		"browser": true, //  browser 全局变量, 解决window变量报错的问题
		"node": true,
		"jest": true, // 添加所有的 jest 版本的测试全局变量。
		"es6": true // 支持除了modules所有 ECMAScript 6 特性。
	},
}
