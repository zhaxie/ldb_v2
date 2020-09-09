<template>
  <div class="fixed-center w-100" v-if="isBindFail">
    <div class="m-50 com-btn" @click.stop="bindParentID();">重新绑定</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBindFail: false
    };
  },
  mounted() {
    this.bindParentID();
  },
  methods: {
    bindParentID() {
      if (this.isSubmitted_bind === true) {
        this.$toast({
          msg: "没有parentID"
        });
        return false;
      }

      this.isSubmitted_bind = true;

      this.$ajax({
        urlKey: "bindParentID",
        post: {
          parent_id: this.$route.query.parentID || "" //parent_id	否	integer	邀请人id
        },
        success: ret => {
          console.log(ret)
          if (ret.code === 1) {
            
            this.$router.replace("/user/download");
            this.$toast({
              msg: ret.msg
            });

          } else {
            this.isSubmitted_bind = false;
            this.isBindFail = true;
          }
        },
        fail: () => {
          this.isSubmitted_bind = false;
        }
      });
    }
  }
};
</script>

<style>
</style>