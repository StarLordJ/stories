const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = (env, argv) => {
  return {
    entry: './src/index',
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.styl$/,
          use: [
            argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  exportLocalsConvention: 'camelCase'
                }
              }
            },
            {
              loader: 'stylus-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].stories.css'
      })
    ],
    output: {
      filename: '[name].stories.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    }
  };
};
