<template>
    <el-form label-position="top" class="form" ref="articleFormRef" :model="ariticleForm">
        <el-row style="width: 100%;">
            <el-col :span="8">
                <el-form-item label="文章标题" required>
                    <el-input placeholder="请输入标题" style="width: 100%; margin-right: 20px"
                        v-model="ariticleForm.title"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="16">
                <el-form-item label="文章展示" required>
                    <el-input placeholder="请为文章做一个简短的介绍" style="width: 100%;" v-model="ariticleForm.introduce"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-form-item label="文章分类" required>
                <el-select v-model="ariticleForm.category_id">
                    <el-option v-for="item in categories" :key="item.id" :label="item.category_name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="公布状态" style="margin-left: 50px;" required>
                <el-select v-model="ariticleForm.is_published">
                    <el-option v-for="item in pubish" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" style="margin-left: 50px;" required>
                <el-select v-model="tagValue" multiple placeholder="请填写对应标签" style="width: 240px">
                    <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-row>
        <el-form-item label="文章正文" required>
            <mavon-editor  ref="$vm" v-model="ariticleForm.content" style="width: 100%; height: 600px;"/>
        </el-form-item>
        <el-form-item label="文章封面" required>
            <el-upload class="avatar-uploader" ref="imageRef" accept="image/*" :auto-upload="false" :on-change="onChange"
                :limit="1">
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addArticle" v-if="!props.id">发表博客</el-button>
            <el-button type="primary" @click="addArticle" v-else>更新博客</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import { ElMessage } from 'element-plus';
import { reqGetAllCatrgories } from '@/api/category';
import { reqAddArticle, reqGetArticleById, reqEditArticleById, reqGetPulish } from '@/api/article/index'
import { reqGetTag } from '@/api/tag/index';
import type { ArticleForm } from '@/api/article/type';
import { useRouter } from 'vue-router';
import setting from '@/setting'

const $router = useRouter()
const $vm=ref()

const props = defineProps(({
    id: String
}))

const baseURL = setting.baseURL_LocalHost
const pubish = ref([{
    id: '',
    name: ''
}])
onMounted(async () => {
    const result = await reqGetAllCatrgories()
    const resultPublish = await reqGetPulish()
    const tagsResult = await reqGetTag()

    tags.value = tagsResult.data.data
    categories.value = result.data.data
    pubish.value = resultPublish.data
    //说明是编辑/更新文章--发送请求
    if (props.id) {
        const result = await reqGetArticleById(props.id)
        ariticleForm.value = result.data.data[0]
        imageUrl.value = baseURL + ariticleForm.value.picture
        tagValue.value= result.data.tags.map((tag:any)=>{
            return tag.id
        })
    }
})

const articleFormRef = ref()
const ariticleForm: ArticleForm = ref({
    title: '',
    content: '',
    is_published: 0,
    category_id: '',
    picture: '',
    introduce: '',
    tags: []
})
//select--分类选择
const categories = ref([
    {
        id: '',
        category_name: ''
    }
])

//标签
const tagValue = ref([])
const tags = ref([
    {
        id: '',
        name: '',
        color:''
    }
])

const imageUrl = ref('')
const imageRef = ref()

//文件改变状态前回调
const onChange = (file: any, fileList: any) => {
    const fr = new FileReader()
    //直接保存文件
    ariticleForm.value.picture = file.raw
    //转为base64做预览效果
    fr.readAsDataURL(file.raw)
    fr.onload = (e) => {
        imageUrl.value = ((e.target as FileReader).result as string)
    }
}


//发表-更新博客
const addArticle = async () => {
    ariticleForm.value.tags = tagValue.value


    const fd = new FormData()
    Object.keys(ariticleForm.value).forEach((key: string) => {
        //插入tags数组
        if (key === 'tags' && Array.isArray(ariticleForm.value[key])) {
            ariticleForm.value[key].forEach((tag: string) => {
                fd.append(`${key}[]`, tag);
            });
        } else {
            fd.append(key, ariticleForm.value[key]);
        }
    })
    let result
    if (props.id) {
        result = await reqEditArticleById(fd, props.id)
    } else {
        result = await reqAddArticle(fd)
    }

    if (result.status === 200) {
        ElMessage.success(props.id ? '更新文章成功' : '发表文章成功')
    }
    //清空数据
    ariticleForm.value = {
        title: '',
        content: '',
        is_published: 0,
        category_id: '',
        picture: '',
        introduce: '',
    }
    imageUrl.value = ''
    imageRef.value.clearFiles()
    $router.push('/blog/blogList')
}

</script>
<style scoped>
.avatar-uploader .avatar {
    width: 250px;
    height: 250px;
    display: block;
}

.form {
    margin-left: 50px;
    margin-top: 10px;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 250px;
    text-align: center;
}
</style>