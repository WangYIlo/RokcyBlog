<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ slider_fold: settingStore.fold }">
            <Sidebar></Sidebar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ tabbar_fold: settingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ layout_fold: settingStore.fold }">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">

import Sidebar from './Sidebar/index.vue'
import Tabbar from './tabbar/index.vue'
import { useSettingStore } from '@/stores/modules/setting'
import {useUserInfoStore} from '@/stores/modules/userinfo'
import { onMounted } from 'vue'
const userinfoStore=useUserInfoStore()
let settingStore = useSettingStore()

onMounted(()=>{
    userinfoStore.getUserinfo()
})

</script>

<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $menuBg;
        transition: all 0.3s;
    }

    & .slider_fold {
        width: $foldSiderbarWidth;
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 0.3s;
    }

    & .tabbar_fold {
        width: calc(100% - $foldSiderbarWidth);
        left: $foldSiderbarWidth;
    }

    .layout_main {
        position: absolute;
        left: $base-menu-width;
        top: $base-tabbar-height;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        overflow: auto;
        transition: all 0.3s;
    }

    & .layout_fold {
        width: calc(100% - $foldSiderbarWidth);
        left: $foldSiderbarWidth;
    }
}
</style>