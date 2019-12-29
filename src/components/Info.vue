<template>
  <div class="info-wrapper">
    <h2 class="card-title-name">flight status</h2>
    <a-card :bordered="false">
      <div class="form-wrapper">
        <div class="input-wrapper">
          <a-input
            style="width: 35%"
            placeholder="Flight Number"
            v-model="fnum"
          />
          <a-input
            style="width: 35%"
            placeholder="AC Registration"
            v-model="anum"
          />
        </div>
        <div>
          <a-button @click="searchFlt" shape="circle" icon="search" />
        </div>
      </div>
      <div class="search-result">
        <a-table
          size="small"
          :columns="columns"
          :dataSource="fdetail"
          :pagination="false"
          align="center"
          :loading="loading"
        >
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getFltLabel, getFltStatus } from '@/api'
import { secToTime } from '@/utils'
const columns = [
  {
    title: '航班号',
    dataIndex: 'fnum',
    key: '1'
  },
  {
    title: '出发',
    dataIndex: 'forg',
    key: '2'
  },
  {
    title: '到达',
    dataIndex: 'fdst',
    key: '3'
  },
  {
    title: '起飞时间',
    dataIndex: 'actualDeptime',
    customRender(text, record, index) {
      return secToTime(text)
    },
    key: '4'
  },
  {
    title: '落地时间',
    dataIndex: 'estimatedArrtime',
    customRender(text, record, index) {
      return secToTime(text)
    },
    key: '5'
  }
]
export default {
  data() {
    return {
      columns,
      fnum: '8Y824',
      anum: 'RPC7937',
      fdetail: [],
      loading: false
    }
  },
  methods: {
    async searchFlt() {
      this.loading = true
      const fRes = await getFltLabel({ fnum: this.fnum })
      const res = await getFltStatus({ id: fRes[0]['id'] })
      console.log(res['time'])
      // getFltLabel({ anum: this.anum, fnum: this.fnum }).then(res => {
      //   if (res.code === 200) {
      //     this.loading = false
      //     res.data['key'] = Date.now()
      //     this.fdetail = [{ ...res.data }]
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 5px;
  .input-wrapper {
    text-align: left;
    input:first-child {
      margin-right: 30px;
    }
  }
}

.search-result {
  text-align-last: left;
  margin-top: 30px;
  .search-hd {
    padding: 10px;
  }
  .search-bd {
    padding: 10px 5px 10px 5px;
  }
}
</style>