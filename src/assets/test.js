// 封装一个自定义的工具库
let utilFunc = {
    // 获取字体图片
    initIconFont() {
        let dom = weex.requireModule('dom');
        dom.addRule('fontface', {
            "fontFamily":"iconfont",
            "src":"url('http://at.alicdn.com/t/font_404010_f29c7wlkludz33di.ttf')"
        })
    },

    // 发送http请求并获取参数
    // index.html?age=18&body=niu
    getUrlSearch() {
        var reg = new RegExp("(^|&)" + name + "=([^&*])(&|$)","i");
        // 截取?以后的内容然后再用正则匹配
        let r = url.slice(url.indexOf("?")+1).match(reg);

        if(r != null) {
            try{
                return decodeURIComponent(r[2]);
            }catch(_e){     // 如果上面报错就返回空的url
                return null;
            }
            
        }

    }
}

export default utilFunc;