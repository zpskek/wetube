// in webpack it's 100% client code not server code

const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  // entry: ["@babel/pollyfill", ENTRY_FILE],
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        use: ExtractCSS.extract([
          {
            // webpack이 css를 이해할 수 있게 도와준다.
            loader: "css-loader",
          },
          {
            // css를 받아서 우리가 css에게 주는 plugin을 가지고 css로 변환해준다.
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            // sass-loader는 sass나 scss를 받아서 css로 바꿔줄 수 있다.
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
