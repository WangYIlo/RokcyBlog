<template>
    <div v-if="!item.meta?.hidden" :class="{submenu_title_noDropdown:settingStore.fold}">
        <!-- 没有子路由    -->
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta?.hidden" :index="item.path">
                <SvgIcon :name="item.meta.icon" color="white" ></SvgIcon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个子路由 -->
        <el-menu-item v-if="item.children && item.children.length === 1" :index="item.children[0].path">
            <SvgIcon :name="item.children[0].meta.icon" color='white'></SvgIcon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!-- 有超过一个以上的子路由 -->
        <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
                <template #title>
                    <i class="sub_icon">
                        <SvgIcon :name="item.meta.icon" color="white"></SvgIcon>
                        <span>{{ item.meta.title }}</span>
                    </i>
                </template>
            <SidebarItem v-for="child in item.children" :key="child.path" :item="child" class="nest-menu"></SidebarItem>
        </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
import {useSettingStore} from '@/stores/modules/setting'
let settingStore=useSettingStore()
defineProps(['item'])


</script>

<script lang="ts">
export default {
    name: 'SidebarItem'
}
</script>

<style scoped></style>