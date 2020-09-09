<template>
  <div>
    <ul class="row p-h-30 p-v-20 open-bar-tips" ref="openAppDom">
      <li class="logo">
        <img src="~@/assets/icon/icon-logo.png" alt class="imgCover" />
      </li>
      <li class="col p-h-20">
        <p class="title">前往App体验更多功能</p>
        <p class="txt">得宝购，放心购</p>
      </li>
      <li class="p-h-20 p-v-10 open-btn" @click.stop="$openToApp();">打开APP</li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* 顶部打开app提示条 */
.open-bar-tips {
  /* top: 0;
    z-index: 100; */
  background-color: rgb(51, 51, 51);
}
.open-bar-tips .logo {
  width: 2.25rem;
  height: 2.25rem;
}
.open-bar-tips .title {
  color: #fff;
}
.open-bar-tips .txt {
  font-size: 0.5rem;
  color: #fff;
}
.open-bar-tips .open-btn {
  border-radius: 0.2rem;
  background-color: #fe7b14;
  font-size: 0.6rem;
  color: #fff;
}
</style>