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

  //安卓机打开app的遮罩提示
  andriodOpenAppMaskTips(Vue) {
    const openAppMaskTips = Vue.extend(require('@/components/openAppMaskTips.vue').default);
    let instance_openAppMaskTips = new openAppMaskTips();

    instance_openAppMaskTips.$mount(document.createElement('div'));
    document.body.appendChild(instance_openAppMaskTips.$el);

    Vue.prototype.$showDownLoadTips = (options) => { instance_openAppMaskTips.showDownLoadTips(options) };
  },

  //点击entry键聚焦到下一个input
  focusOnNextInputByEntry(Vue) {
    var _currentFoucsInputIndex;

    Vue.prototype.$focusOnNextInputByEntry = (options) => {
      let $inputDomList = document.querySelectorAll("input");
      let $inputDomListLen = $inputDomList.length;

      console.info("inputDomList", $inputDomList);
      console.info("inputDomList", $inputDomList[0]);

      _currentFoucsInputIndex = 0;

      for (let i = 0; i < $inputDomListLen; i++) {
        let item = $inputDomList[i];

        item.addEventListener("focus", () => {
          _currentFoucsInputIndex = i;
        });
      }

      document.onkeydown = (ev) => {
        var event = ev || event;

        if (event.keyCode == 13) {
          var nextFocusIndex = _currentFoucsInputIndex + 1;

          console.info('nextFocusIndex', nextFocusIndex);
          console.info('$inputDomListLen', $inputDomListLen);

          if ($inputDomListLen !== nextFocusIndex) {
            $inputDomList[nextFocusIndex].focus();
          } else {
            options.onSubmit && options.onSubmit();
          }
        }
      };
    };

  }
}

export default {
  install: function (Vue) {
    ajax(Vue);  //通用

    for (let key in globalMethodsObj) {
      let item = globalMethodsObj[key];
      item.call(Vue, Vue);
    }
  }
}
