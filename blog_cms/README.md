# vue-template 
根据vue-admin-template文档实现完成的后台管理项目---vue-admin-template  https://panjiachen.github.io/vue-element-admin-site/zh/guide/

采用mock 伪造数据进行登录

## 功能实现

#### 侧边栏
实现了动态路由的功能 ----需要在routes中配置meta属性 title-路由标题  icon-字体图标
实现了侧边栏默认展开和收缩
部分样式修改需要在sidebar.scss中进行修改
新增页面只需要在route中添加

### 字体图标
可以使用icon-font 以及 elment-plus自带的字体图标
使用icon-font 需要使用SVGICON 组件--已经注册为全局组件--通过修改prefix可以更改前缀名能使用别的图标
样式修改: color 颜色  width height  name--关系到侧边栏路由的字体图标展示

### 面包屑
通过$route中的matched实现,可以进行跳动



