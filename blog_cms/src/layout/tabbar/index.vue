<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Hamburger></Hamburger>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
                    <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabber_right">
           <BreadCrumb></BreadCrumb>
        </div>
    </div>
</template>

<script setup lang="ts">
import Hamburger from './Hamburger/index.vue'
import BreadCrumb from './breadcrumb/index.vue'
import { useRoute } from 'vue-router'

let $route=useRoute()
console.log($route.matched);


</script>
<script lang="ts">
export default {
    name:'Tabbar'
}
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .tabbar_left {
        display: flex;
        align-items: center;
    }
    .tabber_right{
        display: flex;
        align-items: center;
    }
}
</style>