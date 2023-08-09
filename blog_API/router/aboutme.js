const express =require('express')
const router=express.Router()
const aboutme_handler=require('../router_handler/aboutme_handler')

//获取aboutme
router.get('/aboutMe',aboutme_handler.getAboutMe)
//修改aboutme
router.post('/aboutMe',aboutme_handler.updateAboutMe)


module.exports=router