import { defineStore } from "pinia";
import { reqLogin,reqUserInfo } from "@/api/user";

export const useUserStore=defineStore('User',{
    state:()=>{
        return {
            token:'',
            userinfo:{
                avatar:'',
                create_time:'',
                email:'',
                id:'',
                nickname:'',
                password:'',
                role:'',
                username:''
             }
        }
    },
    actions:{
        //用户登录
        async userLogin(){
            const res:any= await reqLogin({
                username:'rocky',
                password:'123456'
            })
            if(res.status===200){
              this.token=res.data.token
              return '登陆成功'
            }else{
               throw new Error('请求失败')
            }
          },
        //获取用户信息
        async getUserinfo(){
            const result= await reqUserInfo()
            if(result.status==200){
                this.userinfo=result.data.data
            }
         }
    },
    getters:{

    },
    persist: true
})