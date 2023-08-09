import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/moudles/user';


let request=axios.create({
    baseURL: 'http://127.0.0.1:3007',
    timeout: 5000,
});


// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const userStore=useUserStore()
  if (userStore.token) {
    config.headers.Authorization=userStore.token
  }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    //处理网络错误
    let msg=''
    let status=error.response.status
    switch(status){
        case 401:
            msg = "token过期";
            break;
        case 400:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";
    }
    ElMessage.error(msg)
    return Promise.reject(error);
  });


  export default request