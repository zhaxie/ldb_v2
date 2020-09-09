      this.$ajax({
        urlKey: "login",
        post: {
          username: username, //username	是	string	用户名/手机号码
          password_summary: hex_md5(username + hex_md5(password)), //password_summary	是	string	密码摘要：md5(username+md5(password))
          parent_id: this.$route.query.parentID || '' //parent_id	否	integer	邀请人id
        },
        success: ret => {
          if (ret.code === 1) {
            var oData = ret.result;
            
          }
        }
      });