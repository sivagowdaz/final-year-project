const path = require("path");
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/Test.js',
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "[name].bundle.js"
    },
    // devServer: {
    //     port: 3010,
    // },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
}