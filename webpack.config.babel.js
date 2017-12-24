import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config = {
  target: 'web',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname,
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ],
            plugins: [
              ['import', { libraryName: 'antd', style: 'css' }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].bundle.css')
  ],
  devServer: {
    contentBase: __dirname
  },
  devtool: 'source-map'
}

export default config
