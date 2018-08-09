const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const HtmlWebpackExcludeAssetsPlugin = require("html-webpack-exclude-assets-plugin");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  devServer: {
    compress: !devMode,
    contentBase: "./dist",
    port: 9000
  },
  devtool: devMode ? "source-map" : false,
  entry: {
    app: "./src/index.js",
    critical: "./src/critical.scss",
    styles: "./src/index.scss"
  },
  mode: devMode ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader", // translates CSS into CommonJS
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader"
            },
            {
              loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  optimization: {
    minimize: devMode ? false : true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  output: {
    filename: devMode ? "[name].js" : "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css"
    }),
    new HtmlWebpackPlugin({
      excludeAssets: [/critical.*.js/, /styles.*.js/],
      inlineSource: /critical.*.css$/,
      filename: "index.html",
      minify: devMode
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
      template: "src/index.html"
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new HtmlWebpackExcludeAssetsPlugin()
  ]
};
