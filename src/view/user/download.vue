<template>
  <div class="download-page">
    <div class="fixed-center w-100">
      <div class="com-btn m-50" @click.stop="$openToApp();">打开得宝购app</div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.download-page .download-bg {
  z-index: -1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.download-page .open-btn {
  line-height: 2;
  padding: 0 1rem;
  background-color: #fe7b14;
  border-radius: 0.4rem;
  font-size: 0.75rem;
  color: #fff;
}
</style>