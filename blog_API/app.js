const express=require('express')
//导入body-parser中间件
const bodyParser=require('body-parser')
//导入cors中间件
const cors=require('cors')
//解析token中间件
var { expressjwt: jwt } = require("express-jwt");

const config=require('./config')

const app=express()
//配置cors--解决跨域问题
app.use(cors())
//解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//解析 application/json
app.use(bodyParser.json())

//使用static进行图片的静态托管访问
app.use('/uploads',express.static('./uploads'))

app.use(
    jwt({
      secret: config.jwtSecretKey,
      algorithms: ["HS256"],
    }).unless({  path: [/^\/api\//,'/uploads'] })
);

const userRouter=require('./router/user')
const userInfoRouter=require('./router/userinfo')
const categoryRouter=require('./router/category')
const tagRouter=require('./router/tag')
const articleRouter=require('./router/article')
const aboutMeRouter=require('./router/aboutme')


app.use('/api',userRouter)
app.use('/admin',userInfoRouter,categoryRouter,tagRouter,articleRouter,aboutMeRouter)
// app.use('/admin',categoryRouter,tagRouter)
// app.use('/admin',tagRouter)


app.listen(3007, () => {
    console.log('api server running at http://127.0.0.1:3007')
})