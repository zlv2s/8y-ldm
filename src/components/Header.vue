<template>
  <div class="header-info">
    <a class="logo" href="http://panpacificair.com/" target="_blank">
      <img src="../assets/logo.png" />
    </a>
    <div class="hd-tool">
      <a href="https://www.flightradar24.com/" target="_blank">
        <i class="iconfont icon-iconset0398"></i>
      </a>
      <a href="https://pilotweb.nas.faa.gov/PilotWeb/" target="_blank">
        <i class="iconfont icon-tongzhitonggao"></i>
      </a>
      <a href="https://www.planespotters.net/search" target="_blank">
        <i class="iconfont icon-fj_qifei_a"></i>
      </a>
    </div>
    <div class="utc-time" v-text="utc"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      utc: new Date().toUTCString().replace('GMT', '(UTC)')
    }
  },
  created() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
    this.timerId = setInterval(() => {
      this.getUTCTime()
    }, 1000)
  },
  methods: {
    getUTCTime() {
      this.utc = new Date().toUTCString().replace('GMT', '(UTC)')
    }
  }
}
</script>

<style lang="scss" scoped>
.header-info {
  background: #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;

  .logo {
    display: block;
    img {
      height: 100%;
    }
  }

  .hd-tool {
    a {
      margin-right: 4px;
    }
  }

  .utc-time {
    vertical-align: middle;
    color: #2870df;
    height: 43px;
    line-height: 43px;
    text-align: center;
  }
}

/* laptop */
@media (min-width: 750px) {
  .header-info {
    padding: 15px;
    .logo {
      height: 30px;
    }
    .hd-tool {
      margin-left: -60%;
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
    .hd-tool {
      margin-left: -8%;
    }
    .utc-time {
      font-size: 0.7rem;
    }
  }
}
</style>