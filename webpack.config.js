const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'none',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'output')
    },
    devServer: {
        proxy: [{
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                pathRewrite: {
                    '^/api': ''
                },
                // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                changeOrigin: true
            }
        }]
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /(node_modul|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.jpg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024 // 10KB
                    }
                }
            },
            /*{
                test: /.html$/,
                exclude: [/node_modules/, require.resolve('./index.html')],
                exclude: /(node_modul|bower_components)/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'a:href']
                    }
                }
            }*/
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 用于生成 index.html
        new HtmlWebpackPlugin({
            title: 'Webpack Plugin Sample',
            meta: {
                viewport: 'width=device-width'
            },
            template: "./src/index.html"
        }),
        new HtmlWebpackPlugin({
            filename: 'about.html'
        })
    ]
}