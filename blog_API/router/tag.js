const express =require('express')
const router=express.Router()
const tag_handler=require('../router_handler/tag_handler')

//获取全部标签
router.get('/tags',tag_handler.getAlltag)

//添加标签
router.post('/tags',tag_handler.addTag)

//编辑标签
router.put('/tags/:id',tag_handler.updateTag)

//删除标签
router.delete('/tags/:id',tag_handler.deleteTag)



module.exports=router


