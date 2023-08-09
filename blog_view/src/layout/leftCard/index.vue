<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <img :src="userStore.userinfo.avatar" class="user_image">
                    <span>{{ userStore.userinfo.nickname }}</span>
                    <div class="icons">
                        <el-button circle  tag="a" href="https://github.com/WangYIlo" target="_blank" color="#cacbcd">
                            <template #icon>
                                <svgIcon name="github"></svgIcon>
                            </template>
                        </el-button>
                        <el-button circle  tag="a" href="https://blog.csdn.net/m0_74793405?spm=1008.2028.3001.5343" target="_blank" color="#cacbcd">
                            <template #icon>
                                <svgIcon name="music" color="red" ></svgIcon>
                            </template>
                        </el-button>
                        <el-button circle  tag="a" href="https://music.163.com/#/user/home?id=618424802" target="_blank" color="#cacbcd">
                            <template #icon>
                                <svgIcon name="scdn" ></svgIcon>
                            </template>
                        </el-button>
                    </div>
                </div>
            </template>
            游龙当归海
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/moudles/user'
import { onMounted } from 'vue';

const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUserinfo()
})

</script>



<style scoped lang="scss">
.box-card {
    .card-header {
        text-align: center;
        font-weight: 900;
        .user_image {
            width: 260px;
            height: 260px;
            margin-bottom: 10px;
        }
        .icons {
            margin-top: 20px;
        }
    }

}
</style>