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
             <div class="sayings" ref="sayings"></div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/moudles/user'
import { onMounted,ref } from 'vue';
import {setting} from '@/setting'
import animateText from '@/utils/animateText'

const sayings=ref()
const userStore = useUserStore()

onMounted(async () => {
    await userStore.getUserinfo()
    //动态显示文字
    animateText(sayings.value,setting.leftSayings,200,200)
})



</script>



<style scoped lang="scss">
.box-card {
    .card-header {
        text-align: center;
        font-weight: 700;
        .user_image {
            width: 260px;
            height: 260px;
            margin-bottom: 10px;
        }
        .icons {
            margin-top: 20px;
        }
    }

    .sayings{
        font-weight: 700;
        font-size: 16px;
        animation: text-animation 3s linear infinite;
    }
}

@keyframes text-animation{
  0% {
    color: red;
  }
  50% {
    color: blue;
  }
  75% {
    color: yellow;
  }
  100% {
    color: green;
  }
    
}
</style>