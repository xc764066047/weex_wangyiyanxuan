<template>
    <div :class="['wrapper', isIpx&&isIpx()?'w-ipx':'']">

        <!-- header-2 -->
        <header2  title="专题"></header2>

        <!-- loadmoreoffset懒加载触发距离，下滑300px -->
        <scroller class="main-list" offset-accuracy="300px" @loadmore="onloadmore" loadmoreoffset="300">
            <!-- 下拉刷新组件 -->
            <refresher></refresher>

            <!-- block-4 -->
            <div  class="cell-button"  @click="jumpWeb('http://m.you.163.com/topic/v1/look/list')">
                <block-4 :topics="topics"></block-4>
            </div>

            <!-- block-5 -->
            <div v-for="ar in articles" class="cell-button">
                <block-5 :article="ar" url=""></block-5>
            </div>
        </scroller>
    </div>
</template>
<style scoped>

    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        background-color: #f4f4f4;
    }
    .w-ipx{
        margin-top: 40px;
        margin-bottom: 50px;
    }
    .main-list{
        margin-top: 113px;
        margin-bottom: 90px;
    }
    .cell-button{
        padding-bottom: 18px;
    }

</style>

<script>
    import util from '../util';
    import Header2 from '../components/Header2.vue';
    import refresher from '../components/refresh.vue';
    import Block4 from '../components/Block4.vue';
    import Block5 from '../components/Block5.vue';
    var navigator = weex.requireModule('navigator')
    export default {
        components: {
            // 组件名可以加引号也可以不加，严格模式必须加
            'header2': Header2,
            'refresher': refresher,
            'block-4': Block4,
            'block-5': Block5,
        },
        data() {
            return {
                topics:[],
                articles:[]
            }
        },

        // 这里面读取api
        created() {
            // this.GET方法是mixins文件夹到Vue基类里的
            this.GET('api/topic/index', res => {
                let result = res.data.result;
                // 改变topics的值
                this.topics = result['topics'];
            });
            this.GET('api/topic/articles', res => {
                let result = res.data.result;
                // 改变articles的值
                this.articles = result['articles'];
            })
        },
        methods: {
            onloadmore () {
                // 设置延时函数，因为获取到接口数据会花点时间
                setTimeout(() => {
                    this.articles.push(...this.articles);
                }, 100)
            },
            jumpWeb (_url) {
                const url = this.$getConfig().bundleUrl;
                navigator.push({
                    url: util.setBundleUrl(url, 'page/webview.js?weburl='+_url) ,
                    animated: "true"
                });
            },
        }
    }
</script>