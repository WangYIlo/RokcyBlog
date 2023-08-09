import request from '@/utils/request'

enum API {
    GET_UPDATE_ABOUT_URL='admin/aboutMe'
}


//获取aboutme
export const reqGetAbout=()=>{
    return request({
        method:'get',
        url:API.GET_UPDATE_ABOUT_URL
    })
}

//修改aboutme
export const requpdateAbout=(data:any)=>{
    return request({
        method:'post',
        url:API.GET_UPDATE_ABOUT_URL,
        data
    })
}