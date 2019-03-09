const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  devServer: {
    allowedHosts: ['.local'],
    compress: !devMode,
    contentBase: './dist',
    host: '0.0.0.0',
    port: 9000,
  },
  devtool: devMode ? 'source-map' : false,
  entry: {
    app: './src/index.js',
    critical: './src/critical.scss',
    // styles: "./src/index.scss" // No need for now
  },
  mode: devMode ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader', // compiles Sass to CSS, using Node Sass by default
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader?outputPath=img&name=' + (devMode ? '[name]' : '[name].[hash:7]') + '.[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              /*webp: {
                quality: 75
              }*/
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ],
  },
  optimization: {
    minimize: devMode ? false : true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    filename: devMode ? 'js/[name].js' : 'js/[name].[hash:7].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(), // Remove dist folder
    new ExtractTextPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash:7].css',
    }),
    new HtmlWebpackPlugin({
      excludeAssets: [/critical.*.js/, /styles.*.js/],
      inlineSource: /critical.*.css$/,
      filename: 'index.html',
      minify: devMode
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          },
      template: 'src/index.html',
    }),
    new HtmlWebpackInlineSourcePlugin(), // Inline critical CSS
    new HtmlWebpackExcludeAssetsPlugin(),
    new CopyWebpackPlugin([
      {
        from: './CNAME',
        to: 'CNAME',
        toType: 'file',
      },
      {
        from: './site.webmanifest',
        to: 'site.webmanifest',
        toType: 'file',
      },
      {
        from: './browserconfig.xml',
        to: 'browserconfig.xml',
        toType: 'file',
      },
      {
        from: './src/img/favicon.ico',
        to: 'favicon.ico',
        toType: 'file',
      },
    ]),
    new WorkboxPlugin.InjectManifest({
      // Inject service worker
      swSrc: './src/sw.js',
      swDest: 'sw.js',
      exclude: [/^CNAME$/],
    }),
  ],
};
