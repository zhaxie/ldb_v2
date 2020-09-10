<template>
  <div class="personData">
    <ul class="p-b-50 data-list">
      <li class="row p-h-30 p-v-10 input-bar">
        <div class="col-3">手机号</div>
        <input
          type="number"
          class="col"
          placeholder="请输入手机号"
          maxlength="11"
          v-model.lazy.trim="mobile"
        />
      </li>
      <li class="row p-h-30 p-v-10 input-bar">
        <div class="col-3">验证码</div>
        <input
          type="number"
          class="col"
          placeholder="请输入验证码"
          maxlength="6"
          v-model.lazy.trim="mobileCode"
        />
        <!-- 获取验证码 -->
        <valid-code :mobile="mobile" :codeType="'changeLoginPassword'"></valid-code>
      </li>
      <li class="row p-h-30 p-v-10 input-bar">
        <div class="col-3">密码</div>
        <input type="password" class="col" placeholder="请输入密码" v-model.lazy.trim="password" />
      </li>
      <li class="row p-h-30 p-v-10 input-bar">
        <div class="col-3">确认密码</div>
        <input
          type="password"
          class="col"
          placeholder="请再次输入密码"
          v-model.lazy.trim="reInputPassword"
        />
      </li>
    </ul>
    <div class="m-h-30 m-v-50 com-btn" @click.stop="changePassword();">修改</div>
  </div>
</template>

<script>
import validCode from "@/components/validCode.vue";
import validValue from "@/assets/js/validValue.js";

export default {
  components: {
    validCode
  },
  data() {
    return {
      mobile: "",
      code: "",
      password: "",
      reInputPassword: "",
      mobileCode: ""
    };
  },
  mounted() {
    //点击entry键聚焦到下一个input
    this.$nextTick(() => {
      this.$focusOnNextInputByEntry({
        onSubmit: () => {
          this.doLogin();
        }
      });
    });
  },
  methods: {
    changePassword() {
      try {
        if (this.isSubmitted_changePassword === true) {
          throw '已发送，请稍后';
        }

        const mobile = this.mobile;
        const mobileCode = this.mobileCode;
        const password = this.password;
        const reInputPassword = this.reInputPassword;

        if (!mobile) {
          throw '请输入手机号';
        }

        if (!validValue.isMobile(mobile)) {
          throw '手机号码格式有误';
        }

        if (!mobileCode || mobileCode.length !== 6) {
          throw '请输入6位手机验证码';
        }

        if (!password) {
          throw '请输入密码';
        }

        if (!reInputPassword) {
          throw '请再次输入密码';
        }

        if (reInputPassword !== password) {
          throw '两次输入的密码不一致';
        }

        this.isSubmitted_changePassword = true;

        this.$ajax({
          urlKey: "submitChangeLoginPassword",
          post: {
            mobile: mobile,
            code: mobileCode,
            password: password,
            repassword: reInputPassword
          },
          success: ret => {
            if (ret.code === 1) {
              this.$router.go(-1);
            } else {
              this.isSubmitted_changePassword = false;
            }
          },
          fail: () => {
            this.isSubmitted_changePassword = false;
          }
        });
      } catch (error) {
        this.$toast({
          msg: error
        });
      }
    }
  }
};
</script>

<style>
.personData .header-img {
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  overflow: hidden;
}

.personData .header-img::after {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  content: "";
  display: block;
  background-color: rgba(0, 0, 0, 0.2);
}

.personData .header-img .icon-camera {
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 2rem;
  height: 2rem;
}

.personData .data-list .input-bar {
  border-bottom: 1px solid #f4f4f4;
  font-size: 0.75rem;
  color: #333;
}

.personData .data-list .input-bar .sex {
  line-height: 2.2rem;
}

.personData .data-list .input-bar .com-choose-box {
  width: 0.8rem;
  height: 0.8rem;
}

.personData .data-list .input-bar .send-tel-code {
  min-width: 5rem;
  line-height: 1.6rem;
  border: 1px solid #f49f27;
  border-radius: 0.2rem;
  text-align: center;
}
</style>