<template>
    <el-card class="box-card"  shadow="hover" >
        <template #header>
            <div class="card-header">
                <SvgIcon name="random" color="grey" />
                <span class="title">随机文章</span>
            </div>
        </template>
        <div class="article-items">
            <div class="article-item" v-for="item in articleList" :key="item.id" @click="goArticle(item.id)">
                <div class="image-container">
                    <img :src="baseURL + item.picture" alt="">
                    <div class="text-overlay">
                        <div class="time">{{ item.created_time }}</div>
                        <div class="introduce">
                            {{ item.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
    <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <SvgIcon name="tag" color="grey"></SvgIcon>
        <span class="title">标签云</span>
      </div>
    </template>
    <el-button class="tags" @click="goTagArticle(tag)" v-for="tag in tagList" :key="tag.id" style="margin-left: 5px;" :color="tag.color" size="small">{{tag.name}}</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { reqGetRandomArticle,reqGetArticle } from '@/api/article'
import { reqGetTag } from '@/api/tag'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';


const $router=useRouter()
const baseURL = 'http://127.0.0.1:3007'

const articleList = ref([{
    created_time: "",
    id: '',
    picture: "",
    title: "",

}])

const tagList=ref([{
    id:'',
    name:'',
    color:''
}])

const goArticle=(id:any)=>{
    $router.push(`/article/${id}`)
}

const goTagArticle=(tag:any)=>{
    $router.push(`/tag/${tag.id}/${tag.name}`)
}

onMounted(async () => {
    const result = await reqGetRandomArticle()
    const tags=await reqGetTag()
    
    articleList.value = result.data.data
    tagList.value = tags.data.data
})

</script>

<style lang="scss" scoped>
.box-card {

    margin-bottom: 20px;
    .card-header {
        display: flex;
        align-items: center;
        color: grey;
        .title {
            margin-left: 10px;
            font-weight: 900;
        }
    }

    .article-items {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .article-item {
            cursor: pointer;
            flex: 1; 
            .image-container {
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }

            .text-overlay {
                position: absolute;
                bottom: 0;
                color: white;
                padding: 10px;
                font-size: 12px;
                max-width: 100%;

                .introduce {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 100%;
                }
            }
        }
        }
    }

    .tags {
        color: white !important;
    }
}

</style>