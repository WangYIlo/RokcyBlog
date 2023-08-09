<template>
    <div :key="props.id">
        <el-card class="box-card"  shadow="hover">
            <div class="title">分类 {{ name}} 下的文章</div>
         </el-card>
        <ArticleList :id="props.id" />
    </div>
</template>

<script setup lang="ts">
import { onMounted,onBeforeMount } from 'vue';
const props=defineProps(['id','name'])

onBeforeMount(() => {
    console.log(props.id);
})
</script>

<style scoped lang="scss">
.box-card {
    margin-bottom: 20px;
    .title {
        font-weight: 900;
        text-align: center;
        font-size: 24px;
    }
}
</style>