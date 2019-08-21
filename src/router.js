//首先要导入路由的组件，让他支持路由
import Router from 'vue-router'

//接下来开始导入路由所涉及的模板，（组件）
import ViewHome from './assets/views/home.vue'
import ViewTopic from './assets/views/topic.vue'
import ViewClass from './assets/views/class.vue'
import ViewMy from './assets/views/my.vue'
import ViewShop from './assets/views/shop.vue'

//把路由模块加入到vue里面去
Vue.use(Router)

//声明定义路由
export default new Router({
    routes: [{
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: ViewHome
        },
        {
            path: '/topic',
            component: ViewTopic
        },
        {
            path: '/class',
            component: ViewClass
        },
        {
            path: '/shop',
            component: ViewShop
        },
        {
            path: '/my',
            component: ViewMy
        }
    ]
})