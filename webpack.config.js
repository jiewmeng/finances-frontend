const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const context = path.resolve(__dirname, "src")

module.exports = {
  context,
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
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
          use: {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]",
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body"
    }),
    new ExtractTextPlugin("css/app.css")
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src")
  },
  devtool: "source-map"
}
