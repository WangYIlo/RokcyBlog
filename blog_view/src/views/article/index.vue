<template>
    <div>
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <div class="title">{{ article.title }}</div>
                    <div class="time">
                        <SvgIcon name="time" color="#00a7e0"></SvgIcon>
                        <span style="margin-left: 10px;"> 更新时间:{{ article.update_time }}</span>
                    </div>
                </div>
            </template>
            <div class="content">
                <div class="introduce">
                    {{ article.introduce }}
                </div>
                <div class="content" v-html="article.content">
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { reqGetArticleById } from '@/api/article'

const baseURL = 'http://127.0.0.1:3007'
const props = defineProps(['id'])
const article = ref({
    category_id: '',
    content: "",
    id: '',
    introduce: "",
    is_published: '',
    picture: "",
    title: "",
    user_id: '',
    created_time: "",
    update_time: ""
})
//监听props的id是否发生变化
watch(() => props.id, async (newId: any) => {
    if (newId) {
        const result = await reqGetArticleById(newId);
        article.value = result.data.data[0];
    }
});

onMounted(async () => {
    if (props.id) {
        const result = await reqGetArticleById(props.id)
        article.value = result.data.data[0]
    }
})

</script>

<style scoped lang="scss">
.box-card {
    margin-bottom: 10px;

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

        .introduce {
            margin-bottom: 20px;
            padding: 5px;
            font-size: 15px;
            color: grey;
            border-left: 5px solid grey;
        }
    }
}
</style>