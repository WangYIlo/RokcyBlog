import Layout from '@/layout/index.vue'

export const constantRoute=[
    {
        path:'/',
        component:Layout,
        name:'layout',
        redirect:'/home',
        children:[
            {
                path:'/home',
                name:'home',
                component:()=>import('@/views/home/index.vue')
            },
            {
                path:'/article/:id?',
                name:'article',
                component:()=>import('@/views/article/index.vue'),
                props:true
            },
            {
                path:'/category/:id?/:name',
                name:'category',
                component:()=>import('@/views/category/index.vue'),
                props:true
            },
            {
                path:'/tag/:id?/:name',
                name:'tag',
                component:()=>import('@/views/tag/index.vue'),
                props:true
            },
            {
                path:'/archives',
                name:'archives',
                component:()=>import('@/views/archives/index.vue')
            },
            {
                path:'/aboutMe',
                name:'about',
                component:()=>import('@/views/aboutme/index.vue')
            },
            {
                path:'/searchArtile',
                name:'search',
                component:()=>import('@/views/search/index.vue')
            }
        ]
    },
]


