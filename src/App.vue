<template>
    <div class="app-wrapper">
        <router-view class="r-box">
        
        </router-view>
        <tab-bar @tabTo="onTabTo"></tab-bar>
    </div>
</template>
<style>
    body{
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color:#333;
    }
</style>
<style scoped>
    .app-wrapper{
        background-color: #f4f4f4;
    }
    .r-box{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
    }

</style>

<script>
    var modal = weex.requireModule('modal');
    // 引用全局的工具类的函数
    import util from './assets/util';
    import tabBar from './assets/components/tabBar.vue';
    export default {
        data () {
            return {
            }
        },
        components: {
            'tab-bar': tabBar
        },
        // 在render之前运行的钩子函数
        created () {
            // 页面开始之前，加载一个字体
            util.initIconFont();
        },
        methods: {
            // 在导航栏tabBar组件中，用$emit调用了此函数
            onTabTo(_result){
                let _key = _result.data.key || '';
                // 用路由实现页面跳转
                this.$router && this.$router.push('/'+_key)
            }
        }
    }
</script>