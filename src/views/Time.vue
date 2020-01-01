<template>
  <div class="time-wrapper">
    <a-row>
      <a-col>
        <div class="content">
          <div class="flt-input">
            <a-input-search
              placeholder="输入航班号"
              style="width: 200px"
              @search="searchFlt"
            />
          </div>
          <div class="flt-wrapper">
            <div class="flight-head">
              <div class="flt-logo">
                <img
                  src="https://pic.c-ctrip.com/AssetCatalog/airline/70/3U.png?v=2"
                  alt="logo"
                />
              </div>
              <div class="flt-info">四川航空 3U8963</div>
            </div>
            <div class="flight-body">
              <div class="city">
                <div class="depart">
                  <div class="airport">成都双流</div>
                </div>
                <div class="arrive">
                  <div class="airport">上海浦东</div>
                </div>
              </div>
              <div class="time">
                <div class="depart">12:49</div>
                <div class="arrive">14:56</div>
                <span class="dayspan"></span>
                <div class="arrow arrow-flight">
                  <i class="iconfont icon-hangban"></i>
                </div>
              </div>
              <div class="plantime">
                <div class="depart">原计划 12:30</div>
                <div class="arrive">原计划 15:20</div>
              </div>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.time-wrapper {
  padding: 10px;
  .content {
    margin-top: 30px;
    .flt-input {
      text-align: center;
      margin-bottom: 20px;
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
  margin-bottom: 40px;
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
</style>