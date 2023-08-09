<template>
    <el-scrollbar class="scrolbar">
        <Logo v-if="!setting.isHide"></Logo>
        <el-menu  
        background-color="#304156" 
        text-color="#bfcbd9" 
        router 
        :default-active='$route.path' 
        :collapse="settingStore.fold"
         >
           <SidebarItem v-for="route in routesStore.menuRoutes" :key="route.path" :item="route"></SidebarItem>
        </el-menu>
    </el-scrollbar>
</template>

<script setup lang="ts">
import setting from '@/setting'
import Logo from '../Logo/index.vue'
import {useRoutesStore} from '@/stores/modules/routes'
import {useSettingStore} from '@/stores/modules/setting'

let settingStore=useSettingStore()
let routesStore=useRoutesStore()





</script>

<script lang="ts">
export default {
    name:'Sidebar'
}
</script>

<style lang="scss" scoped>
.scrolbar {
    width: 100%;
    height: 100%;
    .el-menu{
        border-right: none;
    }
}
</style>