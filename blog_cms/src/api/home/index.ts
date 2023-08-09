import request from '@/utils/request'

enum API {
    GET_HOME_URL='admin/home'
}

export const reqHomeInformation=()=>{
    return request({
        method:'get',
        url:API.GET_HOME_URL
    })
}

