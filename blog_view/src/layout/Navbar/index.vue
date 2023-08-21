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
            <el-input placeholder="Search...." v-model.trim="searchTitle" @focus="hiddenSearchList=false"  @blur="hiddenSearchList=true" @input="searchArticle">
                <template #suffix>
                    <el-button icon="search"></el-button>
                </template>
            </el-input>
            <ul class="searchList" v-if="!hiddenSearchList">
                <li class="searchItem" v-for="item in searchList" :key="item.id"    @mousedown="goSearch(item.id)">
                    {{ item.title }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqGetAllCatrgories } from '@/api/category';
import { reqGetSearchArticle } from '@/api/article';
import { onMounted, ref, onUnmounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { debounce } from '@/utils/debounce';

const $route = useRoute()
const $router = useRouter()
const categories = ref([{
    id: '',
    category_name: '',
    user_id: ''
}])
const hiddenBar = ref(true)
const scollEvent = ref(false);

const hiddenSearchList=ref(true)
const searchTitle=ref('')
const searchList=ref([{
    id:'',
    title:''
}])

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
//搜索框
const searchArticle = debounce(async (value: string) => {
  //防止值为空，进而搜索全部文章  
  if(value=='') return false
  const result = await reqGetSearchArticle(value);
  searchList.value = result.data;
}, 500);

const goSearch=(id:number|string)=>{
    $router.push(`/article/${id}`)
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
        position: relative;
        flex: 5;
        .searchList{
             position: absolute;
             width: 100%;
             margin-top:5px;
             background-color: white;

             .searchItem{
                font-size: 14px;
                padding: 1px 0 1px 11px;
                height: 32px;
                line-height: 32px;
                &:hover {
                    cursor: pointer;
                    background-color:rgba($color: grey, $alpha: 0.4)
                }
             }
        }
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