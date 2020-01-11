<template>
  <div class="info-container">
    <h2 class="card-title-name">mvt/ldm generator</h2>
    <a-card>
      <i class="iconfont icon-feiji" slot="title"></i>
      <p class="tb-info">Notice: Change the default value if needed</p>
      <div class="tb-3">
        <table class="tb-ac">
          <thead>
            <tr>
              <th>FLT</th>
              <th>REG</th>
              <th>FROM</th>
              <th>TO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a-input size="small" v-model="ac.flt" />
              </td>
              <td>
                <a-input size="small" v-model="ac.reg" />
              </td>
              <td>
                <a-input size="small" v-model="ac.from" />
              </td>
              <td>
                <a-input size="small" v-model="ac.to" />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>PIC</th>
              <th>CBN</th>
              <th>FM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a-input size="small" v-model="ac.cockpit" />
              </td>
              <td>
                <a-input size="small" v-model="ac.cabin" />
              </td>
              <td>
                <a-input size="small" v-model="ac.fm" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-card>

    <a-card style="margin-top:10px">
      <i class="iconfont icon-lvke-mian" slot="title"></i>
      <p class="tb-info">Notice: Fill with Integer Value</p>
      <div class="tb-2">
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
                <a-input size="small" v-model="pax.adt" />
              </td>
              <td>
                <a-input size="small" v-model="pax.chd" />
              </td>
              <td>
                <a-input size="small" v-model="pax.inf" />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="tb-bag">
          <thead>
            <tr>
              <th>PCS</th>
              <th>KG</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <a-input size="small" v-model="bag.pcs" />
              </td>
              <td>
                <a-input size="small" v-model="bag.weight" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-card>

    <a-card style="margin-top:10px">
      <i class="iconfont icon-hanglixiang" slot="title"></i>
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
              <a-input size="small" v-model="cargo.h5" />
            </td>
            <td>
              <a-input size="small" v-model="cargo.h4" />
            </td>
            <td>
              <a-input size="small" v-model="cargo.h3" />
            </td>
            <td>
              <a-input size="small" v-model="cargo.h1" />
            </td>
          </tr>
        </tbody>
      </table>
    </a-card>

    <a-card style="margin-top:10px">
      <i class="iconfont icon-shijian" slot="title"></i>
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
              <a-input size="small" v-model="flt.dc" />
            </td>
            <td>
              <a-input size="small" v-model="flt.oc" />
            </td>
            <td>
              <a-input size="small" v-model="flt.pb" />
            </td>
            <td>
              <a-input size="small" v-model="flt.ab" />
            </td>
            <td>
              <a-input size="small" v-model="flt.eta" />
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

    <div class="info-wrapper">
      <div class="load-info" v-html="this.loadInfo"></div>
      <div
        class="receivers"
        v-html="this.receivers.replace(/,/g, '<br/>')"
      ></div>
      <a-button @click="handleClick" v-if="sendBtnShow" :loading="loading"
        >Send</a-button
      >
    </div>
    <a-modal
      :title="mvtTitle"
      v-model="visible"
      @ok="handleOk"
      okText="Copy"
      style="top: 20px;"
    >
      <div v-html="loadInfo" id="loadInfo"></div>
    </a-modal>
    <a-modal
      @ok="verify"
      @cancel="handleCancel"
      width="260px"
      title="请输入验证码"
      v-model="captchaShow"
    >
      <div class="captcha-wrapper">
        <canvas width="100" height="34" id="captcha1"></canvas>
        <a-input v-model="inputVal" style="width:40%" />
      </div>
    </a-modal>
    <a-modal
      v-model="isLoginShow"
      @cancel="closeLoginModal"
      :footer="null"
      width="460px"
    >
      <Login />
    </a-modal>
  </div>
</template>

<script>
import Login from '@/components/Login'
import CaptchaMini from 'captcha-mini'
import { emptyObj, selectText, dateMap, icon, emailAdd } from '@/utils'
import { sendEmail } from '@/api'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      icon,
      visible: false,
      captchaShow: false,
      captchaVal: '',
      inputVal: '',
      loading: false,
      loadInfo: '',
      ac: {
        flt: '823',
        reg: '7937',
        from: 'CTU',
        to: 'KLO',
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
  components: {
    Login
  },
  created() {
    this['authentication/logout']()
  },
  computed: {
    ...mapGetters('global', ['loginShow']),
    ...mapState('authentication', ['user']),
    isLoginShow: {
      get() {
        return this.loginShow
      },
      set(v) {
        this['global/setLoginShow'](v)
      }
    },
    sendBtnShow() {
      return this.loadInfo && this.user
    },
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
    },
    mvtTitle() {
      let dateArr = new Date().toLocaleDateString('en-GB').split('/')
      let monthNum = dateArr[1]
      let yearNum = dateArr[2]
      dateArr[1] = dateMap[monthNum]
      dateArr[2] = yearNum.substr(2, 2)
      return `MVT/LDM 8Y${this.ac.flt} ${dateArr.join(
        ''
      )} ${this.ac.from.toUpperCase()}-${this.ac.to.toUpperCase()}`
    },
    receivers() {
      if (this.loadInfo.includes('KLO') && this.loadInfo.includes('823')) {
        return emailAdd.KLO
      } else if (
        this.loadInfo.includes('TAG') &&
        this.loadInfo.includes('825')
      ) {
        return emailAdd.TAG
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions([
      'global/setLoginShow',
      'authentication/login',
      'authentication/logout'
    ]),
    closeLoginModal() {
      this['global/setLoginShow'](false)
    },
    verify() {
      if (!this.inputVal) {
        return this.$message.warning('验证码不能为空！')
      }
      if (this.inputVal === this.captchaVal) {
        this.captchaShow = false
        sendEmail({
          emailAdd: this.receivers,
          subject: this.mvtTitle,
          content: this.loadInfo
        })
          .then(res => {
            this.loading = false
            this.inputVal = ''
            if (res.code === 200) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
          .catch(err => {
            this.$message.error(err.message)
            this.loading = false
          })
      } else {
        this.$message.warning('验证码错误')
        this.inputVal = ''
        this.generateCaptcha()
      }
    },
    handleCancel() {
      this.loading = false
    },
    generateCaptcha() {
      let captcha1 = new CaptchaMini()
      this.$nextTick(() => {
        captcha1.draw(document.querySelector('#captcha1'), r => {
          this.captchaVal = r
        })
      })
    },
    handleOk() {
      selectText('loadInfo')
      document.execCommand('Copy', 'false', null)
      this.$message.success('copy success!')
      setTimeout(() => {
        this.visible = false
      }, 400)
    },
    handleClick() {
      this.loading = true
      if (this.receivers) {
        this.captchaShow = true
        this.generateCaptcha()
      } else {
        this.loading = false
        return this.$message.warning('收件地址不匹配！')
      }
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
<p>8Y${this.ac.flt}/${this.dof} RPC${
        this.ac.reg
      }.${this.ac.from.toUpperCase()}</p>
<p>AD${this.utc(this.flt.pb)}/${this.utc(this.flt.ab)} ${this.utc(
        this.flt.eta
      )}${this.ac.to.toUpperCase()}</p>
<p>PAX ${this.tob}</p>
<br/>
<p>CREW: ${this.ac.cockpit}/${this.ac.cabin}+${this.ac.fm}FM  PAX: ${
        this.tob
      }</p>
<p>DOOR CLOSED: ${this.utc(this.flt.dc)}Z</p>
<p>OFFBLOCKS: ${this.utc(this.flt.oc)}Z</p>
<p>TAXI OUT: ${this.utc(this.flt.pb)}Z</p>
<p>AIRBORNE: ${this.utc(this.flt.ab)}Z</p>
<p>=============================</p>
<p><strong>LDM</strong></p>
<p>8Y${this.ac.flt}/${this.dof}. RPC${this.ac.reg}.Y180.${this.ac.cockpit}/${
        this.ac.cabin
      }+${this.ac.fm}FM</p>
<br/>
<p>${this.ac.from.toUpperCase()} ${this.pax.adt}/${this.pax.chd}/${
        this.pax.inf
      } TTL:${this.tob}</p>
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
  border: 1px solid #eee;
}

th {
  text-align: center;
}

td {
  padding: 5px 4px 5px 4px;
}
td input {
  text-align: center;
}

.btn-wrapper {
  text-align: center;
  margin: 10px 0 10px 0;
  button:first-child {
    margin-right: 30px;
  }
}

.tb-2 {
  display: flex;
  table:first-child {
    width: 56%;
  }
  table:last-child {
    width: 43%;
    margin-left: 1%;
  }
}

.tb-3 {
  table:last-child {
    width: 60%;
    margin-top: 10px;
  }
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-top: 30px;
  .load-info,
  .receivers {
    display: flex;
    flex-direction: column;
    margin-bottom: 10%;
  }
}

#loadInfo {
  overflow-y: auto;
  height: 60vh;
}

.captcha-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
