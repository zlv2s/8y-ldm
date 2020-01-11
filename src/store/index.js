import Vue from 'vue'
import Vuex from 'vuex'

import { global } from './globalModule'
import { authentication } from './authenticationModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    authentication
  }
})
