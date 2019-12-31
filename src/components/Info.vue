<template>
  <div class="info-wrapper">
    <h2 class="card-title-name">flight status</h2>
    <a-card :bordered="false">
      <div class="form-wrapper">
        <div class="input-wrapper">
          <a-input-search
            placeholder="输入航班号"
            style="width: 200px"
            @search="searchFlt"
          />
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
          <template slot="footer">
            <p style="text-align:left;font-style:italic;color:red">
              {{ footer }}
            </p>
          </template>
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
      return text
    },
    key: '4'
  },
  {
    title: '落地时间',
    dataIndex: 'estimatedArrtime',
    customRender(text, record, index) {
      return text
    },
    key: '5'
  }
]
export default {
  data() {
    return {
      columns,
      fdetail: [],
      loading: false,
      footer: ' * 只能查询临近起飞前的航班'
    }
  },
  methods: {
    async searchFlt(v) {
      this.loading = true
      this.footer = '* 只能查询临近起飞前的航班'
      try {
        const fRes = await getFltLabel({ fnum: v })
        if (fRes.data.length !== 0) {
          // console.log({ fRes })
          // eslint-disable-next-line camelcase
          const { callsign, schd_from, schd_to } = fRes['data'][0]['detail']
          const resolvedRet = await getFltStatus({ id: fRes['data'][0]['id'] })
          if (resolvedRet.code !== 404) {
            const res = resolvedRet['data']
            if (res['time']) {
              const { departure: std, arrival: sta } = res['time']['scheduled']
              const { departure: atd } = res['time']['real']
              const { arrival: eta } = res['time']['estimated']
              const flt = {
                fnum: callsign,
                forg: schd_from,
                fdst: schd_to,
                actualDeptime: this.fromatTime(std, atd),
                estimatedArrtime: this.fromatTime(sta, eta),
                key: Date.now()
              }
              this.fdetail = [flt]
              this.loading = false
            } else {
              this.fdetail = []
              this.footer = '* 未查到该航班信息'
              this.loading = false
            }
          } else {
            this.fdetail = []
            this.footer = '* 数据还未更新'
            this.loading = false
          }
        } else {
          this.fdetail = []
          this.footer = '* 未查到该航班信息'
          this.loading = false
        }
      } catch (error) {
        this.footer = error.message
        this.loading = false
      }
    },
    fromatTime(t1, t2) {
      return `${t1 ? secToTime(t1) : '--'}/${t2 ? secToTime(t2) : '--'}`
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  .input-wrapper {
    text-align: center;
  }
}

.search-result {
  margin-top: 30px;
  .search-hd {
    padding: 10px;
  }
  .search-bd {
    padding: 10px 5px 10px 5px;
  }
}
</style>