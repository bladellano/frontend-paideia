const { defineConfig } = require('@vue/cli-service')

const dotenv = require('dotenv').config();
process.env = { ...dotenv.parsed, ...process.env };

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    plugins: [
      new (require('vuetify-loader/lib/plugin'))()
    ]
  },
  lintOnSave: false,
})

