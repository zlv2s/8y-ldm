<template>
  <div class="outer-container">
    <a-row>
      <a-col :span="24">
        <Header />
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="0" :md="8" :lg="8">
        <Info />
      </a-col>
      <a-col :xs="24" :md="8" :lg="8">
        <Board />
      </a-col>
      <a-col :xs="0" :md="8" :lg="8">
        <Tool />
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24">
        <Footer />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Board from '@/components/Board.vue'
import Tool from '@/components/Tool.vue'
import Info from '@/components/Info.vue'
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
    Footer,
    Board,
    Tool,
    Info
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
}
</style>
