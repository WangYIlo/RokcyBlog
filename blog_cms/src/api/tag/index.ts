import request from '@/utils/request'

enum API {
    ADD_UPDATE_REMOVE_DELETE_URL='admin/tags'
}

//获取标签
export const reqGetTag=(page?:number,pageSize?:number)=>{
    return request({
        method:'get',
        url:API. ADD_UPDATE_REMOVE_DELETE_URL,
        params:{
            page,
            pageSize
        }
    })
}
//添加分类
export const reqAddTag=(name:string,color:string)=>{
    return request({
        method:'post',
        url:API. ADD_UPDATE_REMOVE_DELETE_URL,
        data:{
            name,
            color
        }
    })
}
//编辑分类
export const reqUpdateTag=(name:string,color:string,id:number|string)=>{
    return request({
        method:'put',
        url:API. ADD_UPDATE_REMOVE_DELETE_URL+`/${id}`,
        data:{
            name,
            color
        }
    })
}
//删除分类
export const reqDeleteTag=(id:number|string)=>{
    return request({
        method:'delete',
        url:API. ADD_UPDATE_REMOVE_DELETE_URL+`/${id}`,
    })
}
