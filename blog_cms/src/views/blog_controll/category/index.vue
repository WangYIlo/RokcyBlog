<template>
    <el-card class="card_box">
        <template #header>
            <div class="card-header">
                <span style="font-weight: 900;">分类管理</span>
            </div>
        </template>
        <el-button type="primary" icon="plus" style="margin-bottom: 20px;"
            @click="addBtn">添加分类</el-button>
        <el-table :data="categoryData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: 'grey', fontWeight: 900 }">
            <el-table-column type="index" label="序号" width="180" />
            <el-table-column prop="category_name" label="名称" width="300" align="center" />
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-button type="primary" icon="editPen" @click="updateCategory(row)">编辑</el-button>
                    <el-button type="danger" icon="delete" @click="deleteCategory(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagniation :current-page="page" :page-size="pageSize" :total="total" @update:currentPage="handleCurrentPageChange"
            @update:pageSize="handlePageSizeChange" />
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="50%">
        <el-form ref="categoryRef" :model="catergoryForm" :rules="rules">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="catergoryForm.name" placeholder="请输入类名"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addCategory">
                确定
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reqGetAllCatrgories, reqAddCategory, reqUpdateCategory,reqDeleteCategory } from '@/api/category/index'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import Pagniation from '@/components/Pagniation/index.vue'
const categoryData = ref([])
//分页器组件
const pageSize = ref<number>(10)
const page = ref<number>(1)
const total = ref<number>(0)
//dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')
//category
const categoryRef = ref()
const catergoryForm = ref({
    name: '',
    id: ''
})
const rules = ref({
    name: [{ required: true, message: '类名不能为空', trigger: 'blur' }],
})

//获取分类数据
const getCatrgory = async () => {
    const res = await reqGetAllCatrgories(page.value, pageSize.value)
    if (res.status === 200) {
        categoryData.value = res.data.data
        total.value = res.data.total
    }
}
onMounted(() => {
    getCatrgory()
})
//pageSize回调
const handlePageSizeChange = async (newSize: any) => {
    pageSize.value = newSize
    getCatrgory()
}
//page回调
const handleCurrentPageChange = async (newPage: any) => {
    page.value = newPage
    getCatrgory()
}

//添加或更新分类
const addCategory = async () => {
    await categoryRef.value.validate()
    dialogVisible.value = false
    let { id, name } = catergoryForm.value
    let res
    if (!id) {
        res = await reqAddCategory(name)
    } else {
        res = await reqUpdateCategory(name, id)
    }

    if (res.status == 200) {
        ElMessage.success(id?'更新成功':'添加成功')
    }
    if (res.status == 201) {
        ElMessage.error('分类信息不能重复')
    }
    //重新获取数据
    await getCatrgory()
    catergoryForm.value.name = ''
    catergoryForm.value.id = ''
}
//删除分类
const deleteCategory=async(id:number)=>{
   const res= await reqDeleteCategory(id)
   if(res.status===200){
    ElMessage.success('删除成功')
   }
   getCatrgory()
}
//添加按钮
const addBtn=()=>{
    dialogVisible.value = true;
    dialogTitle.value = '添加分类'
    catergoryForm.value.name = ''
    catergoryForm.value.id = ''
}
//更新按钮
const updateCategory = async (row: any) => {
    dialogTitle.value = '编辑分类'
    dialogVisible.value = true
    catergoryForm.value.name = row.category_name
    catergoryForm.value.id = row.id
}

</script>

<style lang="scss" scoped></style>