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
      let chnPattern = new RegExp('[\u4E00-\u9FA5]+')
      let engPattern = new RegExp('[A-Za-z]+')

      if (value.length === 3 && engPattern.test(value)) {
        this.dataSource = !value
          ? []
          : this.flatRes(citySearch(value)) || [value.toUpperCase()]
      }
      if (chnPattern.test(value)) {
        return this.$message.warning('请输入正确机场IATA三字码！')
      }
    },
    onSelect(value) {
      let chnPattern = new RegExp('[\u4E00-\u9FA5]+')
      if (chnPattern.test(value)) {
        return this.$message.warning('请输入正确机场三字码！')
      }
      jsonp(value).then(res => {
        if (res.c === 0) {
          this.airportInfo.country = res.result[0]['country']
          this.airportInfo.code = res.result[0]['code']
          this.airportInfo.displayName = res.result[0]['displayName']
        } else {
          this.$message.warning('未搜索到结果，请重新输入！')
        }
      })
    },
    flatRes(arr) {
      if (arr.length > 0) {
        return Object.values(arr[0])
      }
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
