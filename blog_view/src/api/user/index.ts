import request from '@/utils/request'

enum API {
    LOGIN_URL='api/login',
    GETORUPDATE_USERINFO_URL='admin/userinfo',
}

//登录接口
export const reqLogin=(data:any)=>{
    return request({
        method:'post',
        url:API.LOGIN_URL,
        data
    })
}

//获取用户基本信息
export const reqUserInfo=()=>{
    return request({
        method:'get',
        url:API.GETORUPDATE_USERINFO_URL
    })
}

