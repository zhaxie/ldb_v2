<template>
  <div id="app">
    <topDownloadBar v-if="showTopDownloadBar" />
    <router-view @hideTopBar="hideTopBar()" />
  </div>
</template>

<script>
import topDownloadBar from "@/components/topDownloadBar.vue";
import {openToApp} from '@/assets/js/ldb-main.js'; 

export default {
  name: "App",
  components: {
    topDownloadBar,
  },
  data() {
    return {
      showTopDownloadBar: true,
    };
  },
  mounted(){
    openToApp.call(this);
  },
  methods: {
    hideTopBar(){
      this.showTopDownloadBar = false;
    },
    addEvt_inputFocusAndBlur() {
      var $inputList = document.querySelectorAll("input");

      if ($inputList.length > 0) {
        $inputList.forEach((item, index) => {
          // item.addEventListener("focus", this.setPageScrollTop);
          item.addEventListener("blur", () => this.pageScrollTo());
        });
      }
      console.log($inputList);
    },

    //设置滚动条的位置，用于blur之后滚动到指定位置
    setPageScrollTop() {
      const _document = document;

      this.scrollTop =
        (_document.documentElement && _document.documentElement.scrollTop) ||
        (_document.body && _document.body.scrollTop);
      console.info("滚动条的高度scrollTop", this.scrollTop);
    },

    //页面滚动到指定位置
    pageScrollTo() {
      console.log("input blur、textarea失焦 页面不挂起来");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  },
  watch: {
    //监听路由变化
    $route: {
      handler(val, oldVal) {
        //页面加载完成后执行
        this.$nextTick(() => {
          this.addEvt_inputFocusAndBlur(); //监听页面的input聚焦和失焦，用于解决ios输入之后页面被挂起的问题
        });

        //判断是否显示顶部的下载条
        if (val.name !== "download") {
          this.showTopDownloadBar !== true && (this.showTopDownloadBar = true);
        }else{
          this.showTopDownloadBar = false;
        }

      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style>
</style>
