const express=require('express')
const router=express.Router()
const user_handler=require('../router_handler/user_handler')

//login
router.post('/login',user_handler.login)
//register
router.post('/register',user_handler.register)


module.exports=router