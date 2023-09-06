<<<<<<< HEAD
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            "style-loader", 
            "css-loader", 
            "postcss-loader"
        ],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
=======
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    plugins: [new MiniCssExtractPlugin()],
>>>>>>> 0f9a4e37cb0adb5b8edb17f0103b4f1b717e6650
};
