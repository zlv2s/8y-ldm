export const global = {
  namespaced: true,
  state: {
    loginShow: false
  },
  getters: {
    loginShow: state => state.loginShow
  },
  actions: {
    setLoginShow({ commit }, val) {
      commit('setLoginShow', val)
    }
  },
  mutations: {
    setLoginShow(state, payload) {
      state.loginShow = payload
    }
  }
}
