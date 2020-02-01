import authService from '../service/authService.js'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: {}, user: null }

export const authentication = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      // commit('loginRequest', { username })

      return authService.login({ username, password }).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure', error)
          return Promise.reject(error.response.data)
        }
      )
    },
    logout({ commit }) {
      authService.logout()
      commit('logout')
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true }
      state.user = user
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true }
      state.user = user
    },
    loginFailure(state) {
      state.status = {}
      state.user = null
    },
    logout(state) {
      state.status = {}
      state.user = null
    }
  }
}
