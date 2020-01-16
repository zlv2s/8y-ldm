<template>
  <div class="airport-wrapper">
    <a-auto-complete
      :dataSource="dataSource"
      style="width: 200px"
      @select="onSelect"
      @search="handleSearch"
      placeholder="输入机场三字代码"
    />
    <div class="content-body">
      <ul class="info-title">
        <li>国家</li>
        <li>机场代码</li>
        <li>名称</li>
      </ul>
      <ul class="info-content">
        <li>{{ airportInfo.country }}</li>
        <li>{{ airportInfo.code }}</li>
        <li>{{ airportInfo.displayName }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { jsonp } from '@/api'
import { citySearch } from '@/utils'

export default {
  data() {
    return {
      dataSource: [],
      airportInfo: {
        country: '中国',
        code: 'CTU',
        displayName: '成都'
      }
    }
  },

  methods: {
    handleSearch(value) {
      if (value.length === 3) {
        this.dataSource = !value ? [] : this.flatRes(citySearch(value))
      }
    },
    onSelect(value) {
      if (value.length < 3) {
        return this.$message.warning('输入有误！')
      }
      jsonp(value).then(res => {
        if (res.c === 0) {
          this.airportInfo.country = res.result[0]['country']
          this.airportInfo.code = res.result[0]['code']
          this.airportInfo.displayName = res.result[0]['displayName']
        } else {
          this.$message.warning('输入有误！')
        }
      })
    },
    flatRes(arr) {
      return Object.values(arr[0])
    }
  }
}
</script>

<style lang="scss" scoped>
.airport-wrapper {
  text-align: center;
  margin-top: 30px;
}

.content-body {
  margin-top: 30px;
  .info-title,
  .info-content {
    display: flex;
    justify-content: center;
    li {
      width: 30%;
      &:last-child {
        width: 40%;
      }
    }
  }
  .info-title {
    font-weight: 700;
    font-size: 14px;
    line-height: 44px;
    li {
      background-color: #dadada;
      &:last-child {
        margin-left: 0.1rem;
      }
      &:first-child {
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
