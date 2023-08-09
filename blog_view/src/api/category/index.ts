import request from '@/utils/request'

enum API {
    GET_ARTICLE='admin/categories',
}

//获取分类
export const reqGetAllCatrgories=()=>{
    return request({
        method:'get',
        url:API.GET_ARTICLE
    })
}

