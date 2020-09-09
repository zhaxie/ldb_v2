<template>
  <div class="position-fixed p-30 confirm-modules" v-if="renderConfirm">
    <h4 class="m-b-50 m-t-20 text-center">{{title}}</h4>
    <ul class="d-flex f30 text-center btn-list">
      <li class="col m-r-30 btn theme-color cancel" @click.stop="$hideMask()">取消</li>
      <li class="col m-r-30 theme-bg btn color-f" @click.stop="confirm()">确定</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      renderConfirm: false,
      title: ""
    };
  },
  methods: {
    showConfirm(options) {
      this.renderConfirm = true;
      this.title = options.title;
      this.confirmCb = options.confirmCb;

      this.$showMask({
        closeMaskCb: () => {
            this.cancelConfirm();
        }
      });
    },
    cancelConfirm() {
      this.renderConfirm = false;
    },
    confirm() {
      this.cancelConfirm();
      this.confirmCb();
    }
  }
};
</script>

<style>
.confirm-modules {
  z-index: 1040;
  left: 3rem;
  right: 3rem;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  -webkit-transform: translate3d(0, -50%, 0);
  background-color: #fff;
  border-radius: 0.4rem;
}
.confirm-modules .btn-list {
  margin-right: -0.75rem;
}
.confirm-modules .btn-list .btn.cancel {
  background-color: rgba(243, 156, 54, 0.2);
}
.confirm-modules .btn-list .btn {
  line-height: 1.8rem;
  border-radius: 0.4rem;
}
</style>