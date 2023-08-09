const express=require('express')
const router=express.Router()
const article_handler=require('../router_handler/article_handler')
//解析 form-data multer中间件
const multer  = require('multer')
const path=require('path')
//存放文件路径
const upload = multer({ dest: path.join(__dirname, '../uploads') })


//添加文章
router.post('/article',upload.single('picture'),article_handler.addArticle)

//修改文章
router.put('/editArticle/:id',upload.single('picture'),article_handler.updateArticle)

//删除文章
router.delete('/article/:id',article_handler.deleteArticle)

//获取单篇文章
router.get('/article/:id',article_handler.getArticleByid)

//分页获取文章
router.get('/getArticle',article_handler.getArticleByPage)

//获取publish种类
router.get('/getPublishSort',article_handler.getPublish)

//随机获取5篇文章
router.get('/getArticleRandom',article_handler.getRandomArticle)

//获取全部公开文章
router.get('/getArticlePublish',article_handler.getAllPublishArticle)

module.exports=router