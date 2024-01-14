const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    // entry point
    mode: "production",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js", // ?
    },
    // output for bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    // Plugins to add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      // webpack plugin to generate html file and inject bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // injects custom service worker
      // TODO: Implement asset caching in src-sw.js
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // creates manifest.json file
      new WebpackPwaManifest({
        // Don't use fingerprints since we are not using hashes in file names for cache busting in this project
        fingerprints: false,
        // plugin should automatically inject manifest into the html template
        inject: true,
        name: "Just Another Text Editor",
        short_name: "J.A.T.E",
        description: "Takes notes with JavaScript syntax highlighting!",
        background_color: "#225ca3",
        theme_color: "#225ca3",
        start_url: "./",
        publicPath: "./",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],

    module: {
      // Adds CSS loaders and babel to webpack.
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel loader to transpile modern JavaScript.
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
