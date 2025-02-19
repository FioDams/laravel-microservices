import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    expiresAt: null,
    loginError: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token, // && new Date(state.expiresAt) > new Date(),
  },
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('/login', credentials)
        this.setAuthData(response.data)
        this.loginError = null
        return true
      } catch (error) {
        console.error('Login failed', error)
        if (error.response) {
          if (error.response.status === 422) {
            // Erreur de validation
            this.loginError = 'Email ou mot de passe incorrect'
          } else if (error.response.status === 429) {
            // Trop de tentatives
            this.loginError = 'Trop de tentatives de connexion. Veuillez réessayer plus tard.'
          } else {
            this.loginError = 'Une erreur est survenue lors de la connexion'
          }
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          this.loginError = 'Impossible de contacter le serveur. Veuillez vérifier votre connexion.'
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          this.loginError = 'Une erreur est survenue lors de la connexion'
        }
        return false
      }
    },
    setAuthData(data) {
      this.user = data.user
      this.token = data.access_token
      this.expiresAt = data.expires_at
      localStorage.setItem('authData', JSON.stringify(data))
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
    },
    logout() {
      this.user = null
      this.token = null
      this.expiresAt = null
      localStorage.removeItem('authData')
      delete axios.defaults.headers.common['Authorization']
    },
    initializeAuth() {
      console.log('Initializing auth')
      const authData = JSON.parse(localStorage.getItem('authData'))
      if (authData) { // && new Date(authData.expires_at) > new Date()) {
        this.setAuthData(authData)
      } else {
        this.logout()
      }
    },
    checkAuth() {
      if (this.isAuthenticated) { // && new Date(this.expiresAt) <= new Date()) {
        this.logout()
      }
    },
  },
})