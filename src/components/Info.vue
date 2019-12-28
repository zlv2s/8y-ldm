<template>
  <div class="info-wrapper">
    <h2>flight status</h2>
    <a-card :bordered="false">
      <a-form layout="inline">
        <a-form-item>
          <a-input />
        </a-form-item>
        <a-form-item>
          <a-input />
        </a-form-item>
        <a-form-item>
          <a-button type="primary">Search</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.info-wrapper {
  h2 {
    text-transform: uppercase;
    /* margin-left: 12%; */
  }
}
</style>