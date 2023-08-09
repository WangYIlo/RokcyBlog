import request from '@/utils/request'

enum API {
    GETALLCATEGORIES_ADDCATEGORY_DELETE_UPDATE_URL='admin/categories',
}

//获取分类
export const reqGetAllCatrgories=(page?:number,pageSize?:number)=>{
    return request({
        method:'get',
        url:API.GETALLCATEGORIES_ADDCATEGORY_DELETE_UPDATE_URL,
        params:{
            page,
            pageSize
        }
    })
}
//添加分类
export const reqAddCategory=(name:string)=>{
    return request({
        method:'post',
        url:API.GETALLCATEGORIES_ADDCATEGORY_DELETE_UPDATE_URL,
        data:{
            name
        }
    })
}
//编辑分类
export const reqUpdateCategory=(name:string,id:number|string)=>{
    return request({
        method:'put',
        url:API.GETALLCATEGORIES_ADDCATEGORY_DELETE_UPDATE_URL+`/${id}`,
        data:{
            name
        }
    })
}
//删除分类
export const reqDeleteCategory=(id:number|string)=>{
    return request({
        method:'delete',
        url:API.GETALLCATEGORIES_ADDCATEGORY_DELETE_UPDATE_URL+`/${id}`,
    })
}