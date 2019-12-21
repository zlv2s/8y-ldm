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
      <a-col :xs="0" :lg="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import Board from '@/components/Board.vue'
import Header from '@/components/Header.vue'
// import { baiduTj } from '@/api'

export default {
  name: 'home',
  components: {
    Header,
    Board
  },
  mounted() {
    // baiduTj()
  }
}
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 8px;
}
</style>