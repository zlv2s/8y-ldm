<template>
  <div class="outer-container">
    <a-row>
      <a-col :span="24">
        <Header />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="0" :lg="8"></a-col>
      <a-col :xs="24" :lg="8">
        <Board />
      </a-col>
      <a-col :xs="0" :lg="8">
        <a-card :bordered="false" size="small">
          <h2>Tools</h2>
          <ul>
            <li><a href="/weather">Terminal Aerodrome Forecasts (TAFs)</a></li>
            <li>
              <a href="https://www.flightradar24.com/" target="_blank"
                >Flightradar24</a
              >
            </li>
            <li>
              <a href="https://flightadsb.variflight.com/" target="_blank"
                >Flight ADSB</a
              >
            </li>
            <li>
              <a href="https://www.aircn.org/toolbox/metar.php" target="_blank"
                >机场气象报文解析</a
              >
            </li>
            <li>
              <a href="https://www.planespotters.net/search?" target="_blank"
                >Aircraft Information Inquiry</a
              >
            </li>
            <li>
              <a
                href="https://www.airfleets.net/recherche/search.htm"
                target="_blank"
                >Aircraft Information Inquiry(2)</a
              >
            </li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <p class="info">
          <span id="busuanzi_container_site_pv" style='display:none'>
            Site been viewed <span id="busuanzi_value_site_pv"></span> times
          </span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import { getFltStatus } from '@/api'
// import { getCookie, setCookie, fixDate } from '@/utils'

export default {
  name: 'home',
  data() {
    return {
      info: ''
    }
  },
  components: {
    Header,
    Board
  },
  mounted() {
    getFltStatus('rpc7937', '8y823').then(res => {
      if (res.code === 200) {
        // console.log(res.data)
        // todo
      }
    })
    // this.pvTj()
  },
  methods: {
    // pvTj() {
    //   let now = new Date()
    //   fixDate(now)
    //   now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
    //   let visits = getCookie('counter')
    //   if (!visits) {
    //     visits = 1
    //   } else {
    //     visits = parseInt(visits) + 1
    //   }
    //   setCookie('counter', visits, now)
    //   this.info = `您是到访的第${visits}位用户！`
    // }
  }
}
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 8px;
  .info {
    text-align: center;
    font-size: 12px;
  }
}
</style>
