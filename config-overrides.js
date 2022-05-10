/* config-overrides.js */
const webpack = require("webpack");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    config.resolve.fallback = {
      http: false,
      https: false,
      // util: require.resolve('util/'),
      // url: require.resolve('url'),
      // assert: require.resolve('assert'),
      buffer: require.resolve("buffer"),
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );
    return config;
  },
};
