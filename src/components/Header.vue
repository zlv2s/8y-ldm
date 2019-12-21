<template>
  <div class="title">
    <a href="http://panpacificair.com/" target="_blank">
      <img src="../assets/logo.png" />
    </a>
    <h1>MVT/LDM GENERATOR(V.1.3)</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;

  @media (min-width: 750px) {
    a {
      display: inline-block;
      height: 40px;
      position: absolute;
      left: 16%;
      transform: translateX(-50%);
      img {
        height: 40px;
      }
    }
  }

  h1 {
    text-align: center;
  }
}

@media (max-width: 750px){
  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      height: 30px;
    }
  }
}
</style>