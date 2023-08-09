<template>
    <div class="login_container">
        <el-form class="login-form" :rules="rules"  :model="loginForm" ref="loginFormRef">
            <div class="title-container">
                <h3 class="title">Login Form</h3>
            </div>
            <el-form-item prop="username" >
                <el-input v-model="loginForm.username" placeholder="请输入用户名">
                    <template #prefix>
                        <SvgIcon name="people" color="#889aa4"></SvgIcon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password>
                    <template #prefix>
                        <SvgIcon name="lock" color="#889aa4"></SvgIcon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading=loading style="width: 100%; margin-bottom:10px" @click="login">Login</el-button>
            </el-form-item>
            <div class="tip">
                <span style="margin-right:20px;">username: admin</span>
                <span> password: any</span>
            </div>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { ElMessage } from 'element-plus';
import {useUserStore} from '@/stores/modules/user'
import { useRouter} from 'vue-router'

let userStore=useUserStore()
const router = useRouter()

let loading=ref(false)

let loginForm = ref({
    username: 'rocky',
    password: '123456'
})
//loginform实例
const loginFormRef=ref()

const login=async()=>{

    //保证全部表单校验通过再发请求
   await loginFormRef.value.validate()

    loading.value=true
    try {
        let res= await userStore.userLogin(loginForm.value)
        loading.value=false
        ElMessage.success(res)
        router.push('/')
    } catch (e) {        
        ElMessage.error((e as Error).message)
        loading.value=false
    }
}


//表单校验规则
const rules=ref({
    username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password:[{required:true,min:6,max:15,message:'密码长度6-10位',trigger:'change'}]
})

</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background-color: $bg;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .tip {
        color: white;
    }


}
</style>