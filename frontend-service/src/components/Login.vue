<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost/api/login', {
          email: this.email,
          password: this.password
        })
        console.log(response.data)
        // Handle successful login (e.g., store token, redirect)
      } catch (error) {
        console.error(error)
        // Handle login error
      }
    }
  }
}
</script>