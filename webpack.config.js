const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const context = path.resolve(__dirname, "src")
const {dependencies} = require("./package.json")

module.exports = {
  context,
  entry: {
    vendor: Object.keys(dependencies),
    app: [
      "react-hot-loader/patch",
      "./js/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "[name]-[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          plugins: [
            [
              "react-css-modules",
              {
                context
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
                sourceMap: true
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body"
    }),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin("css/[name].css")
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src"),
    historyApiFallback: true
  },
  devtool: "eval"
}
