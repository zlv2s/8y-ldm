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
            <li><a href="https://www.flightradar24.com/" target="_blank">Flightradar24</a></li>
            <li><a href="https://flightadsb.variflight.com/" target="_blank">Flight ADSB</a></li>
            <li><a href="https://www.aircn.org/toolbox/metar.php" target="_blank">机场气象报文解析</a></li>
        </ul>
       </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
import { getFltStatus } from '@/api'

export default {
  name: 'home',
  components: {
    Header,
    Board
  },
  mounted() {
    getFltStatus('rpc7937', '8y823').then(res => {
      console.log({ res })
      if (res.code === 200) {
        console.log(res.data)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 8px;
}
</style>