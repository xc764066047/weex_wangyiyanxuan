<template lang="">
<!-- 这里判断设备是否是iphoneX -->
    <div :class="['wrapper', isIpx && isIpx()?'w-ipx': '']">
        <div class="bar-item" @click="tabTo('home')">
            <!-- 根据激活状态来获取对应的class，isActive是自己封装的方法 -->
            <text class="bar-ic iconfont" :class="[this.isActive('home')]">&#xe660;</text>
            <text class="bar-txt" :class="[this.isActive('home')]">首页</text>
        </div>

        <div class="bar-item" @click="tabTo('topic')">
            <!-- 根据激活状态来获取对应的class，isActive是自己封装的方法 -->
            <text class="bar-ic iconfont" :class="[this.isActive('topic')]">&#xe660;</text>
            <text class="bar-txt" :class="[this.isActive('topic')]">专题</text>
            <text class="notice-dot"></text>
        </div>
        <div class="bar-item" @click="tabTo('class')">
            <!-- 根据激活状态来获取对应的class，isActive是自己封装的方法 -->
            <text class="bar-ic iconfont" :class="[this.isActive('class')]">&#xe660;</text>
            <text class="bar-txt" :class="[this.isActive('class')]">分类</text>
        </div>
        <div class="bar-item" @click="tabTo('shop')">
            <!-- 根据激活状态来获取对应的class，isActive是自己封装的方法 -->
            <text class="bar-ic iconfont" :class="[this.isActive('shop')]">&#xe660;</text>
            <text class="bar-txt" :class="[this.isActive('shop')]">购物车</text>
        </div>
        <div class="bar-item" @click="tabTo('my')">
            <!-- 根据激活状态来获取对应的class，isActive是自己封装的方法 -->
            <text class="bar-ic iconfont" :class="[this.isActive('my')]">&#xe660;</text>
            <text class="bar-txt" :class="[this.isActive('my')]">我的</text>
            <text class="i-notice">2</text>
        </div>

    </div>
</template>

<script>
    // 导入警告框内置模块
    var modal = weex.requireModule("modal");

    export default {
        //计算某些值得属性的时候使用
        computed: {
            ooxx() {}
        },
        //代理 proxy
        data() {
            return {
                pIndexkey: "home"       // 默认选中home页面
            };
        },
        //大功能，逻辑功能的调用函数都在这里面写
        methods: {
            //设置当前点击的按钮为激活状态，附加一个active的样式，就变成了红色
            isActive(_c) {
                // 这里能调用data里的this.pIndexkey是因为在vue的源码里用到了proxy进行了代理操作
                return this.pIndexkey === _c ? "bar-active" : "";
            },
            tabTo(_key) {
                //如果当前已经点击按钮被点击了，就没有必要跳转了，直接return代表这个函数就不往下执行了
                if (_key === this.pIndexkey) return;
                this.pIndexkey = _key;
                // 子组件可以用$emit触发父组件的事件监听器,tabTo是App.vue里监听的事件
                this.$emit("tabTo", {
                    status: "tabTo",
                    data: {
                        key: _key
                    }
                });
            }
        },
        // 钩子函数（生命周期），在特定的场景下执行。
        // 原理是在基层代码中定义了构造函数，然后基层函数中有个自调用方法，里面包含了各个钩子函数。在用new Vue实例化对象的时候都会继承该构造函数的所有钩子函数
        // 因为js是从上往下运行的，钩子函数在定义的时候就有执行顺序，所以实例化的vue对象里调用钩子函数也会有执行顺序
        created() {},
        mounted() {}
    };
</script>


<style scoped>
.iconfont {
	font-family: iconfont;
}
.wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 90px;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: space-around;
	border-top-width: 2px;
	border-top-color: #d9d9d9;
	background-color: #fafafa;
}
/* 针对iphoneX设备进行单独的优化 */
.w-ipx {
	height: 140px;
}

.bar-item {
	flex: 1;
}

.bar-txt,
.bar-ic {
	color: #666;
	text-align: center;
}

.bar-active {
	color: red;
}

.bar-ic {
	padding-top: 14px;
	font-size: 38px;
}

.bar-txt {
	font-size: 22px;
	padding-top: 2px;
}

.notice-dot {
	position: absolute;
	top: 15px;
	right: 40px;
	height: 15px;
	width: 15px;
	border-radius: 100%;
	background: red;
}

.i-notice {
	position: absolute;
	top: 10px;
	right: 30px;
	height: 30px;
	width: 30px;
	border-radius: 100%;
	font-size: 5px;
	line-height: 30px;
	text-align: center;
	color: #fff;
	background-color: red;
}
</style>