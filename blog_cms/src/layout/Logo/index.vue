<template>
    <div class="logo">
       <img :src="setting.logo" alt="">
       <h1>{{ setting.title }}</h1>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting'


</script>
<script lang="ts">
export default {
    name:'Logo'
}
</script>

<style scoped lang="scss">
.logo{
    width: 100%;
    height: $base-menu-logo-height;
    background-color: #2b2f3a;
    display: flex;
    align-items: center;
    padding: 20px;
    img {
        width: 30px;
        height: 30px;
    }
    h1 {
        color: white;
        font-weight: 600;
        font-size: $base-menu-logo-font-size;
        margin-left: 10px;
    }
}

</style>