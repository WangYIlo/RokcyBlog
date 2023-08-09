import { defineStore } from 'pinia'
import {reqUserInfo,reqUpdatePassword,requpdateUserinfo} from '@/api/user'


export const useUserInfoStore=defineStore('Userinfo',{
   state:()=>{
        return {
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
        //获取用户信息
        async getUserinfo(){
           const result= await reqUserInfo()
           if(result.status==200){
               this.userinfo=result.data.data
           }
        },
        //修改密码
        async updatePassword(password:any){
            const result=await reqUpdatePassword(password)
            if(result.status==200){
               return '密码修改成功'
            }else{
               throw new Error('修改失败')
            }
        },
        //更新用户信息
        async updateUserinfo(data:any){
            const result= await requpdateUserinfo(data)
            console.log(result);
            if(result.status==200){
               return '个人信息修改成功'
            }else{
               throw new Error('修改失败')
            }
            
        }
   },
   getters:{

   },
   persist:true
})