const path = require('path')
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    devServer: {
        contentBase: path.join(__dirname, "./dist"), // 이 경로에 있는 파일이 변경될 때 다시 컴파일
        host: 'localhost',
        port: port,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                use:{
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("v.1"),
            MAKE: JSON.stringify("SL"),
            MAX_COUNT: JSON.stringify(999),
            "api.domain": JSON.stringify("https://www.naver.com"),
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html', // 템플릿 경로를 지정
            templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
                env: process.env.NODE_ENV === 'development' ? '(DEV)' : '',
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
            } : false,
        })
    ]
}