const commonConfig = require('./build-utils/webpack.common');

const webpackMerge = require('webpack-merge');

module.exports = () => {

  const envConfig = require(`./build-utils/webpack.${process.env.NODE_ENV}.js`);
  const mergedConfig = webpackMerge(
    commonConfig,
    envConfig,
  );

  return mergedConfig;
};
