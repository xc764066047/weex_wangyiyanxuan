//导入入口文件
import App from './App.vue'
//导入路由配置文件
import router from './router'

//导入我们自定义的一些可能用到的过滤器
import * as filters from './filters'

//导入混淆代码
import mixins from './mixins'

//把自己定义的过滤器函数，导入到vue里面
Object.keys(filters).forEach(
    key => {
        Vue.filter(key, filters[key])
    }
)

//导入混淆到vue里面
Vue.mixin(mixins)

//启动vue,extend可以合并参数
new Vue(Vue.util.extend({
    el: '#root',
    router
}, App))

//正式进入到首页
router.push('/')