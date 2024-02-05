import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const webpackConfig = (env): Configuration => ({
  entry: path.resolve(__dirname, "./src/index.tsx"),
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
    }),

    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default webpackConfig;
