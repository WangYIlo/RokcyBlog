<template>
    <el-pagination
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[3,4,5]"
      background
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      />
    
</template>

<script setup lang="ts">
const props=defineProps({
currentPage:{
  type:Number,
  requried:true
},
pageSize:{
  type:Number,
  requried:true
},
total:{
  type:Number,
  requried:true
}
})
const emit = defineEmits(['update:currentPage', 'update:pageSize'])

const handleCurrentChange=(newPage:number)=>{
emit('update:currentPage',newPage)
}
const handleSizeChange=(newSize:number)=>{
emit('update:pageSize',newSize)
// 重置当前页码为1
emit('update:currentPage', 1);
}
</script>

<style scoped>

</style>