module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      // '/socket.io': {
      //   target: 'ws://127.0.0.1:3030',
      //   changeOrigin: true,
      //   ws: true
      // }
    }
  }
}