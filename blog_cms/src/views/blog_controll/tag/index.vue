<template>
    <el-card class="card_box">
        <template #header>
            <div class="card-header">
                <span style="font-weight: 900;">标签管理</span>
            </div>
        </template>
        <el-button type="primary" icon="plus" style="margin-bottom: 20px;"
            @click="addBtn">添加标签</el-button>
        <el-table :data="tagData" style="width: 100%"
            :header-cell-style="{ background: '#eef1f6', color: 'grey', fontWeight: 900 }">
            <el-table-column type="index" label="序号" width="180" />
            <el-table-column prop="name" label="名称" width="300" align="center" />
            <el-table-column  label="颜色" align="center" width="200">
                <template #default="{row}">
                    <div style="width: 100%; height: 30px;">
                        <span style="float: left;">{{ row.color }}</span>
                    <span style="width:60%; height: 30px; float: right;" :style="{background:row.color}"></span>
                    </div>
                </template>
            </el-table-column>
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
        <el-form ref="tagRef" :model="tagForm" :rules="rules">
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="tagForm.name" placeholder="请输入标签名"></el-input>
            </el-form-item>
            <el-form-item label="颜色" required >
                <el-input v-model="tagForm.color" type="color" style="width: 30%;"></el-input>
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
import { reqGetTag,reqDeleteTag,reqUpdateTag,reqAddTag} from '@/api/tag/index'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import Pagniation from '@/components/Pagniation/index.vue'
const tagData = ref([])
//分页器组件
const pageSize = ref<number>(10)
const page = ref<number>(1)
const total = ref<number>(0)
//dialog
const dialogVisible = ref(false)
const dialogTitle = ref('')
//category
const tagRef = ref()
const tagForm= ref({
    name: '',
    id: '',
    color:''
})
const rules = ref({
    name: [{ required: true, message: '类名不能为空', trigger: 'blur' }],
})

//获取标签数据
const getCatrgory = async () => {
    const res = await reqGetTag(page.value, pageSize.value)
    if (res.status === 200) {
        tagData.value = res.data.data
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

//添加或更新标签
const addCategory = async () => {
    await tagRef.value.validate()
    dialogVisible.value = false
    let { id, name,color } = tagForm.value
    console.log(color);
    
    let res
    if (!id) {
        res = await reqAddTag(name,color)
    } else {
        res = await reqUpdateTag(name,color,id)
    }

    if (res.status == 200) {
        ElMessage.success(id?'更新成功':'添加成功')
    }
    if (res.status == 201) {
        ElMessage.error('标签信息不能重复')
    }
    //重新获取数据
    await getCatrgory()
    tagForm.value.name = ''
    tagForm.value.id = ''
    tagForm.value.color = ''
}
//删除标签
const deleteCategory=async(id:number)=>{
   const res= await reqDeleteTag(id)
   if(res.status===200){
    ElMessage.success('删除成功')
   }
   getCatrgory()
}
//添加按钮
const addBtn=()=>{
    dialogVisible.value = true;
    dialogTitle.value = '添加标签'
    tagForm.value.name = ''
    tagForm.value.id = ''
}
//更新按钮
const updateCategory = async (row: any) => {
    dialogTitle.value = '编辑标签'
    dialogVisible.value = true

    tagForm.value.name = row.name
    tagForm.value.color=row.color
    tagForm.value.id = row.id
}

</script>

<style lang="scss" scoped></style>