<template>
    <div class="navbar_container" :class="{ 'transparent': $route.name === 'home' && hiddenBar }">
        <span class="title">Rocky's Blog</span>
        <el-menu class="el-menu-navbar" router mode="horizontal"
            :background-color="$route.name === 'home' ? 'transparent' : 'black'" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/home">
                <SvgIcon name="home" fill="white"></SvgIcon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <SvgIcon name="light" fill="white"></SvgIcon>
                    分类
                </template>
                <el-menu-item v-for="item in categories" :key="item.id"
                    :index="`/category/${item.id}/${item.category_name}`">{{ item.category_name }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/aboutMe">
                <SvgIcon name="me" fill="white"></SvgIcon>
                关于我
            </el-menu-item>
            <el-menu-item index="/archives">
                <SvgIcon name="archives" fill="white"></SvgIcon>
                归档
            </el-menu-item>
        </el-menu>
        <div class="input">
            <el-input placeholder="Search....">
                <template #suffix>
                    <el-button icon="search"></el-button>
                </template>
            </el-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqGetAllCatrgories } from '@/api/category';
import { onMounted, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute()
const categories = ref([{
    id: '',
    category_name: '',
    user_id: ''
}])
const hiddenBar = ref(true)
const scollEvent = ref(false);
onMounted(async () => {
    if(scollEvent.value){
        window.removeEventListener('scroll', handleScroll);
        scollEvent.value=false
    }else{
        window.addEventListener('scroll', handleScroll);
        scollEvent.value=true
    }

    const res = await reqGetAllCatrgories()
    categories.value = res.data.data
})

onUnmounted(() => {

})
//处理tabbar颜色切换问题
const handleScroll = () => {
    if ($route.name === 'home') { 
        const pageY = window.pageYOffset
        if (pageY >= 180) {
            hiddenBar.value = false
        } else {
            hiddenBar.value = true
        }
    }
}
</script>

<style lang="scss">
.el-input__wrapper {
    padding-right: 0 !important;
}

.el-menu--popup {
    padding: 0 !important;
    background-color: black !important;
}
</style>

<style scoped lang='scss'>
.navbar_container {
    display: flex;
    width: 100%;
    position: fixed;
    background-color: black;
    align-items: center;
    z-index: 10;
    transition: all 0.3s linear;

    .title {
        font-weight: 700;
        color: rgb(72, 219, 251);
        flex: 3;
        text-align: center;
    }

    .el-menu-navbar {
        flex: 16;
        border: 1px solid black;
    }

    .input {
        flex: 5;
    }
}

.transparent {
    background-color: transparent;

    .el-menu-navbar {
        background-color: transparent;
        border-color: transparent;
    }
}
</style>