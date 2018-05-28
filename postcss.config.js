module.exports = {
  plugins: [
		/* eslint-disable global-require */
    require('postcss-partial-import'),
    require('postcss-css-reset'),
    require('postcss-utils'),
    require('postcss-flexibility'),
    // require('autoprefixer'),
		/* eslint-enable global-require */
  ]
};
