<template>
  <transition
    enter-active-class="animated faster fadeIn"
    leave-active-class="animated faster fadeOut"
  >
    <div class="fixed-center" v-if="msg !== ''">
      <p class="com-toast">{{msg}}</p>
    </div>
  </transition>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      msg: ""
    };
  },
  mounted() {},
  methods: {
    toast(options) {
      this.msg = options.msg || 'toast的参数有误';

      clearTimeout(this.clearMsgTimer);
      this.clearMsgTimer = setTimeout(() => this.msg = "", options.duration || 1000);
    }
  }
};
</script>

<style>
.com-toast {
  width: auto;
  right: initial;
  line-height: 2.25;
  padding: 0 0.75rem;
  border-radius: 0.4rem;
  background-color: rgba(0, 0, 0, 0.8);
  font-size: 0.75rem;
  color: #fff;
}
</style>