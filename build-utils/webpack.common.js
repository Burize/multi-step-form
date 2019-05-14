const commonPaths = require('./common-paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');


const envs = Object.entries(process.env).reduce(
(acc, [name, value]) => ({ ...acc, [`process.env.${name}`]: JSON.stringify(value) }), {},
);

const config = {
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['import', { libraryName: "antd", style: true }]
              ]
            },
        }],
       
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
      {

        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
          }
        ]

      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`
    }),
    new ForkTsCheckerWebpackPlugin({
        tsconfig: commonPaths.tsconfig,
        tslint: commonPaths.tslint,
      }),
    new webpack.DefinePlugin({
        ...envs,
      }),
  ]
};

module.exports = config;
