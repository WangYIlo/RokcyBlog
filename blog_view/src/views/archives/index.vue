<template>

<el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="title">文章归档</div>
        目前共计{{ count }} 篇日志,继续努力
      </div>
    </template>
    <el-timeline class="time" >
    <el-timeline-item
      v-for="(article) in articles"
      :key="article.title"
      :timestamp="article.created_time"
      placement="top"
      center
    >
        <div class="content" @click="$router.push(`/article/${article.id}`)">{{ article.title }}</div>
    </el-timeline-item>
  </el-timeline>

  </el-card>
  
</template>

<script setup lang="ts">
import { reqGetArticlePublished } from '@/api/article'
import { ref, onMounted } from 'vue'

const count=ref()

const articles = ref([{
    id:'',
    created_time: " ",
    title: "",
    update_time: "",
}])

onMounted(async () => {
    const res = await reqGetArticlePublished()
    if (res.status === 200) {
        articles.value = res.data.data
        count.value=res.data.total
    }
})
</script>

<style scoped lang="scss">
.box-card {
    margin-bottom: 20px;
    text-align:center;
    font-size:12px;
    .title {
        font-weight: 900;
        text-align: center;
        font-size: 24px;
        margin-bottom:10px;
    }

    .time {
        width:20%;
        .content {
            position:relative;
            cursor: pointer;
            color:white;
            padding:12px 15px;
            background-color:skyblue;
            border-radius:5px;
            opacity:0.5;

            &::before {
                content: '';
                position: absolute;
                left: -15px;
                top:25%;
                border-width: 8px;
                border-style: solid;
                border-color: transparent skyblue transparent transparent;
            }
        }
    }
}
</style>