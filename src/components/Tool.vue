<template>
  <div class="tool-wrapper">
    <h2>Helper</h2>
    <a-card :bordered="false">
      <ul>
        <li><a href="/weather">Terminal Aerodrome Forecasts (TAFs)</a></li>
        <li>
          <a href="https://www.flightradar24.com/" target="_blank"
            >Flightradar24</a
          >
        </li>
        <li>
          <a href="https://flightadsb.variflight.com/" target="_blank"
            >Flight ADSB</a
          >
        </li>
        <li>
          <a href="https://www.aircn.org/toolbox/metar.php" target="_blank"
            >机场气象报文解析</a
          >
        </li>
        <li>
          <a href="https://www.planespotters.net/search?" target="_blank"
            >Aircraft Information Inquiry</a
          >
        </li>
        <li>
          <a
            href="https://www.airfleets.net/recherche/search.htm"
            target="_blank"
            >Aircraft Information Inquiry(2)</a
          >
        </li>
      </ul>
    </a-card>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.tool-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 12%;
}
</style>