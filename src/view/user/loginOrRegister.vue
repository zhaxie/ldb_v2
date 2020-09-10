<template>
  <div class="login-page">
    <div class="fixed-top" style="z-index: -1; opacity: 0;">
      <div class="p-h-40 p-v-30 f30">关闭</div>
    </div>
    <div class="icon-logo">
      <img src="~@/assets/icon/icon-com-logo.png" alt="logo" class="imgCover" />
    </div>
    <div class="m-h-40">
      <!-- 通用：input输入条 -->
      <div class="p-v-10 com-input-bar">
        <input type="number" placeholder="请输入手机号" v-model.lazy.trim="username" maxlength="11" />
      </div>
      <!-- 通用：input输入条 -->
      <div class="d-flex align-items-center p-v-10 com-input-bar">
        <input
          class="col"
          :type="!isVisiblePassword ? 'password' : 'text'"
          placeholder="请输入密码"
          v-model.lazy.trim="password"
        />
        <div
          class="iconfont"
          :class="!isVisiblePassword ? 'icon-unLook' : 'icon-look'"
          @click="isVisiblePassword = !isVisiblePassword"
        ></div>
      </div>
      <!-- 登录专用 -->
      <div v-if="pageType === ''">
        <div class="row m-t-20 f30">
          <div class="row col p-v-30" @click.stop="rememberUsername();">
            <div class="m-r-20 com-choose-box" :class="isRememberUsername && 'active bounceIn'"></div>
            <span>记住手机号</span>
          </div>
          <div class="p-v-30 color-9" @click.stop="$router.push('/user/changePassword')">忘记密码?</div>
        </div>
      </div>
      <!-- 注册专用 -->
      <div v-if="pageType === 1">
        <!-- 通用：input输入条 -->
        <div class="d-flex align-items-center p-v-10 com-input-bar">
          <input
            class="col"
            :type="!isVisiblePassword ? 'password' : 'text'"
            placeholder="请确认输入的密码"
            v-model.lazy.trim="reInputPassword"
          />
        </div>

        <!-- 通用：input输入条 -->
        <div class="row p-v-10 com-input-bar">
          <input
            type="number"
            class="col"
            placeholder="请输入验证码"
            maxlength="6"
            v-model.lazy.trim="mobileValidCode"
          />
          <!-- 获取验证码 -->
          <valid-code :mobile="username" :codeType="'register'"></valid-code>
        </div>
        <div class="row m-t-20 f30">
          <div class="row" @click.stop="switchAggrement();">
            <div class="m-r-20 com-choose-box" :class="isAgreeAgreement && 'active bounceIn'"></div>
            <span>我已阅读并同意</span>
          </div>
          <span
            class="p-v-30 m-l-10 theme-color"
            @click.stop="$router.push('/other/introduceTxtPage?pageType=2');"
          >《服务协议》</span>
          <span
            class="p-v-30 theme-color"
            @click.stop="$router.push('/other/introduceTxtPage?pageType=3');"
          >《隐私协议》</span>
        </div>
      </div>
      <div class="m-t-20 com-btn" @click.stop="doLogin();">{{pageType === '' ? '登录' : '注册'}}</div>
      <div class="row">
        <span class="color-9">{{pageType === '' ? '还没账号?' : '已有账号'}}</span>
        <span
          class="p-v-40 p-h-30 theme-color"
          @click.stop="setPageType(true)"
        >{{pageType === '' ? '去注册' : '去登录'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import validCode from "@/components/validCode.vue";
import md5 from "js-md5";
import validValue from "@/assets/js/validValue.js";

export default {
  components: {
    validCode
  },
  data() {
    return {
      username: "",
      password: "",
      msg: "向右滑",
      imgList: [
        "~@/assets/icon/icon-com-logo.png",
        "~@/assets/icon/icon-com-logo.png"
      ],
      isRememberUsername: true,
      pageType: "", //1:注册 default:登录
      isAgreeAgreement: false,
      mobileValidCode: "",
      isVisiblePassword: false,
      reInputPassword: ""
    };
  },
  async mounted() {
    //回填用户名
    await this.reInputUserName();
    await this.setPageType();
  },
  methods: {
    // 设置页面的类型：resigter注册： defalut: 登录
    setPageType(isHandleSwitchBtn) {
      let query = this.$route.query;
      let pageType;

      console.info("来登录的参数query", query);

      if (isHandleSwitchBtn) {
        //是点击切换注册或登录的按钮
        pageType = this.pageType === 1 ? "" : 1;
      } else {
        pageType = query.pageType = Number(query.pageType) || "";
      }

      switch (pageType) {
        case 1:
          query.urlKey_submit = "signUp";
          break;

        default:
          query.urlKey_submit = "login";
          !isHandleSwitchBtn &&
            this.$toast({
              msg: "请先登录"
            });
          break;
      }

      this.pageType = pageType;

      //点击entry键聚焦到下一个input
      this.$nextTick(() => {
        this.$focusOnNextInputByEntry({
          onSubmit: () => {
            this.doLogin();
          }
        });
      });
    },
    //回填用户名
    reInputUserName() {
      const local_username = localStorage.getItem("username");

      console.info("local_username", local_username);

      switch (local_username) {
        case null:
          this.isRememberUsername = true;
          break;
        case "":
          this.isRememberUsername = false;
          break;
        default:
          this.isRememberUsername = true;
          this.username = local_username;
          break;
      }
    },

    //切换是否同意
    switchAggrement() {
      this.isAgreeAgreement = !this.isAgreeAgreement;
    },

    //登录
    doLogin() {
      try {
        const parentID = this.$route.query.parentID;

        const username = this.username;
        const password = this.password;
        const reInputPassword = this.reInputPassword;

        if (!username) {
          throw "请输入手机号";
        }

        if (!validValue.isMobile(username)) {
          throw "手机号码格式有误";
        }

        if (!password) {
          throw "请输入密码";
        }

        switch (
          this.pageType //1:注册 default：登录
        ) {
          case 1:
            const mobileValidCode = this.mobileValidCode;

            if (!reInputPassword) {
              throw "请输入确认密码";
            }

            if (password !== reInputPassword) {
              throw "两次输入的密码不一致";
            }

            if (!mobileValidCode) {
              throw "请输入短信验证码";
            }

            if (!this.isAgreeAgreement) {
              throw "请阅读并同意《注册协议》和《隐私协议》";
            }

            this.postLogin({
              mobile: username, //mobile	是	string	手机号
              username,
              password: password, //password	是	string	密码
              code: mobileValidCode, //code	是	string	短信验证码
              parent_id: parentID || "" //parent_id	否	integer	邀请人id
            });

            break;
          default:
            this.postLogin({
              username: username, //username	是	string	用户名/手机号码
              password_summary: md5(username + md5(password)), //password_summary	是	string	密码摘要：md5(username+md5(password))
              parent_id: parentID || "" //parent_id	否	integer	邀请人id
            });
            break;
        }
      } catch (error) {
        this.$toast({
          msg: error
        });
      }
    },

    //请求登录
    postLogin(post) {
      if (this.isSubmitting_login === true) {
        this.$toast({
          msg: "登录中，请稍后"
        });
        return false;
      }
      this.isSubmitting_login = true;

      let query = this.$route.query;

      this.$ajax({
        urlKey: query.urlKey_submit,
        post: post,
        success: ret => {
          if (ret.code === 1) {
            //登录模式
            if (!query.pageType) {
              const isRememberUsername = this.isRememberUsername;

              if (isRememberUsername) {
                localStorage.setItem("username", post.username);
              } else {
                localStorage.setItem("username", "");
              }
            }

            this.$toast({
              msg: ret.msg || "操作成功"
            });

            //绑定上下级关系的就直接跳转到下载app页面
            if (post.parent_id) {
              this.$router.replace({
                name: "download"
              });
            } else {
              this.$router.go(-1);
            }

            localStorage.setItem("token", ret.result.token);
          } else {
            this.isSubmitting_login = false;
          }
        },
        fail: () => {
          this.isSubmitting_login = false;
        }
      });
    },

    //记住用户名
    rememberUsername() {
      const isRememberUsername = (this.isRememberUsername = !this
        .isRememberUsername);

      if (isRememberUsername === false) {
        localStorage.setItem("username", "");
      }
    }
  }
};
</script>

<style lang="css">
.slide-verify-slider {
  margin-top: 0 !important;
}
/* --------------------
  login-page 登录
------------------------- */

.login-page .icon-logo {
  margin: 3rem auto 2rem;
  width: 5rem;
  height: 5rem;
}

.login-page .login-bnt-list .login-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
}
</style>