<template>
    <el-card>
        <template #header>
            <span style="font-weight: 900;">个人信息展示</span>
        </template>
        <el-form label-width="150px" :model="userinfoForm">
            <el-form-item label="用户昵称" prop="nickname">
                <el-input style="width: 200px;" v-model="userinfoForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input style="width: 200px;" v-model="userinfoForm.email"></el-input>
            </el-form-item>
            <el-form-item label="用户头像" class="img" prop="avatar">
                <div @click="changeAvatar">
                    <!-- 没有图片 -->
                    <img v-if="!userinfoForm.avatar" class="the_img" src="../../assets/images/avatar.jpg" >
                    <!-- 有图片 -->
                    <img v-else class="the_img"  :src="userinfoForm.avatar" >
                </div>
                <input type="file" ref="iptRef" accept="image/*" style="display: none" @change="onFileChange">
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="select" @click="updateUserinfo">修改信息</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserInfoStore } from '@/stores/modules/userinfo';
import { ElMessage } from 'element-plus';
const userinfoStroe = useUserInfoStore()
const userinfo = userinfoStroe.userinfo
const iptRef = ref()
const userinfoForm = ref({
    nickname: userinfo.nickname || '',
    email: userinfo.email || '',
    avatar: userinfo.avatar || '',
})
//触发input点击事件--更换图片
const changeAvatar = () => {
    iptRef.value.click()
}
//input点击事件
const onFileChange = (e: any) => {
    let files = e.target.files
    if (files.length === 0) {
        userinfoForm.value.avatar=''
    }else{
        const fr=new FileReader()
        fr.readAsDataURL(files[0])
        fr.onload=(e)=>{
           userinfoForm.value.avatar=((e.target as FileReader).result as string)
        }
    }
}
//修改信息按钮
const updateUserinfo=async()=>{
    try {
        await userinfoStroe.updateUserinfo(userinfoForm.value) 
        await userinfoStroe.getUserinfo()
        ElMessage.success('修改信息成功')
    } catch (e) {
        ElMessage.error((e as Error).message)
    }
}
</script>

<style scoped lang="scss">
.the_img {
   width: 360px;
   height: 360px;
}
</style>