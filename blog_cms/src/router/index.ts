import {createRouter, createWebHashHistory} from 'vue-router'
import { constantRoute } from './routes'
import { useUserStore } from '@/stores/modules/user'

const router=createRouter({
    history:createWebHashHistory(),
    routes:constantRoute,
    scrollBehavior(){
        return {
            left:0,
            top:0
        }
    }
})


router.beforeEach((to: any, from: any, next: any)=>{
    let userStore=useUserStore()
    const token=userStore.token
    if(token){
        if(to.path=='/login'){
            router.push('/')
        }
        next()
    }else{
        if(to.path=='/login'){
            next()
        }else{
            next({path:'/login'})
        }
    }
})


export default router


