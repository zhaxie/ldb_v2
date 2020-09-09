// edit By cxx
// 使用手册:

this.$showMask({
  closeMaskCb: () => {},
  removeEvt_clickMask: false  //是否可点击遮罩 可选值：true || false;  默认值：false
});

<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div class="mask" @click.stop="hideMask" v-if="renderMaskBg"></div>
  </transition>
</template>

<script>
export default {
  name: "maskBg",
  data() {
    return {
      renderMaskBg: false
    };
  },
  methods: {
    showMask(options) {
      this.renderMaskBg = true;
      if(options){
        options.closeMaskCb &&
        (this.closeMaskCb = options.closeMaskCb);

        this.removeEvt_clickMask = options.removeEvt_clickMask ? true : false;
      }
    },
    hideMask() {
      if(this.removeEvt_clickMask) return false;

      this.renderMaskBg = false;
      this.closeMaskCb && this.closeMaskCb();
    }
  }
};
</script>

<style>
/* // 遮罩 */
.mask {
  position: fixed;
  z-index: 200;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>