<template>
  <div class="hamburger" @click="toggleClick">
    <el-icon style="width:30px;height: 30px;" :size="20">
      <component :is="settingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
  </div>
</template>

<script setup lang="ts">

import {useSettingStore} from '@/stores/modules/setting'

let settingStore=useSettingStore()

const toggleClick=()=>{
  settingStore.toggle_sidebar()
}
</script>
<script lang="ts">
export default {
  name:'Hamburger'
}
</script>

<style scoped lang="scss">
 .hamburger{
   width: 30px;
   height: 30px;
   margin: 0 15px;
 }
</style>