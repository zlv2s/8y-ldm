<template>
  <div class="time-wrapper">
    <a-row>
      <a-col :xs="0" :md="7" :lg="8"></a-col>
      <a-col :xs="24" :md="10" :lg="8">
        <MInfo />
      </a-col>
      <a-col :xs="0" :md="7" :lg="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import MInfo from '@/components/MInfo'
export default {
  components: { MInfo }
}
</script>

<style lang="scss" scoped>
.time-wrapper {
  padding: 10px;
}
</style>