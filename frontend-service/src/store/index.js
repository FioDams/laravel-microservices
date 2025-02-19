import { createStore } from 'vuex'

export default createStore({
  state: {
    token: null,
    user: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    logout(state) {
      state.token = null
      state.user = null
    }
  },
  actions: {
    login({ commit }, { token, user }) {
      commit('setToken', token)
      commit('setUser', user)
      localStorage.setItem('token', token)
    },
    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
    },
    checkAuth({ commit }) {
      const token = localStorage.getItem('token')
      if (token) {
        commit('setToken', token)
        // Ici, vous pourriez faire une requête pour obtenir les informations de l'utilisateur
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
})