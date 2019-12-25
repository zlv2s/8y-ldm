<template>
  <div class="outer-container">
    <a-row>
      <a-col :span="24">
        <Header />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="0" :md="8" :lg="8"></a-col>
      <a-col :xs="24" :md="8" :lg="8">
        <Board />
      </a-col>
      <a-col :xs="0" :md="8" :lg="8">
        <a-card :bordered="false" size="small">
          <Tool />
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <p class="info">
          <span id="busuanzi_container_site_pv" style="display:none">
            <a-icon type="eye" />
            &nbsp;<span id="busuanzi_value_site_pv"></span>
          </span>
        </p>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Board from '@/components/Board.vue'
import Tool from '@/components/Tool.vue'
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
    Board,
    Tool
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
