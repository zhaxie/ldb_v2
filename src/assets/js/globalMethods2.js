//基础
const ajax = (Vue) => {
  const ajax = require('@/assets/js/ajax.js').default;

  Vue.prototype.$ajax = ajax.ajax;
  Vue.prototype.$imgBaseUrl = 'https://www.ldbbeer.com/';
}

const globalMethodsObj = {
  //遮罩
  mask(Vue) {
    const Mask = Vue.extend(require('@/components/maskBg.vue').default);
    let instance_mask = new Mask();

    instance_mask.$mount(document.createElement('div'));
    document.body.appendChild(instance_mask.$el);

    Vue.prototype.$showMask = (options) => { instance_mask.showMask(options) };
    Vue.prototype.$hideMask = (options) => { instance_mask.hideMask(options) };
  },

  //中间提示框
  toast(Vue) {
    const Toast = Vue.extend(require('@/components/toast.vue').default);
    let instance_toast = new Toast();

    instance_toast.$mount(document.createElement('div'));
    document.body.appendChild(instance_toast.$el);

    Vue.prototype.$toast = (options) => { instance_toast.toast(options) };
  },

  //中间对话框
  confirm(Vue) {
    const Confirm = Vue.extend(require('@/components/confirm.vue').default);
    let instance_confirm = new Confirm();

    instance_confirm.$mount(document.createElement('div'));
    document.body.appendChild(instance_confirm.$el);

    Vue.prototype.$showConfirm = (options) => { instance_confirm.showConfirm(options) };
  },

  //loading动画
  loading(Vue) {
    const Loading = Vue.extend(require('@/components/loading.vue').default);
    let instance_loading = new Loading();

    instance_loading.$mount(document.createElement('div'));
    document.body.appendChild(instance_loading.$el);

    Vue.prototype.$showLoading = (options) => { instance_loading.showLoading(options) };
    Vue.prototype.$hideLoading = (options) => { instance_loading.hideLoading(options) };
  },

  //打开app
  openToApp(Vue) {
    let data = {};

    Vue.prototype.$openToApp = () => {
      console.log(Vue)
      const downloadUrl = {
        urlScheme: "ldb10086://",
        universalLink: "https://ldbbeer.com/wwdc/news/turnToDownloadApp.html",
        appleStore:
          "https://apps.apple.com/cn/app/%E5%BE%97%E5%AE%9D%E8%B4%AD/id1456072809",
        huawei:
          "https://appgallery.cloud.huawei.com/uowap/index.html#/detailApp/C101534925?source=appshare&subsource=C101534925&shareTo=weixin&locale=zh_CN",
        // oppo: "1212",
        vivo:
          "https://h5coml.vivo.com.cn/h5coml/appdetail_h5/browser_v2/index.html?appId=2856674&resource=301&source=2",
        xiaomi: "http://app.xiaomi.com/details?id=com.j787631162.cnp",
        default: "http://app.xiaomi.com/details?id=com.j787631162.cnp"
      };

      //判断是不是微信浏览器
      const isWeChatBrowser = () => {
        var ua = navigator.userAgent.toLowerCase();
        return /micromessenger/.test(ua) ? true : false;
      };

      //判断手机品牌
      const judgeBrand = sUserAgent => {
        var isIphone = sUserAgent.match(/iphone/i) == "iphone";
        var isHuawei = sUserAgent.match(/huawei/i) == "huawei";
        var isHonor = sUserAgent.match(/honor/i) == "honor";
        var isOppo = sUserAgent.match(/oppo/i) == "oppo";
        var isOppoR15 = sUserAgent.match(/pacm00/i) == "pacm00";
        var isVivo = sUserAgent.match(/vivo/i) == "vivo";
        var isXiaomi = sUserAgent.match(/mi\s/i) == "mi ";
        var isXiaomi2s = sUserAgent.match(/mix\s/i) == "mix ";
        var isRedmi = sUserAgent.match(/redmi/i) == "redmi";
        var isSamsung = sUserAgent.match(/sm-/i) == "sm-";

        if (isIphone) {
          return "iphone";
        } else if (isHuawei || isHonor) {
          return "huawei";
        } else if (isOppo || isOppoR15) {
          return "oppo";
        } else if (isVivo) {
          return "vivo";
        } else if (isXiaomi || isRedmi || isXiaomi2s) {
          return "xiaomi";
        } else if (isSamsung) {
          return "samsung";
        } else {
          return "default";
        }
      };

      var createIframe = (function () {
        var iframe = document.querySelector('iframe');
        return function () {
          if (iframe) {
            return iframe;
          } else {
            iframe = document.createElement("iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            return iframe;
          }
        };
      })();

      //判断手机的类型
      const u = navigator.userAgent;
      const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      let _location = window.location;

      if (isAndroid) {
        if (isWeChatBrowser() === true) {
          Vue.prototype.$toast({
            msg: "请点击右上角，在浏览器中打开",
            duration: 3000
          });
        } else {
          Vue.prototype.$showLoading({
            showMask: true,
          });

          var isChrome = window.navigator.userAgent.indexOf("Chrome") !== -1;
          var iframe = createIframe();
          const brand = judgeBrand(navigator.userAgent.toLowerCase());

          if (isChrome) {
            //chrome浏览器用iframe打不开得直接去打开，算一个坑
            _location.href = downloadUrl.urlScheme;
          } else {
            //抛出你的scheme
            iframe.src = downloadUrl.urlScheme;
          }

          clearTimeout(data.openAppTimer);
          data.openAppTimer = setTimeout(() => {
            Vue.prototype.$hideLoading({
              hideMask: false,
            });

            Vue.prototype.$showConfirm({
              title: "下载得宝购",
              confirmCb: () => {
                _location.href =
                  downloadUrl[brand] || downloadUrl.default;
              }
            });
          }, 2000);

        }
      } else if (isiOS) {
        _location.href = downloadUrl.universalLink;
      }
    }
  }
}



export default {
  install: function (Vue) {
    // ajax(Vue);  //通用

    for (let key in globalMethodsObj) {
      let item = globalMethodsObj[key];
      item.call(Vue, Vue);
    }

  }
}
