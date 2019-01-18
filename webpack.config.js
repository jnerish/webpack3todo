const path = require('path')
const HTMLPlugin = require('html-webpack-plugin') //web开发要用html，这个引入插件
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development' //判断是否webpack-dev-server调试
const config = module.exports = {
    target: 'web', //适用于web开发
    entry: path.join(__dirname, 'src/index.js'), //__dirname 表示当前路径的绝对路径,获得当前文件所在目录的完整路径名
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.jsx$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[ext]'
                }
            }]
        }]
    },
    plugins: [ // 插件使用
        new webpack.DefinePlugin({
            'process.env': { //定义环境变量，加双引号
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }), //编译过程 判断环境 打包
        new HTMLPlugin()
    ]
}

if (isDev) {
    config.module.rules.push({
        test: /\.styl$/,
        use: [
            'style-loader',
            'css-loader', {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true,
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8090, //设置本地访问的端口
        host: '0.0.0.0', //可以通过localhost、127.0.0.1、以及内网ip访问
        overlay: {
            errors: true //设置错误显示在页面上，便于调试
        },
        inline: true,
        hot: true, //改一个组件，页面只渲染加载该组件
        //historyFallback: {}, //映射入口
        open: true //启动web-dev-server的时候自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
} else { //非开发环境的
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue'] //框架vue-router,等其他也可以加进来
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl/,
        use: ExtractPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                },
                'stylus-loader'
            ]
        })
    })
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }))
}
module.exports = config
