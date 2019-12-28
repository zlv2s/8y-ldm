<template>
  <div class="header-info">
    <a class="logo" href="http://panpacificair.com/" target="_blank">
      <img src="../assets/logo.png" />
    </a>
    <div class="hd-tool">
      <a href="https://www.flightradar24.com/12.23,121.75/8" target="_blank">
        <i class="iconfont icon-iconset0398"></i>
      </a>
      <a href="https://www.planespotters.net/search" target="_blank">
        <i class="iconfont icon-fj_qifei_a"></i
      ></a>
    </div>
    <div class="utc-time" v-text="utc"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utc: ''
    }
  },
  created() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = setInterval(() => {
      this.utcTime()
    }, 1000)
  },
  methods: {
    utcTime() {
      this.utc = new Date().toUTCString().replace('GMT', '(UTC)')
    }
  }
}
</script>

<style lang="scss" scoped>
.utc-time {
  vertical-align: middle;
  color: #2870df;
  height: 43px;
  line-height: 43px;
  text-align: center;
  /* margin: 10px; */
}
.header-info {
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;

  .hd-tool {
    a {
      margin-right: 4px;
    }
  }
}

.logo {
  display: block;
  img {
    height: 100%;
  }
}

/* laptop */
@media (min-width: 750px) {
  .header-info {
    padding: 15px;
    justify-content: space-around;
    .logo {
      height: 30px;
    }
    .utc-time {
      font-size: 1rem;
    }
  }
}

/* handphone */
@media (max-width: 750px) {
  .header-info {
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 10px;
    .logo {
      height: 20px;
    }
    .utc-time {
      font-size: 0.6rem;
    }
  }
}
</style>