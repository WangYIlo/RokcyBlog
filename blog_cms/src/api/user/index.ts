import request from '@/utils/request'

enum API {
    LOGIN_URL='api/login',
    GETORUPDATE_USERINFO_URL='admin/userinfo',
    UPDATEPASSWORD_URL='admin/updatepwd',
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

//修改密码
export const reqUpdatePassword=(password:any)=>{
    return request({
        method:'post',
        url:API.UPDATEPASSWORD_URL,
        data:{password}
    })
}

//修改个人信息
export const requpdateUserinfo=(data:any)=>{
    return request({
        method:'post',
        url:API.GETORUPDATE_USERINFO_URL,
        data
    })
}