import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'download',
      component: require('@/view/user/download').default
    },
    {
      path: '/goods/goodsDetails',
      name: 'goodsDetails',
      component: require('@/view/goods/goodsDetails').default
    },
    {
      path: '/user/loginOrRegister',
      name: 'loginOrRegister',
      component: require('@/view/user/loginOrRegister').default,
    },
    {
      path: '/user/bindParentID',
      name: 'bindParentID',
      component: require('@/view/user/bindParentID').default,
    },
    {
      path: '/user/download',
      name: 'download',
      component: require('@/view/user/download').default,
    },
    {
      path: '/user/changePassword',
      name: 'changePassword',
      component: require('@/view/user/changePassword').default,
    },
    {
      path: '/other/introduceTxtPage',
      name: 'introduceTxtPage',
      component: require('@/view/other/introduceTxtPage').default,
    },
    {
      path: '/other/privacyAgreement',
      name: 'privacyAgreement',
      component: require('@/view/other/privacyAgreement').default,
    },
  ]
});
