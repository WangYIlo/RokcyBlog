<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{ about.title }}</span>
            </div>
        </template>
        <div v-html="about.content" id="editor-content-view" class="editor-content-view"></div>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqGetAbout } from '@/api/aboutMe'

const about = ref({
    content: "",
    id: '',
    title: "",
    user_id: "",

})


onMounted(async () => {
    const result = await reqGetAbout()
    about.value = result.data.data
})
</script>

<style scoped lang="scss">

.card-header {
    font-size: 24px;
    text-align: center;

}



</style>