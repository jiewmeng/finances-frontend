const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body"
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "src")
  }
}
