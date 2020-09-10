<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div
      class="position-fixed download-maskTips-modules"
      v-if="isRenderPage"
      @click="hideDownLoadTips();"
    >
      <div class="position-fixed z1000 animated bounceIn center-content">
        <img src="@/assets/img/openAppTips.png" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      isRenderPage: false
    };
  },
  methods: {
    showDownLoadTips(options) {
      this.isRenderPage = true;
    },
    hideDownLoadTips(options) {
      this.isRenderPage = false;
    }
  }
};
</script>

<style>
.download-maskTips-modules {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1200;
  background-color: rgba(0, 0, 0, 0.8);
}

.download-maskTips-modules .center-content {
  left: 1rem;
  right: 0;
  top: 0;
}
</style>
