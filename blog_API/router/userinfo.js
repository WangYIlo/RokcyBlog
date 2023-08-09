const express =require('express')
const router=express.Router()
const userinfo_handler=require('../router_handler/userinfo_handler')

//获取userinfo
router.get('/userinfo',userinfo_handler.userInfo)
//更新userinfo
router.post('/userinfo',userinfo_handler.updateUserInfo)
//重置密码
router.post('/updatepwd',userinfo_handler.updatePassword)
//获取首页需要的数据


module.exports=router