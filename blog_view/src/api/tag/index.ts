import request from '@/utils/request'

enum API {
    GET_TAG='admin/tags',
}

//获取标签
export const reqGetTag=()=>{
    return request({
        method:'get',
        url:API.GET_TAG
    })
}
