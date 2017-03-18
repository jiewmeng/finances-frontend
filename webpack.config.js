const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "build/js"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
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
