import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('http://localhost/auth/api/login', credentials)
        this.setToken(response.data.access_token)
        this.setUser(response.data.user)
      } catch (error) {
        console.error('Login failed', error)
        throw error
      }
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
    },
    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    initializeAuth() {
      console.log('Initializing auth')
      const token = localStorage.getItem('token')
      const user = JSON.parse(localStorage.getItem('user'))
      if (token && user) {
        this.token = token
        this.user = user
      }
    },
  },
})