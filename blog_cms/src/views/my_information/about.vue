<template>
    <el-form :model="aboutForm" class="form" label-position="top">
        <el-form-item prop="title" label="标题" required>
            <el-input style="width: 50%;" v-model="aboutForm.title"></el-input>
        </el-form-item>
        <el-form-item label="正文" required ref="text">
            <mavon-editor  v-model="aboutForm.content"   style="width: 100%; height: 600px;"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateAbout">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount, onMounted } from 'vue'
import { reqGetAbout, requpdateAbout } from '@/api/aboutMe';
import { ElMessage } from 'element-plus';


//preview 实例
const preview=ref()
const text=ref()


const aboutForm = ref({
    id: '',
    title: '',
    content: '',
    user_id: ''
})

const getAbout = async () => {
    const result = await reqGetAbout()
    aboutForm.value = result.data.data
}

const updateAbout = async () => {
    try {
        await requpdateAbout(aboutForm.value)
        await getAbout()
        ElMessage.success('更新成功')
    } catch (error) {
        ElMessage.error('更新失败')
    }
}

onMounted(async () => {
    await getAbout()
    console.log(preview.value);
    
    
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
//编辑器模式
const mode = ref()
//toolbar,editor配置
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const onChange = (editor: any) => {
    
}



</script>

<style scoped lang="scss">
.form {
    padding-left: 20px;
    padding-top: 20px;
}

.editorContainer {
    display: flex;
    height: 600px;
}
</style>
