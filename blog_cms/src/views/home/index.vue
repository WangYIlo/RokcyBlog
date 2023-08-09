<template>
    <div class="container">
        <el-row class="row">
            <el-col :span="8" class="col">
                <el-card>
                    <SvgIcon name="pen" fill="yellow" width="50px" height="50px"></SvgIcon>
                    <span class="title">文章种类 27</span>
                </el-card>
            </el-col>
            <el-col :span="8" class="col">
                <el-card>
                    <SvgIcon name="article" fill="red" width="50px" height="50px"></SvgIcon>
                    <span class="title">文章数 27</span>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
</script>

<style scoped lang="scss">
.container {
    margin-top: 20px;
    margin-left: 20px;

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
}
</style>