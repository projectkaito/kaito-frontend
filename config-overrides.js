/* config-overrides.js */
const webpack = require("webpack");

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config
    config.resolve.fallback = {
      // util: require.resolve('util/'),
      // url: require.resolve('url'),
      buffer: require.resolve("buffer"),
      assert: require.resolve("assert"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      zlib: require.resolve("browserify-zlib"),
      url: false,
      "process/browser" : require.resolve("process/browser")
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
