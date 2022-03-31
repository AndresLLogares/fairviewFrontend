const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions, plugins, loaders, stage }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
    resolve: {
      fallback: {
        fs: false,
        assert: require.resolve("assert/"),
        crypto: require.resolve("crypto-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        stream: require.resolve("stream-browserify"),
        url: require.resolve("url/"),
        path: require.resolve("path-browserify"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  });
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: "process/browser" })],
    });
  }
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /offending-module/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
