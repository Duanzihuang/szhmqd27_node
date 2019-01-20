//导包
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')

//创建app
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//设置静态资源根目录
app.use(express.static(path.join(__dirname,"public")))

//导入路由对象，路由中间件写在最后
const accountRouter = require(path.join(__dirname,"routers/accountRouter.js"))
app.use('/account',accountRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start ok")
})