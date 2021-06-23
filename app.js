
var express = require('express')
var router = require('./router')
var bodyParser = require('body-parser')

var app = express()




app
    // 使用模板引擎
    .engine('html', require('express-art-template'))

    // 开放静态资源
    .use('/public/', express.static('./public/'))
    .use('/views/', express.static('./views/'))
    .use('/node_modules/', express.static('./node_modules/'))

    // POST 表单配置
    .use(bodyParser.urlencoded({ extended: false }))

    .use(bodyParser.json())

    // 挂载路由
    .use(router)

    // 开启监听端口
    .listen(3000, function () {
        console.log('app is running ... port 3000')
    })

module.exports = app