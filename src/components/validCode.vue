<template>
  <div>
    <div
      class="theme-color p-h-20 f30 send-tel-code"
      @click.stop="openGetCodeFrame();"
    >{{remindCountDown ? remindCountDown + 's' : '获取验证码' }}</div>
    <transition
      enter-active-class="animated faster fadeIn"
      leave-active-class="animated faster fadeOut"
    >
      <div class="position-fixed z1000 m-40 p-30 valid-modules" v-if="renderValidCode">
        <h4 class="p-b-30">滑动验证</h4>
        <div class="row input-code-bar">
          <verifityCode @confirmSucces="getCodeByPost();"></verifityCode>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import validValue from "@/assets/js/validValue.js";
import verifityCode from "@/components/verifityCode.vue";

export default {
  name: "validCode",
  components: {
    verifityCode
  },
  props: {
    mobile: {},
    codeType: {}
  },
  data() {
    return {
      codeList: [],
      inputCode: "",
      renderValidCode: false,
      remindCountDown: 0
    };
  },
  mounted() {
    this.setGetCodeType();
  },
  methods: {
    //设置获取验证码的类型
    setGetCodeType() {
      switch (
        this.codeType //获取验证码的类型
      ) {
        case "register":
          this.urlKey = "getMobileCode_signUpCode";
          break;
        case "changeLoginPassword":
          this.urlKey = "getMobileCode_changeLoginPassword";
          break;
      }
    },

    //打开获取验证码
    openGetCodeFrame() {
      if (this.remindCountDown) {
        return false;
      }

      const mobile = this.mobile;

      if (!mobile) {
        this.$toast({
          msg: "请输入手机号"
        });
        return false;
      }
      if (!validValue.isMobile(mobile)) {
        this.$toast({
          msg: "手机号码格式有误"
        });
        return false;
      }

      this.renderValidCode = true;
      this.$showMask({
        closeMaskCb: () => {
          this.renderValidCode = false;
        }
      });
    },

    //验证成功
    getCodeByPost() {


      //开始倒计时
      this.remindCountDown = 30; //设置为30秒
      this.remindCountDown -= 1;

      this.countDownTimer = setInterval(() => {
        this.remindCountDown
          ? (this.remindCountDown -= 1)
          : this.initGetMobileCode();
      }, 1000);

      this.$ajax({
        urlKey: this.urlKey,
        post: {
          mobile: this.mobile
        },
        success: ret => {
          if (ret.code === 1) {
            this.$toast({
              msg: ret.msg || "操作成功"
            });

            this.renderValidCode = false;
            this.$hideMask();
          } else {
            this.initGetMobileCode();
          }
        },
        fail: () => {
          this.initGetMobileCode();
        }
      });
    },

    //初始化倒计时
    initGetMobileCode() {
      this.remindCountDown = "";
      clearInterval(this.countDownTimer);
    }
  }
};
</script>

<style>
.valid-modules {
  left: 1rem;
  right: 1rem;
  height: auto;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  -webkit-transform: translate3d(0, -50%, 0);
  border-radius: 0.4rem;
  background-color: #fff;
}
.valid-modules .input-code-bar {
  border-top: thin solid #f4f4f4;
  border-bottom: thin solid #f4f4f4;
}
.valid-modules .code-box {
  height: 2rem;
  background-color: #f4f4f4;
  border-radius: 0.4rem;
}
</style>