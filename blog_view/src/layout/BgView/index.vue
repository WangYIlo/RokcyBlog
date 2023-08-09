<template>
    <div class="bg" ref="bg">
        <div class="bg1" :style="{ backgroundImage: 'url(' + setting.bg4 + ')' }">
        <div class="title" :class="{start}">Rocky's Blog</div>
        <Transition name="downSvg">
            <SvgIcon name="down" class="downSvg" width="70px" height="70px" color="black" @click="goDown"></SvgIcon>
        </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { setting } from '@/setting'

import {onMounted,ref} from 'vue'

const start=ref(true)
const bg=ref()

onMounted(()=>{
    setTimeout(()=>{
        start.value=false
    })
    
})

const goDown=()=>{
    
    window.scrollTo({
        top:bg.value.clientHeight,
        behavior:'smooth'
    })
}

</script>

<style scoped lang="scss">
.bg {
    width: 100vw;
    height:100vh;
    .bg1 {
        background-position:center center;
		background-size: cover;
		position: absolute;
        top:0px;
		width: 100%;
		height: 100%;
    }

    .title {
        position: absolute;
        top: 30%;
        left: 40%;
        font-family: Delius Swash Caps,cursive;
        font-size: 50px;
        font-weight: 900;
        color:rgb(0, 68, 102);
        transition: all 1s linear;
    }

    .start {
        font-size: 20px;
        left: 20%;
        opacity: 0;
    }

    .downSvg {
        animation-name: updown;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        position: absolute;
        bottom: 10%;
        left:45%;
        opacity: 0.4;
        transition: 0.5s opacity linear;;
        &:hover {
            cursor: pointer;
            opacity: 1;
        }
    }

    @keyframes updown {
        0% {
           transform: translateY(-5px);
        }

        50% {
            transform: translateY(5px);
        }

        100% {
            transform: translateY(-5px);
        }
    }
}
</style>