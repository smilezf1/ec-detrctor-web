'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  BASE_URL: '"http://192.168.3.58:9980/ec_detector"',
  WS_URL: '"http://192.168.3.58:9980/ec_detector/websocket"'
})
