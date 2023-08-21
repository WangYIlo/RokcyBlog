import request from '@/utils/request'

enum API {
    RANDOM_ARTICLE='admin/getArticleRandom',
    GET_ARTICLE_URL='admin/getArticle',
    GET_ARTICLEBYID_URL='admin/article',
    GET_ARTICLE_PUBLISHED='admin/getArticlePublish',
    GET_SEARCHARTICLE='admin/searchArticle'
}


//随机获取5篇文章
export const reqGetRandomArticle=()=>{
    return request({
        method:'get',
        url:API.RANDOM_ARTICLE
    })
}

//分页获取文章
export const reqGetArticle=(page?:number,pageSize?:number,categoryId?:number|string,tagId?:number|string,publish=1)=>{
    return request({
        method:'get',
        url:API.GET_ARTICLE_URL,
        params:{
            page,
            pageSize,
            categoryId,
            publish,
            tagId
        }
    })
}
//根据id获取文章
export const reqGetArticleById=(id:number|string)=>{
    return request({
        method:'get',
        url:API.GET_ARTICLEBYID_URL+`/${id}`
    })
}

//获取已发布文章用于归档
export const reqGetArticlePublished=()=>{
    return request({
        method:'get',
        url:API.GET_ARTICLE_PUBLISHED
    })
}

export const reqGetSearchArticle=(title:string)=>{
    return request({
        method:'POST',
        url:API.GET_SEARCHARTICLE,
        data:{
            title
        }
    })
}
