<template>
    <el-form :model="aboutForm" class="form" label-position="top">
        <el-form-item prop="title" label="标题" required >
            <el-input style="width: 50%;" v-model="aboutForm.title"></el-input>
        </el-form-item>
        <el-form-item label="正文" required >
            <div style="border: 1px solid #ccc;">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 500px; overflow-y: hidden;" v-model="aboutForm.content" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
            </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="updateAbout">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ref, shallowRef, onBeforeUnmount,onMounted } from 'vue'
import { reqGetAbout,requpdateAbout} from '@/api/aboutMe';
import { ElMessage } from 'element-plus';

const aboutForm = ref({
    id: '',
    title: '',
    content: '',
    user_id: ''
})

const getAbout=async()=>{
   const result=await reqGetAbout()
   aboutForm.value=result.data.data
}

const updateAbout=async()=>{
    try {
        await requpdateAbout(aboutForm.value)
        await getAbout()   
        ElMessage.success('更新成功')
    } catch (error) {
        ElMessage.error('更新失败')
    }
}

onMounted( async()=>{
    await getAbout()
})


// wangEditor---富文本编辑器配置
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
//编辑器模式
const mode = ref('')
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
</script>

<style scoped lang="scss">
.form {
    padding-left: 20px;
    padding-top: 20px;
}


</style>
