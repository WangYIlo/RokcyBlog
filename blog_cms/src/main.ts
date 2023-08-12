// 引入全局样式
import '@/styles/index.scss'

import { createApp } from 'vue'

import App from './App.vue'
import  GlobalComponents  from '@/components/index'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//element-ui国际化配置
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import router from './router'

import pinia from './stores'

import '@wangeditor/editor/dist/css/style.css' // 引入 wangeditor css
import 'mavon-editor/dist/css/index.css' 
import mavonEditor from 'mavon-editor'

const app = createApp(App)

//element 国际化
app.use(ElementPlus, {
    locale: zhCn,
  })

app.use(GlobalComponents)
app.use(pinia)
app.use(router)
app.use(mavonEditor)

app.mount('#app')
