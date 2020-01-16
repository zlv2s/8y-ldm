<template>
  <div class="time-wrapper">
    <a-row>
      <a-col :xs="0" :md="7" :lg="8"></a-col>
      <a-col :xs="24" :md="10" :lg="8">
        <router-view></router-view>
      </a-col>
      <a-col :xs="0" :md="7" :lg="8"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.time-wrapper {
  padding: 10px;
}
</style>