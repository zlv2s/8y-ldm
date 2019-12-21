<template>
  <div class="f404">
    <img src="http://img.panpacificair.com/images/8Y/slide/slider_51_2.jpg" />
    <h1>404 Not Found</h1>
    <h2>沒有找到你要的内容！</h2>
    <a-button @click="backHome" type="primary">返回首页</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    backHome() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.f404 {
  text-align: center;
  img {
    width: 100%;
  }
  h1 {
    font-size: 60px;
    margin: 40px 0 20px;
    text-transform: uppercase;
  }
  h2 {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
</style>
