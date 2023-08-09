import request from '@/utils/request'

enum API {
    ADD_DELETE_GETONE_ARTICLE_URL='admin/article',
    GRTPUBLISH_URL='admin/getPublishSort',
    GET_ARTICLE_URL='admin/getArticle',
    EDIT_ARTICLE_URL='admin/editArticle'
}

//添加文章
export const reqAddArticle=(data:any)=>{
    return request({
        method:'post',
        url:API.ADD_DELETE_GETONE_ARTICLE_URL,
        data
    })
}
//根据id获取文章
export const reqGetArticleById=(id:number|string)=>{
    return request({
        method:'get',
        url:API.ADD_DELETE_GETONE_ARTICLE_URL+`/${id}`
    })
}
//分页获取文章
export const reqGetArticle=(page?:number,pageSize?:number,categoryId?:number|string,publish?:number|string)=>{
    return request({
        method:'get',
        url:API.GET_ARTICLE_URL,
        params:{
            page,
            pageSize,
            categoryId,
            publish
        }
    })
}
//获取publish类型 0-草稿 1-公开
export const reqGetPulish=()=>{
    return request({
        method:'get',
        url:API.GRTPUBLISH_URL
    })
}
//删除文章-根据id
export const reqDeleteArticle=(id:number|string)=>{
    return request({
        method:'delete',
        url:API.ADD_DELETE_GETONE_ARTICLE_URL+`/${id}`
    })
}
//修改文章--根据id
export const reqEditArticleById=(data:any,id:string|number)=>{
    return request({
        method:'put',
        url:API.EDIT_ARTICLE_URL+`/${id}`,
        data
    })
}
