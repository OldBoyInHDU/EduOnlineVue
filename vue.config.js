module.exports = {
    devServer: {
        port: 8888,
        proxy: {
            '/': {
                target: 'http://localhost:8080', // 对应自己的接口
                changeOrigin: true,
                ws: false,
                pathRewrite: {
                    '^/': '/',
                },
            },
        },
    },
    publicPath: './',
    lintOnSave: false,
}
