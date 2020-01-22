<template>
  <div class="flt-content">
    <div class="flt-input">
      <div class="inner-wrapper">
        <a-input-search
          placeholder="请输入航班号"
          style="width: 200px"
          @search="searchFlt"
        >
          <a-button
            slot="enterButton"
            icon="search"
            type="primary"
            :loading="loading"
          />
        </a-input-search>
        <p class="tips">{{ footer }}</p>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="flt-wrapper" v-if="show">
        <div class="flight-head">
          <div class="flt-logo">
            <img :src="fltDetails.logo" alt="logo" />
          </div>
          <div class="flt-info">
            {{ `${fltDetails.status} ${fltDetails.name} ${fltDetails.fnum}` }}
          </div>
        </div>
        <div class="flt-center">
          <span>{{ fltDetails.acInfo }}</span>
        </div>
        <div class="flight-body">
          <div class="city">
            <div class="depart">
              <div class="airport">{{ fltDetails.forg }}</div>
            </div>
            <div class="arrive">
              <div class="airport">{{ fltDetails.fdst }}</div>
            </div>
          </div>
          <div class="time">
            <div class="depart">{{ fltDetails.atd }}</div>
            <div class="arrive">{{ arrivalTime }}</div>
            <span class="dayspan"></span>
            <div class="arrow arrow-flight">
              <i class="iconfont icon-hangban"></i>
            </div>
          </div>
          <div class="plantime">
            <div class="depart">原计划 {{ fltDetails.std }}</div>
            <div class="arrive">原计划 {{ fltDetails.sta }}</div>
          </div>
        </div>
        <div class="flt-footer">
          <p class="time-notice">
            All times based on China Standard Time (CST), UTC +8
          </p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getFltLabel, getFltStatus } from '@/api'
import { secToTime } from '@/utils'
export default {
  data() {
    return {
      loading: false,
      show: false,
      footer: '* 仅限查询刚起飞的航班',
      fltDetails: {
        acInfo: '',
        name: '',
        logo: '',
        status: '',
        fnum: '',
        forg: '',
        fdst: '',
        std: '',
        atd: '',
        sta: '',
        eta: '',
        ata: ''
      }
    }
  },
  computed: {
    arrivalTime() {
      return this.fltDetails.ata === '--'
        ? this.fltDetails.eta
        : `${this.fltDetails.ata}A`
    }
  },
  methods: {
    async searchFlt(v) {
      let str = v.replace(/(^\s*)|(\s*$)/g, '')
      if (str === '' || str === undefined || str === null) {
        return (this.footer = '* 请输入正确航班号')
      }
      if (this.loading) {
        return
      }
      this.loading = true
      this.footer = '* 仅限查询刚起飞的航班'
      try {
        const fRes = await getFltLabel({ fnum: str })
        if (fRes.data.length !== 0) {
          const { id, label, type } = fRes['data'][0]
          // eslint-disable-next-line camelcase
          const { callsign, schd_from, schd_to } = fRes['data'][0]['detail']
          const resolvedRet = await getFltStatus({ id })
          if (resolvedRet.code !== 404) {
            const res = resolvedRet['data']
            if (res['time']) {
              if (res['airline']) {
                const { name } = res['airline']
                this.fltDetails.name = name
              } else {
                this.fltDetails.name = '未知'
              }
              const { departure: std, arrival: sta } = res['time']['scheduled']
              const { departure: atd, arrival: ata } = res['time']['real']
              const { arrival: eta } = res['time']['estimated']

              this.fltDetails.acInfo = label
              this.fltDetails.status = `(${type})` || ''
              this.fltDetails.fnum = callsign
              this.fltDetails.logo = `https://pic.c-ctrip.com/AssetCatalog/airline/70/${str
                .substr(0, 2)
                .toUpperCase()}.png?v=2`
              // eslint-disable-next-line camelcase
              this.fltDetails.forg = `${schd_from || '--'}`
              // eslint-disable-next-line camelcase
              this.fltDetails.fdst = `${schd_to || '--'}`
              this.fltDetails.std = `${std ? secToTime(std) : '--'}`
              this.fltDetails.atd = `${atd ? secToTime(atd) : '--'}`
              this.fltDetails.sta = `${sta ? secToTime(sta) : '--'}`
              this.fltDetails.eta = `${eta ? secToTime(eta) : '--'}`
              this.fltDetails.ata = `${ata ? secToTime(ata) : '--'}`

              this.show = true
              this.footer = '* 数据获取成功'
              this.loading = false
            } else {
              this.footer = '* 未查询到该航班信息'
              this.loading = false
            }
          } else {
            this.footer = '* 数据未更新'
            this.loading = false
          }
        } else {
          this.footer = '* 未查询到该航班信息'
          this.loading = false
        }
      } catch (error) {
        if (error.code.includes('ECONNABORTED')) {
          this.footer = '*连接超时，请重试'
        } else {
          this.footer = error.message
        }
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* laptop */
@media (min-width: 750px) {
  .flt-content {
    max-width: 500px;
  }
}
.flt-content {
  margin-top: 30px;
  .flt-input {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
    .inner-wrapper {
      text-align: left;
      .tips {
        font-style: italic;
        color: #f00;
        margin-top: 30px;
        font-size: 12px;
      }
    }
  }
}

.flt-wrapper {
  padding: 15px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
}

.flight-head {
  height: 2rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .flt-logo {
    width: 20px;
    img {
      width: 100%;
    }
  }
  .flt-info {
    font-size: 1rem;
    margin-left: 3%;
    font-weight: 500;
  }
}

.flt-center {
  font-size: 0.9rem;
  margin-bottom: 30px;
  span {
    background-color: #eee;
  }
}

.flt-footer {
  margin-top: 20px;
  .time-notice {
    font-size: 14px;
  }
}

.city {
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.depart,
.arrive {
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 50%;
  white-space: normal;
}
.arrive {
  justify-content: flex-end;
  text-align: right;
}

.time {
  margin-top: 0.5rem;
  position: relative;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 2rem;
  line-height: 2.4rem;
}
.plantime {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 5%);
}

.arrow-flight {
  display: flex;
  align-items: center;
  width: 1.6rem;
  height: 100%;
  top: 0;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>