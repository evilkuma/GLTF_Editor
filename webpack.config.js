const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {

    entry: { main: './src/main.js' },

    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'main.js'
    },

    module: {
    
        rules: [
        
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" }
            },
            {
              test: /\.html$/,
              use: [
                {
                  loader: "html-loader",
                  options: { minimize: true }
                }
              ]
            }

        ]

    },

    plugins: [

        new HtmlWebPackPlugin({ filename: "./index.html" })

    ],

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
    //   compress: true,
      port: 9000
    }

}
