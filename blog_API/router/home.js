//获取首页有关信息
const express = require("express");
const router=express.Router()
const home_handler=require('../router_handler/home_handler')

router.get('/home',home_handler.getHomeInformation)




module.exports=router
