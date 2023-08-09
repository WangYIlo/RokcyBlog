<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span style="font-weight: 900;">文章管理</span>
            </div>
        </template>
        <el-form :inline="true">
            <el-form-item label="文章分类">
                <el-select v-model="categoryId" change="selectChange">
                    <el-option v-for=" item in categoryData" :key="item.id" :label="item.category_name"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布状态">
                <el-select :disabled="!categoryId" v-model="publish">
                    <el-option v-for="item in publishList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="searchArtiList" :disabled="!categoryId">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="articleList" style="width: 100%;margin-bottom: 20px;"
            :header-cell-style="{ background: '#eef1f6', color: 'grey', fontWeight: 900 }">
            <el-table-column  label="序号" type="index" width="80px" />
            <el-table-column prop="title" label="标题" show-overflow-tooltip align="center" />
            <el-table-column prop="category_name" label="分类" align="center" />
            <el-table-column  label="可见性" align="center" > 
                <template #default="{ row }">
                   <el-text :type="row.is_published?'success':'danger'">{{ row.is_published?'公开':'草稿' }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="created_time" label="创建时间" show-overflow-tooltip align="center" />
            <el-table-column prop="update_time" label="更新时间" show-overflow-tooltip align="center" />
            <el-table-column label="操作" align="center" width="200px">
                <template #default="{ row }">
                    <el-button type="primary" icon="editPen" @click="goEdit(row.id)">编辑</el-button>
                    <el-button type="danger" icon="delete" @click="delteArticle(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagniation :current-page="page" :page-size="pageSize" :total="total" @update:currentPage="handleCurrentPageChange"
            @update:pageSize="handlePageSizeChange" />
    </el-card>

</template>

<script setup lang="ts">
import { reqGetAllCatrgories } from '@/api/category';
import { onMounted, ref } from 'vue';
import { reqGetPulish, reqGetArticle,reqDeleteArticle } from '@/api/article'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const $router=useRouter()

const page = ref(1)
const pageSize = ref(10)
const total = ref()
//分类
const categoryData = ref([{
    category_name: '',
    id: '',
    user_id: ''
}])
//publish
const publishList = ref([{
    id: '',
    name: ''
}])
//文章
const articleList = ref([{
    id: '',
    title: '',
    content: '',
    is_published: '',
    created_time: '',
    update_time: '',
    user_id: '',
    category_id: '',
    picture: '',
    introduce: '',
    category_name: ''
}
])
const categoryId = ref<number | string>()
const publish = ref<number | string>()

//获取分类数据
const getCatrgory = async () => {
    const res = await reqGetAllCatrgories()
    if (res.status === 200) {
        categoryData.value = res.data.data
    }
}
//获取publish类型
const getPublish = async () => {
    const result = await reqGetPulish()
    if (result.status === 200) {
        publishList.value = result.data
    }
}
//获取文章
const getArticleList = async () => {
    const result = await reqGetArticle(page.value, pageSize.value, categoryId.value, publish.value)
    if (result.status === 200) {
        articleList.value = result.data.data
        total.value = result.data.total
    }

}
//查找按钮回调
const searchArtiList = () => {
    getArticleList()
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
//删除按钮回调
const delteArticle=async(id:number|string)=>{
   const result= await reqDeleteArticle(id)
   if(result.status===200){
        ElMessage.success('删除成功')
   }
   //重新获取数据
   getArticleList()
}
//编辑按钮
const goEdit=(id:number|string)=>{
    $router.push(`/blog/edit/${id}`)
}
onMounted(() => {
    getCatrgory()
    getPublish()
    getArticleList()
})



</script>

<style lang="scss" scoped></style>