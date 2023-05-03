const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const TerserPlugin = require('terser-webpack-plugin')

// 通过webpack-merge合并基础配置，添加生产时配置
const webpackConfig = merge(baseConfig, {
    stats: {
        children: false, // webpack打包时子模块信息设置不显示
        warnings: false // 警告不显示
    },
    optimization: {
        chunkIds: 'named',
        minimizer: [
            // terser-webpack-plugin插件可以压缩代码
            new TerserPlugin({
                extractComments: false, // 不提取注释
                terserOptions: {
                    compress: {
                        warnings: false, // 取消警告
                        drop_console: false, // 取消注释console 方便有时候进行调试
                        dead_code: true, // 删除死区代码
                        drop_debugger: true // 取消断点
                    },
                    output: {
                        comments: false, // 不要注释
                        beautify: false // 不要格式，一行显示所有代码
                    },
                    mangle: true
                },
                parallel: true, // 使用多进程并行运行可提高构建速度，默认的并发运行数量 os.cpus().length - 1
            })
        ],
        // splitChunks 用来避免模块之间重复的依赖关系
        splitChunks: {
            cacheGroups: {
                common: {
                    chunks: 'all',
                    minChunks: 1,
                    minSize: 1000,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 1,
                    reuseExistingChunk: true,
                },
                vendors: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    chunks: 'all',
                    priority: 2,
                    reuseExistingChunk: true,
                }
            }
        }
    }
})

module.exports = webpackConfig