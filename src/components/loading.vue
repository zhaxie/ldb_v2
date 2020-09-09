<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
    >
  <div v-if="renderLoading">
    <div class="fixed-center">
      <div class="icon-loading">
        <img src="~@/assets/icon/icon-loading.png" alt class="imgCover" />
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      renderLoading: false
    };
  },
  methods: {
    showLoading(options) {
      this.renderLoading = true;

      if (options.showMask) {
        this.$showMask({
          removeEvt_clickMask: true,
        });
        this.shownMask = true;
      }

    },
    hideLoading(options) {
      options.hideMask && this.shownMask && this.$hideMask();
      this.renderLoading = false;
    }
  }
};
</script>

<style>
@keyframes loading {
  from {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

.icon-loading {
  width: 2rem;
  height: 2rem;
  animation: loading 1.2s infinite linear;
  -webkit-animation: loading 1.2s infinite linear;
}
</style>