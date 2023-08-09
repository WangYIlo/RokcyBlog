<template>
    <el-card class="box-card" >
        <template #header>
            <span>修改当前登录账户</span>
        </template>
        <el-form ref="userFormRef" :model="userForm" :rules="rules" hide-required-asterisk>
            <el-form-item label="账号">
                <el-input v-model="userForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="large" @click="updatePassword">确认修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useUserInfoStore} from '@/stores/modules/userinfo'
import { ElMessage } from 'element-plus';
const userinforStore=useUserInfoStore()
//user表单实例
const userFormRef=ref()

const userForm=ref({
    username:userinforStore.userinfo.username,
    password:''
})

const rules={
    password:[{required:true,min:6,max:15,message:'密码长度6-10位',trigger:'blur'}]
}

const updatePassword=async()=>{
     //保证全部表单校验通过再发请求
     try {
        await userFormRef.value.validate()
        const result= await userinforStore.updatePassword(userForm.value.password)
        ElMessage.success('密码修改成功')
     } catch (e) {
        ElMessage.error((e as Error).message)
     }
}

</script>

<style scoped lang="scss">
.box-card {
   margin: 20px ;
   width:50%
}

</style>