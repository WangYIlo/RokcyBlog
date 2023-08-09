import { defineStore } from 'pinia'

export const useSettingStore=defineStore('Setting',{
    state:()=> {
        return{
           fold:false
        }    
    },
    actions:{
        toggle_sidebar(){
            this.fold=!this.fold
        }
    },
    getters:{

    }

})