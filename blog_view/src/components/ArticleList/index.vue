<template>
    <div class="warpper">
        <el-card class="box-card" shadow="hover" v-for="item in articleList" :key="item.id">
            <template #header>
                <div class="card-header">
                    <div class="title">{{ item.title }}</div>
                    <div class="time">
                        <SvgIcon name="time" color="#00a7e0"></SvgIcon>
                        <span style="margin-left: 10px;"> 更新时间:{{ item.update_time }}</span>
                    </div>
                    <div class="category"></div>
                </div>
            </template>
            <div class="content">
                <div class="introduce">
                    {{ item.introduce }}
                </div>
                <img class="img" :src="baseURL + item.picture" alt="">
                <el-button class="btn" round @click="getArticle(item.id)">阅读全文</el-button>
                <div >
                    <el-button class="tags" @click="$router.push(`/tag/${tag.id}/${tag.name}`)"  v-for="tag in item.tags" :key="tag.id" style="margin-left: 5px;" :color="tag.color" size="small">{{tag.name}}</el-button>
                </div>
            </div>
            <div class="label" @click="$router.push(`/category/${item.category_id}/${item.category_name}`)">{{ item.category_name }} </div>
        </el-card>
        <div class="pagniation">
            <Pagniation :page-size="pageSize" :current-page="page" :total="total"
                @update:currentPage="handleCurrentPageChange" @update:pageSize="handlePageSizeChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { reqGetArticle } from '@/api/article'
import { onMounted, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router'

const props = defineProps(['id'])

const page = ref(1)
const pageSize = ref(5)
const total = ref()

const baseURL = 'http://127.0.0.1:3007'

const $router = useRouter()
const $route = useRoute()

const articleList = ref([{
    category_id: '',
    category_name: "",
    content: "",
    created_time: "",
    id: '',
    introduce: '',
    is_published: '',
    picture: '',
    title: '',
    update_time: "",
    user_id: '',
    tags:[{
        id:"",
        name:'',
        color:''
    }]

}])
//获取多篇文章列表
const getArticleList = async () => {
    let res
    if($route.name==='tag'){
        const tagId=props.id
         res = await reqGetArticle(page.value, pageSize.value,undefined,tagId)
    }else{
        const categoryId=props.id
         res = await reqGetArticle(page.value, pageSize.value, categoryId)
    }
    articleList.value = res.data.data
    total.value = res.data.total

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

onMounted(async () => {
    await getArticleList()
})
//阅读全文回调
const getArticle = async (id: number | string) => {
    $router.push(`/article/${id}`)
}
//page回调
const handleCurrentPageChange = async (newPage: any) => {

    page.value = newPage
    getArticleList()
}
//pageSize回调
const handlePageSizeChange = async (newSize: any) => {
    pageSize.value = newSize
    getArticleList()
}


</script>

<style lang="scss" scoped>
.warpper {
    .box-card {
        margin-bottom: 10px;
        position: relative;
        overflow: visible;
        .label {
        cursor: pointer;
        position: absolute;
        top: 50px;
        left: -20px;
        background-color: orange;
        color: white;
        padding: 4px 8px;
        border-radius: 0px 4px 4px 0px;

        &::after {
            position: absolute;
            content: '';
            top: 100%;
            left: 0px;
            background-color: transparent;
            border-style: solid;
            border-width: 0em 1.2em 1.2em 0em;
            border-color: transparent;
            border-right-color: orange;
            width: 0;
            height: 0;
        }
    }


        .card-header {

            text-align: center;

            .title {
                font-weight: 900;
                font-size: 26px;
                margin-bottom: 10px;
            }

            .time {
                color: #00a7e0;
                display: flex;
                font-size: 12px;
                align-items: center;
                justify-content: center;
            }

        }

        .content {
            padding: 20px;

            .img {
                display: block;
                width: 80%;
                height: 450px;
                margin: 0 auto;
                margin-bottom: 20px;
            }

            .introduce {
                margin-bottom: 20px;
                font-size: 15px;
            }

            .btn {
                display: block;
                background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
                background-size: 400%;
                transition: all 2s; // 过渡效果
                color: white;
                margin: 0 auto;

                &:hover {
                    background-position: 100% 0;
                    color: #00a7e0;
                }
            }

            .tags {
                color: white;
            }
        }
    }

    .pagniation {
        margin-top: 30px;
    }
}
</style>