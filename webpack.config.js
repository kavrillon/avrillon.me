const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devMode = process.env.NODE_ENV !== "production";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: "./dist",
    port: 9000
  },
  devtool: devMode ? "source-map" : false,
  entry: ["./src/index.js", "./src/index.scss"],
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
    filename: devMode ? "bundle.js" : "bundle.[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new ExtractTextPlugin({
      filename: devMode ? "bundle.css" : "bundle.[hash].css",
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html"
    })
  ]
};
