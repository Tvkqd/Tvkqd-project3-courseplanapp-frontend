const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = {
  devServer: {
    host: "localhost",
    port: "8080"
  },
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/project3/2022/t1/',
  transpileDependencies: ['vuetify'],
};
