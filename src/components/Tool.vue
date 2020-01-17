<template>
  <div class="tool-wrapper">
    <h2 class="card-title-name">Helper</h2>
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
        <li>
          <a href="https://www.radarbox24.com/" target="_blank">AirNav</a>
        </li>
        <li>
          <a href="https://pilotweb.nas.faa.gov/PilotWeb/" target="_blank"
            >FAA Notam</a
          >
        </li>
        <li>
          <a href="/func/time" target="_blank">起飞状态查询</a>
        </li>
        <li>
          <a href="/func/airport" target="_blank">三字代码查询</a>
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
  align-items: center;
}
</style>