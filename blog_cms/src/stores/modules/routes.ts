import { defineStore } from 'pinia'
import { constantRoute } from '@/router/routes'

export const useRoutesStore=defineStore('Routes',{
    state:()=> {
        return{
            menuRoutes:constantRoute
        }    
    },
    actions:{

    },
    getters:{

    }

})