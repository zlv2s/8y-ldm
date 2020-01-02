<template>
  <div class="outer-container">
    <a-row>
      <a-col :span="24">
        <Header />
      </a-col>
    </a-row>
    <div class="content">
      <a-row>
        <a-col :xs="0" :md="9" :lg="9">
          <Info />
        </a-col>
        <a-col :xs="24" :md="8" :lg="8">
          <Board />
        </a-col>
        <a-col :xs="0" :md="7" :lg="7">
          <Tool />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <Footer />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Board from '@/components/Board.vue'
import Tool from '@/components/Tool.vue'
import Info from '@/components/Info.vue'

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
  methods: {}
}
</script>

<style lang="scss" scoped>
@media (min-width: 750px) {
  .content {
    padding: 20px 15px 20px 15px;
  }
}

@media (max-width: 750px) {
  .content {
    padding: 5px;
  }
}
</style>
