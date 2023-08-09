<template>
        <el-button type="primary" icon="Refresh" circle></el-button>
            <el-button type="primary" icon="FullScreen" circle></el-button>
            <el-button type="primary" icon="Setting" circle></el-button>
            <img v-if="userinfoStore.userinfo.avatar" :src="userinfoStore.userinfo.avatar"
                style="width: 40px; height: 40px; border-radius: 5px; margin-left: 20px;">
            <img v-else src="../../../assets/images/avatar.jpg"
                style="width: 40px; height: 40px; border-radius: 5px; margin-left: 20px;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="exit">退出</el-dropdown-item>
                        <el-dropdown-item>首页</el-dropdown-item>
                        <el-dropdown-item>
                            <a href="https://github.com/WangYIlo"> Git Hub</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
</template>

<script setup lang="ts">
 import { useRouter} from 'vue-router'
 import { useUserInfoStore } from '@/stores/modules/userinfo';
 import {useUserStore} from '@/stores/modules/user'
 const userinfoStore=useUserInfoStore()
 const userStore=useUserStore()
 const $router=useRouter()

 const exit=()=>{
    $router.push('/login')
    userStore.userlogoOut()
 }
</script>

<script lang="ts">
export default {
  name:'Breadcurmb'
}
</script>

<style scoped>

</style>