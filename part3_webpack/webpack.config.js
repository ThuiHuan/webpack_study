const path = require('path');
// 引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// wenpack中的所有配置信息都应该写在这个里
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        //打包后的文件名字
        filename: "bundle.js",
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },
    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [{
            // test指定的规则生效的文件,以ts结尾的文件
            test: /\.ts$/,
            // 要使用的loader
            use: [
                // 配置babel
                {
                    // 指定加载器
                    loader: "babel-loader",
                    // 配置babel
                    options: {
                        // 设置预定义的环境
                        presets: [
                            [
                                // 指定环境插件
                                "@babel/preset-env",
                                // 配置信息
                                {
                                    // 浏览器的版本
                                    targets: {
                                        "chrome": "58",
                                        "ie": "11"
                                    },
                                    // 比如Promise
                                    "corejs": "3",
                                    // 使用corejs的方式,"usage"表示按需加载,
                                    "useBuiltIns": "usage"
                                }
                            ]
                        ]
                    }
                },
                'ts-loader'
            ],
            // 要排除的文件
            exclude: /node-modules/
        }]
    },
    // 配置webpack的插件
    plugins: [
        // 打包前清空打包的文件，重新覆盖
        new CleanWebpackPlugin(),
        // 自动生成html文件并引入相关资源
        new HtmlWebpackPlugin({
            //这是一个自定义的title
            // title: "webpack练习"
            template: "./src/index.html"
        }),
    ],
    // 配置模块文件,设置引用文件
    resolve: {
        // 以这两个文件作为扩展名的文件都做为模块使用
        extensions: ['.ts', '.js']
    }
}