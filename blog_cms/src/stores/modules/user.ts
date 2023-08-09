import { defineStore } from 'pinia'
import {reqLogin} from '@/api/user'

export const useUserStore=defineStore('User',{
      state:()=>{
        return {
          token:''
        }
      },
      actions:{
        //用户登录
        async userLogin(data:any){
          const res:any= await reqLogin(data)
          if(res.status===200){
            this.token=res.data.token
            return '登陆成功'
          }else{
             throw new Error('用户名或密码错误')
          }
        },
        //用户退出 
        userlogoOut(){
          this.token=''
        }
      },
      getters:{

      },
      persist:true
})