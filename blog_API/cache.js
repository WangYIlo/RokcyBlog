//采用ETag 进行缓存----扩展功能(还未开发完毕)
const config=require('./config')
const md5=require('md5')
module.exports.cacheMiddleware=(req,res,next)=>{
    // 获取请求的 ETag 值
    const requestETag = req.headers['if-none-match'];
    if(requestETag && requestETag===config.resourceETag){
        return res.status(304)
    }
    next()
}

module.exports.generateElatg=(data)=>{
    config.resourceETag=md5(data)
    return config.resourceETag
}