<template>
    <div class="container">
        <el-row class="row">
            <el-col :span="8" class="col">
                <el-card>
                    <SvgIcon name="pen" fill="yellow" width="50px" height="50px"></SvgIcon>
                    <span class="title">文章种类 {{ categories?.length }}</span>
                </el-card>
            </el-col>
            <el-col :span="8" class="col">
                <el-card>
                    <SvgIcon name="article" fill="red" width="50px" height="50px"></SvgIcon>
                    <span class="title">已发布文章数 {{ articleTotal }}</span>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="charts">
            <el-col :span="8">
                <el-card>
                    <div ref="tagChart" class="tagChart"></div>
                </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                    <div ref="categoryChart" class="categoryChart"></div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
import {reqHomeInformation} from '@/api/home'
import { onMounted,ref } from 'vue';
import * as echarts from 'echarts';

const articleTotal=ref()
const categories=ref()
const tags=ref()
const tagChart=ref()
const categoryChart=ref()

onMounted(async()=>{
    const res= await reqHomeInformation()
    articleTotal.value=res.data.articleTotal
    categories.value=res.data.categories
    tags.value=res.data.tags

    
    // 基于准备好的dom，初始化echarts实例
let TagChart = echarts.init(tagChart.value);
let CategoryChart= echarts.init(categoryChart.value);

let  TagOption = {
  title: {
    text: '标签下文章数量',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend:{
        top:'bottom'
      },
  series: [
    {
      name: '文章数量',
      type: 'pie',
      radius: '50%',
      data:tags.value.map((item:any)=>({
        type:'pie',
        name:item.name,
        value:item.value,
        itemStyle:{
            color:item.color,
            opacity:0.5
        },
        label:{
            color:item.color
        }

      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
let  CategoryOption = {
  title: {
    text: '标签下文章数量',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend:{
        top:'bottom'
      },
  series: [
    {
      name: '文章数量',
      type: 'pie',
      radius: ['30%', '60%'],
      data:categories.value.map((item:any)=>({
        type:'pie',
        name:item.category_name,
        value:item.count,
        itemStyle:{
            opacity:0.5,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: '#fff',
        },
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}
// 绘制图表
TagChart.setOption(TagOption);
CategoryChart.setOption(CategoryOption)

})



</script>

<style scoped lang="scss">
.container {
    margin-top: 40px;

    .row {
        justify-content: space-around;
        .col {
            font-size: 24px;

            .title {
                vertical-align: 14px;
                padding: 20px;
            }
        }
    }

    .charts {
        justify-content: space-around;
        margin-top: 50px;
        .tagChart{
            width: 350px;
            height: 400px;
        }

        .categoryChart {
            width: 350px;
            height: 400px;
        }
    }
}
</style>