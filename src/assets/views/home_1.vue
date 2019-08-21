<template>
    <div class="wrapper">
        <home-header></home-header>
        <top-channel></top-channel>
        <!-- offset-accuracy表示两次 scroll 事件之间列表至少滚动了 300px；loadmoreoffset触发 loadmore 事件所需要的垂直偏移距离（设备屏幕底部与页面底部之间的距离 -->
        <scroller :class="['main-list', isIpx&&isIpx()?'ml-ipx':'']" offset-accuracy="300" loadmoreoffset="300" @loadmore="onloadmore">

            <refresher @loadingDown="loadingDown"></refresher>

            <div class="cell-button" @click="jumpWeb('https://m.you.163.com/act/pub/DxDpYNfbBd.html')">
                <!-- 调用轮播图组件 -->
                <yx-slider :imageList="YXBanners" ></yx-slider>
                <!-- 轮播图下面的区域 -->
                <div class="slogan">
                    <text class="i-slg iconfont">&#xe63a; 网易自营品牌</text>
                    <text class="i-slg iconfont">&#xe63a; 30天无忧退货</text>
                    <text class="i-slg iconfont">&#xe63a; 48小时快速退款</text>
                </div>
            </div>

            <!-- block区域 -->
            <div class="cell-button">
                <block-1 :title="makers.title" :items="makers.items"></block-1>
            </div>
            <div class="cell-button">
                <block-2 hasMore=true newGoods=true :head="recommend.head1" :goods="recommend.goods1"></block-2>
            </div>
            <div class="cell-button">
                <block-2 hasMore=true hotGoods=true :head="recommend.head2" :goods="recommend.goods2"></block-2>
            </div>
            <div class="cell-button">
                <block-3 :goods="goodsList"></block-3>
            </div>
            <!-- 这里让block-3在视觉效果上实现了懒加载 -->
            <loading class="loading" @loading="onloading" :display="showLoading">
                
                <text class="indicator">...</text>
            </loading>


        </scroller>
    </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
    }
    .main-list{
        position: fixed;
        top: 168px;
        bottom: 90px;
        left: 0;
        right: 0;
        /*margin-top: 167px;*/
        /*margin-bottom: 90px;*/
    }
    .ml-ipx{
        top: 208px;
        bottom:140px;
    }

    .cell-button{
        padding-bottom: 18px;
    }
    .slogan{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #fff;
    }
    .i-slg{
        height: 66px;
        font-size: 26px;
        padding-top: 16px;
        flex: 1;
        text-align: center;
        color: #b4282d;
    }

</style>

<script>
    // 导入需要用到的内置模块
    var modal = weex.requireModule('modal')
    var navigator = weex.requireModule('navigator')

    import util from '../util';

    // 导入主页的组件
    import Header from '../components/Header.vue';
    import refresher from '../components/refresh.vue';
    import topChannel from '../components/topChannel.vue';
    import YXSlider from '../components/YXSlider.vue';
    import Block1 from '../components/Block1.vue';
    import Block2 from '../components/Block2.vue';
    import Block3 from '../components/Block3.vue';

    export default {
        // 应用导入的组件,前面的key是dom元素节点的名字
        components: {
            'home-header': Header,
            'refresher': refresher,
            'top-channel': topChannel,
            'yx-slider': YXSlider,
            'block-1': Block1,
            'block-2': Block2,
            'block-3': Block3
        },

        data () {
            return {
                YXBanners: [
                ],

                makers: {
                    title:'品牌SS制造商直供',
                    items: []
                },

                recommend: {
                    head1: {
                        tlt: '周一周四 · 新品发布',
                        tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-new.png',
                        url: 'http://m.you.163.com/item/newItem'
                    },
                    goods1: [],
                    head2: {
                        tlt: '人气推荐 · 好物精选',
                        tltBg: 'http://doc.zwwill.com/yanxuan/imgs/bg-hot.png',
                        url: 'http://m.you.163.com/item/recommend'
                    },
                    goods2: []
                },

                goodsList:[],
                showLoading: 'hide'
            }
        },

        created () {
            this.GET('api/home/index', res => {
                let result = res.data.result;
                this.YXBanners = result['banners'];              // 读取轮播图的数据
                this.makers = result['makers'];
                this.recommend = result['recommend'];
            });
            this.GET('api/home/pullGoods', res => {
                let result = res.data.result;
                this.goodsList = result['goods'];
            })
        },

        methods: {
            // 点击跳转的方法
            jumpWeb (_url) {
                const url = this.$getConfig().bundleUrl;
                navigator.push({
                    url: util.setBundleUrl(url, 'page/webview.js?weburl='+_url) ,
                    animated: "true"
                });
            },
            // loading组件里的事件触发的方法
            onloading () {
                modal.toast({ message: 'loading', duration: 0.3 })
                this.showLoading = 'show';
                setTimeout(() => {
                    this.goodsList.push(...this.recommend.goods1);
                    this.showLoading = 'hide'
                }, 300)
            },
            // 下拉sroller列表懒加载触发的方法
            onloadmore () {
                modal.toast({ message: 'loading', duration: 0.3 })
                setTimeout(() => {
                    this.goodsList.push(...this.recommend.goods1);
                }, 100)
            },
            
            loadingDown(){
                this.goodsList =[];
                this.goodsList.push(...this.recommend.goods2);
                this.goodsList.push(...this.recommend.goods1);
            }
        }
    }
</script>