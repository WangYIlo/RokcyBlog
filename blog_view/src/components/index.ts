//自定义插件用于全局注册
import SvgIcon from '@/components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Pagniation from '@/components/Pagniation/index.vue'
import ArticleList from '@/components/ArticleList/index.vue'

export default {
    install(app: any) {
        //注册SvgIcon为全局组件
        app.component('SvgIcon', SvgIcon)
        app.component('ArticleList',ArticleList)
        app.component('Pagniation',Pagniation)
        //注册element-icon
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}