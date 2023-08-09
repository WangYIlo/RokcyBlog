//自定义插件用于全局注册
import SvgIcon from '@/components/SvgIcon/index.vue'
import SidebarItem from '@/layout/Sidebar/sidebarItem.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Pagniation from '@/components/Pagniation/index.vue'

export default {
    install(app: any) {
        //注册SvgIcon为全局组件
        app.component('SvgIcon', SvgIcon)
        app.component('SidebarItem',SidebarItem)
        app.component('Pagniation',Pagniation)
        //注册element-ui 的所有图标
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}