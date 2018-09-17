const path = require('path');
const fs = require('fs');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode:'development',
    entry:  ['babel-polyfill','./src/client/clientEntryPoint.js'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    //watch: true,
    module: {
      rules: [
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[ext]",
                },
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'raw-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-env'].map(require.resolve)
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'url-loader?limit=10000',
                  'img-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
};