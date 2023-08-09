<template>
  <!-- svg:图标外层容器节点,内部需要和use标签结合使用 -->
  <svg :style="{width,height}" class="svg-icon" >
    <!-- xlink: href执行用哪一个图标,属性值 #icon-图标名字 -->
    <use :xlink:href="prefix+name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href 属性值前缀
  prefix:{
    type:String,
    default:'#icon-'
  },
  //图标名字
  name:{
    type:String,
    required:true
  },
  //颜色
  color:{
    type:String
  },
  width:{
    type:String,
    default:'20px'
  },
  height:{
    type:String,
    default:'20px'
  }
})
</script>

<style scoped lang="scss">

</style>