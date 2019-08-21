<template>
    <div class="wrapper">
        <!-- 通过scroll-direction来控制滚动列表的方向，horizontal是横向滚动 -->
        <scroller class="tp-box" scroll-direction="horizontal" show-scrollbar=false>
            <!-- 遍历topics里的数据 -->
            <div class="i-tp" v-for="i in topics">
                <image class="tp-img" resize="cover" :src="i.img"></image>
                <text class="tp-name">{{i.name}}</text>
            </div>
        </scroller>
    </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        background-color: #fff;
    }

    .tp-box{
        height: 200px;
        padding: 20px;
        flex-direction: row;
    }
    .i-tp{
        width: 275px;
        height: 150px;
        margin: 10px;
    }
    .tp-img{
        position: absolute;
        top:0;
        left: 0;
        width: 275px;
        height: 150px;
        border-radius: 10px;
        background-color: #f4f4f4;
    }

    .tp-name{
        font-size: 28px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 57px;
        overflow: hidden;
        text-align: center;
        color:#fff;
        lines:1;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<script>
    export default {
        props:["topics"],
        data () {
            return {
            }
        },
        methods: {
        }
    }
</script>