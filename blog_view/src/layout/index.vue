<template>
    <div class="layout_container">
        <div class="layout_topbar">
            <Navbar/>
        </div>
        <BgView v-if="$route.path==='/home'"></BgView>
        <div class="layout_main">
            <div class="layout_leftCard">
                <LeftCard></LeftCard>
            </div>
            <div class="layout_centerCard">
                <router-view></router-view>
            </div>
            <div class="layout_rightCard">
                <RightCard></RightCard>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar/index.vue'
import LeftCard from './leftCard/index.vue'
import RightCard from './rightCard/index.vue'
import BgView from '@/layout/BgView/index.vue'


</script>

<style>
body {
    background-color: rgba(106, 99, 99,0.1);
}
</style>

<style scoped>
.layout_container {
    width: 100%;
    .layout_topbar {
        width: 100%;
        height: 60px;
        margin-bottom: 20px;
    }

    .layout_main {
        display: flex;
        .layout_leftCard {
            flex: 1;
        }
        .layout_centerCard {
            flex: 3;
            margin: 0 20px;
        }
        .layout_rightCard {
            flex: 1;
        }
    }
}

@media screen and (max-width: 844px){   
    .layout_leftCard {
        display: none;
    }
    .layout_rightCard{
        display: none;
    }
}
</style>