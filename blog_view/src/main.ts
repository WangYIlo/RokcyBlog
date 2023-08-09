// 引入全局样式
import '@/styles/index.scss'
import '@/styles/wangeditor.css'

import { createApp } from 'vue'

import App from './App.vue'
import  GlobalComponents  from '@/components/index'
import router from './router'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//element-ui国际化配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//pinia
import pinia from './stores'

const app = createApp(App)

app.use(GlobalComponents)
app.use(router)
app.use(pinia)

//element 国际化
app.use(ElementPlus, {
    locale: zhCn,
  })


app.mount('#app')
