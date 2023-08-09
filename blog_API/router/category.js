//文章分类
const express=require('express')
const router=express.Router()
const category_handler=require('../router_handler/category_handler')

//获取全部文章分类
router.get('/categories',category_handler.getAllCategory)

//添加分类
router.post('/categories',category_handler.addCategory)

//编辑分类
router.put('/categories/:id',category_handler.updateCategory)

//删除分类
router.delete('/categories/:id',category_handler.deleteCategory)

module.exports=router