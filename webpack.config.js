var path = require('path')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: './src/ui/index.jsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015',
            'react',
            'stage-2',
            'stage-1',
            'stage-0'
          ],
          plugins: [
            'transform-decorators-legacy',
            'dynamic-import-webpack',
            ['import', {
              libraryName: 'antd',
              style: 'css'
            }]
          ]
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }]
      }
    ]
  },
  // externals: {
  //   antd: 'antd',
  //   lodash: 'lodash',
  //   moment: 'moment',
  //   react: 'react',
  //   'react-dom': 'react-dom'
  // },
  plugins: [
    new UglifyJsPlugin()
  ]
}
