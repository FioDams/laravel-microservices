<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },
  methods: {
    async register() {
      try {
        const response = await axios.post('http://localhost/auth/api/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        console.log(response.data)
        // Handle successful registration (e.g., store token, redirect)
      } catch (error) {
        console.error(error)
        // Handle registration error
      }
    }
  }
}
</script>