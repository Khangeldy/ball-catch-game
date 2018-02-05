const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.sss$/,
        include: /src\/css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.js$/,
        include: /src/,
        use: {
          loader: 'babel-loader', // https://github.com/babel/babel-loader
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { test: /\.ejs$/, include: /src\/template/, use: ['ejs-loader'] },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff|woff2|eot|ttf|otf)$/,
        include: /src/,
        use: {
          loader: 'file-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/template/index.ejs')
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/images/',
        to: 'images'
      },
      {
        from: 'src/assets/',
        to: 'assets'
      }
    ]),
  ]
}
