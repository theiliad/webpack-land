var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var WebpackStrip = require('webpack-strip');

// Setup variables based on Environment
var tsLoaders = ['awesome-typescript-loader', 'angular-router-loader', 'angular2-template-loader'];
var pluginsArray = [
    new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
    }),

    new ExtractTextPlugin("[name].css")
];

if (process.env.ENV === 'prod') {
    tsLoaders.unshift(WebpackStrip.loader('console.log'));

    pluginsArray.push(new webpack.optimize.UglifyJsPlugin({
                            compress: {
                                warnings: false,
                            },
                            sourceMap: false,
                            comments: false
                          }));
}

var config = {
  entry:{
    'app': './src/main.ts',
    'polyfills': './src/polyfills.ts'
  },
  resolve: {
    extensions: ['.js', '.ts', '.scss']
  },
  module:{
      loaders:[{
            test:/\.ts$/,
            loaders: tsLoaders
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            { loader: 'css-loader', query: { modules: false, sourceMaps: false, minimize: true } }
                        ]
                    })
        }, {
            test: /\.scss$/,
            exclude: path.resolve('src/app'),
            loader: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            { loader: 'css-loader', query: { modules: false, sourceMaps: false, minimize: true } },
                            { loader: 'sass-loader', query: { sourceMaps: false } }
                        ]
                    })
        }, {
            test: /\.scss$/,
            include: path.resolve('src/app'),
            loader: 'raw-loader!sass-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg|ico)$/i,
            loader: "file-loader?name=/img/[name].[ext]",
            exclude: /node_modules/
        }, {
            test: /\.(mp4)$/i,
            loader: "file-loader?name=/videos/[name].[ext]",
            exclude: /node_modules/
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader" 
        }
      ]
  },
  plugins: pluginsArray,
  output: {
    path: path.resolve('public/assets'),
    filename: "[name].bundle.js",
    publicPath: '/assets/',
    chunkFilename: '[id].[hash].js'
  },
};
module.exports = config;
