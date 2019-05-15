import * as commonPaths from './common-paths';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as autoprefixer from 'autoprefixer';

import getEnvParams from '../src/shared/helpers/getEnvParams';

const { withAnalyze } = getEnvParams();

const envs = Object.entries(process.env).reduce(
  (acc, [name, value]) => ({ ...acc, [`process.env.${name}`]: JSON.stringify(value) }), {},
);

const config: webpack.Configuration = {
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/',
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
                ['import', { libraryName: 'antd', style: true }],
              ],
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
            loader: 'postcss-loader',
            options: {
              plugins: () => {
                return [
                  autoprefixer({
                    browsers: ['last 2 versions'],
                  }),
                ];
              },
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
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `public/index.html`,
      favicon: `public/favicon.ico`,
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: commonPaths.tsconfig,
      tslint: commonPaths.tslint,
    }),
    new webpack.DefinePlugin({
      ...envs,
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru|en/),

  ].concat(Boolean(withAnalyze) ? ([
    new BundleAnalyzerPlugin(),
  ]) : []),
};

export default config;