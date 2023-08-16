import {createRouter, createWebHashHistory} from 'vue-router'
import { constantRoute } from './routes'
import {useUserStore} from '@/stores/moudles/user'

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


router.beforeEach(async(to,from,next)=>{
    const userStore=useUserStore()
    if(userStore.token){
        next()
    }else{
        await userStore.userLogin()   
        next()
    }  
})


export default router
