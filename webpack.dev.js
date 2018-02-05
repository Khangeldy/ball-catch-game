const path = require('path'),
      webpack = require('webpack'),
      merge = require('webpack-merge'),
      DashboardPlugin = require('webpack-dashboard/plugin'),
      GoogleFontsPlugin = require("google-fonts-webpack-plugin"),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      common = require('./webpack.common.js'),
      Jarvis = require('webpack-jarvis');

if (process.env.NODE_ENV !== 'production') {
  console.log('Webpack development режимінде!');
}

module.exports = merge(common, {
  devtool: 'inline-source-map',
  plugins: [
    // new Jarvis({
    //   port: 3800
    // }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })
    // new GoogleFontsPlugin({
    //   fonts: [
    //     { family: "Source Sans Pro" },
    //     { family: "Roboto", variants: [ "400", "700italic" ] }
    //   ]
    // })
  ]
})
