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
      <a href="/func/time" target="_blank" class="time-board">
        <i class="iconfont icon-shizhong"></i>
      </a>
    </div>
    <div class="utc-wrapper">
      <i
        class="iconfont icon-dengluyonghuming"
        v-if="!user"
        @click="openLoginModal"
      />
      <a-avatar
        size="small"
        v-else
        style="color: #f56a00; backgroundColor: #fde3cf"
        >{{ avatarName }}</a-avatar
      >
      <div class="utc-time" v-text="utc"></div>
      <div class="utc-time2" v-text="utc2"></div>
    </div>
  </div>
</template>

<script>
import { time2UTC, time2UTC2 } from '@/utils'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      utc: time2UTC(Date.now()),
      utc2: time2UTC2(Date.now())
    }
  },

  computed: {
    ...mapState('authentication', ['user']),
    avatarName() {
      if (this.user) {
        return this.user.username.substr(0, 1).toUpperCase()
      }
      return 'X'
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
    ...mapActions('global', ['setLoginShow']),
    getUTCTime() {
      this.utc = time2UTC(Date.now())
      this.utc2 = time2UTC2(Date.now())
    },
    openLoginModal() {
      this.setLoginShow(true)
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

  .utc-wrapper {
    display: flex;
    align-items: center;
    color: #1890ff;
    .utc-time,
    .utc-time2 {
      vertical-align: middle;
      color: #1890ff;
      height: 43px;
      line-height: 43px;
      text-align: center;
    }
    i {
      cursor: pointer;
    }
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
      a {
        margin-left: 6px;
      }
    }
    .utc-wrapper {
      .utc-time {
        font-size: 1rem;
        margin-left: 10px;
      }
      .utc-time2 {
        display: none;
      }
    }
  }
  .time-board {
    display: none;
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
      margin-left: -4%;
    }
    .utc-wrapper {
      .utc-time {
        display: none;
      }
      .utc-time2 {
        font-size: 0.7rem;
        margin-left: 10px;
      }
    }
  }
}
</style>
