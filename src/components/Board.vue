<template>
  <div class="info-container">
    <a-card title="A/C INFO">
      <p class="tb-info">Notice: Change the default value if needed</p>
      <table class="tb-ac">
        <thead>
          <tr>
            <th>A/C REG</th>
            <th>COCKPIT</th>
            <th>CABIN</th>
            <th>FM</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input v-model="ac.reg" />
            </td>
            <td>
              <input v-model="ac.cockpit" />
            </td>
            <td>
              <input v-model="ac.cabin" />
            </td>
            <td>
              <input v-model="ac.fm" />
            </td>
          </tr>
        </tbody>
      </table>
    </a-card>

    <a-card title="PAX & BAG" style="margin-top:10px">
      <div class="pax-bag">
        <table class="tb-pax">
        <thead>
          <tr>
            <th>ADT</th>
            <th>CHD</th>
            <th>INF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input v-model="pax.adt" />
            </td>
            <td>
              <input v-model="pax.chd" />
            </td>
            <td>
              <input v-model="pax.inf" />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="tb-bag">
        <thead>
          <tr>
            <th>PCS</th>
            <th>WEIGHT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input v-model="bag.pcs" />
            </td>
            <td>
              <input v-model="bag.weight" />
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </a-card>

    <a-card title="CARGO" style="margin-top:10px">
      <p class="tb-info">Notice: Fill with pcs, not weight</p>
      <table class="tb-cargo">
        <thead>
          <tr>
            <th>HOLD5</th>
            <th>HOLD4</th>
            <th>HOLD3</th>
            <th>HOLD1</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input v-model="cargo.h5" />
            </td>
            <td>
              <input v-model="cargo.h4" />
            </td>
            <td>
              <input v-model="cargo.h3" />
            </td>
            <td>
              <input v-model="cargo.h1" />
            </td>
          </tr>
        </tbody>
      </table>
    </a-card>

    <a-card title="TIMELINE" style="margin-top:10px">
      <p class="tb-info">Notice: Fill with LOCAL TIME, eg: 0335</p>
      <table class="tb-flt">
        <thead>
          <tr>
            <th>DC</th>
            <th>OC</th>
            <th>PB</th>
            <th>AB</th>
            <th>ETA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input v-model="flt.dc" />
            </td>
            <td>
              <input v-model="flt.oc" />
            </td>
            <td>
              <input v-model="flt.pb" />
            </td>
            <td>
              <input v-model="flt.ab" />
            </td>
            <td>
              <input v-model="flt.eta" />
            </td>
          </tr>
        </tbody>
      </table>
    </a-card>

    <div class="btn-wrapper">
      <a-button type="primary" @click="generate">Generate</a-button>
      <a-button @click="clear">Clear All</a-button>
    </div>
    <a-back-top></a-back-top>

    <div class="load-info" v-html="this.loadInfo"></div>
    <a-modal title="MVT / LDM" v-model="visible" @ok="handleOk" okText="Copy" style="top: 20px;">
      <div v-html="loadInfo" id="loadInfo"></div>
    </a-modal>
  </div>
</template>

<script>
import { emptyObj, selectText } from '@/utils'
export default {
  data() {
    return {
      visible: false,
      loadInfo: '',
      ac: {
        reg: '7937',
        cockpit: '4',
        cabin: '4',
        fm: '1'
      },
      pax: {
        adt: '0',
        chd: '0',
        inf: '0'
      },
      cargo: {
        h1: '0',
        h3: '0',
        h4: '0',
        h5: '0'
      },
      bag: {
        pcs: '0',
        weight: '0'
      },
      flt: {
        dc: '0335',
        oc: '0335',
        pb: '0335',
        ab: '0335',
        eta: '0335'
      }
    }
  },
  computed: {
    tob() {
      return Number(this.pax.adt) + Number(this.pax.chd) + Number(this.pax.inf)
    },
    h1_weight() {
      return Math.floor(
        (Number(this.cargo.h1) / Number(this.bag.pcs)) * Number(this.bag.weight)
      )
    },
    h3_weight() {
      return Math.floor(
        (Number(this.cargo.h3) / Number(this.bag.pcs)) * Number(this.bag.weight)
      )
    },
    h4_weight() {
      return Math.floor(
        (Number(this.cargo.h4) / Number(this.bag.pcs)) * Number(this.bag.weight)
      )
    },
    h5_weight() {
      return Math.floor(
        (Number(this.cargo.h5) / Number(this.bag.pcs)) * Number(this.bag.weight)
      )
    },
    dof() {
      return new Date().getDate()
    }
  },
  methods: {
    handleOk() {
      selectText('loadInfo')
      document.execCommand('Copy', 'false', null)
      this.$message.success('copy success!')
      setTimeout(() => {
        this.visible = false
      }, 400)
    },
    utc(timestr) {
      const utcHR =
        Number(timestr.substr(0, 2)) + 16 >= 24
          ? Number(timestr.substr(0, 2)) - 8
          : Number(timestr.substr(0, 2)) + 16

      return ('' + utcHR).padStart(2, '0') + timestr.substr(2, 2)
    },
    generate() {
      this.visible = true
      if (this.loadInfo) {
        this.loadInfo = ''
      }
      this.loadInfo = `
<p><strong>MVT</strong></p>
<p>8Y823/${this.dof} RPC${this.ac.reg}.CTU</p>
<p>AD${this.utc(this.flt.pb)}/${this.utc(this.flt.ab)} ${this.utc(this.flt.eta)}KLO</p>
<p>PAX ${this.tob}</p>
<br/>
<p>CREW: ${this.ac.cockpit}/${this.ac.cabin}+${this.ac.fm}FM  PAX: ${
        this.tob
      }</p>
<p>DOOR CLOSED: ${this.utc(this.flt.dc)}Z</p>
<p>OFFBLOCKS: ${this.utc(this.flt.oc)}Z</p>
<p>TAXI OUT: ${this.utc(this.flt.pb)}Z</p>
<p>AIRBORNE: ${this.utc(this.flt.ab)}Z</p>
<p>================================</p>
<p><strong>LDM</strong></p>
<p>8Y823/${this.dof}. RPC${this.ac.reg}.Y180.${this.ac.cockpit}/${
        this.ac.cabin
      }+${this.ac.fm}FM</p>
<br/>
<p>CTU ${this.pax.adt}/${this.pax.chd}/${this.pax.inf} TTL:${this.tob}</p>
<p>1/${this.h1_weight} 3/${this.h3_weight} 4/${this.h4_weight} 5/${
        this.h5_weight
      }</p>
<p>SI</p>
<p>HOLD1: ${this.h1_weight > 0 ? `${this.h1_weight}KGS` : 'NIL'}</p>
<p>HOLD3: ${this.h3_weight > 0 ? `${this.h3_weight}KGS` : 'NIL'}</p>
<p>HOLD4: ${this.h4_weight > 0 ? `${this.h4_weight}KGS` : 'NIL'}</p>
<p>HOLD5: ${this.h5_weight > 0 ? `${this.h5_weight}KGS` : 'NIL'}</p>
<p>TTL BGE:${this.bag.pcs}PCS/${this.h1_weight +
        this.h3_weight +
        this.h4_weight +
        this.h5_weight}KGS</p>      
      `
    },
    clear() {
      this.loadInfo = ''
      emptyObj(this.ac, this.pax, this.cargo, this.bag, this.flt)
    }
  }
}
</script>

<style lang="scss" scoped>
.tb-info {
  font-weight: bold;
  text-align: left;
  color: #f00;
  font-style: italic;
}

table {
  border: 1px solid #ccc;
  width: 100%;
}

th {
  text-align: center;
}

tr {
  /* padding: 5px; */
}

td {
  height: 30px;
  padding: 5px;
}
td input {
  width: 100%;
  text-align: center;
}

.btn-wrapper {
  text-align: center;
  margin: 10px 0 10px 0;
  button:first-child {
    margin-right: 30px;
  }
}

.pax-bag {
  display: flex;
  table:last-child {
    margin-left: 20px;
  }
}

.load-info {
  text-align: left;
  margin-top: 30px;
}

#loadInfo {
  overflow-y: auto;
  height: 60vh;
}
</style>
