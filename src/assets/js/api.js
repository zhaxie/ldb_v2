export default {
    urlObj: {
        getGoodsDetailsByID: '/index.php/Home/goods/goodsInfo',
        getGoodsCommentByID: '/index.php/Home/goods/commentList',
        getMobileCode_signUpCode: '/index.php/Home/user/send_signup_code',          //注册验证码
        getMobileCode_changeLoginPassword: '/index.php/Home/user/findPassword',     //获取验证码-修改登录密码
        login: '/index.php/Home/user/login',
        getServiceAgreement: '/index.php/Home/user/serviceAgreement',               //获取服务协议
        signUp: '/index.php/Home/user/signup',                                      //注册
        bindParentID: '/index.php/Home/user/bind_parent',                            //绑定上级
        submitChangeLoginPassword: '/index.php/Home/user/resetPassword',            //提交修改登录密码
        getUserInfo: '/index.php/Home/user/userInfo',            //获取用户信息
    }
}