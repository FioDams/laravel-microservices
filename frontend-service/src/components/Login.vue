<template>
  <div class="p-d-flex p-jc-center">
    <div class="p-col-12 p-md-6 p-lg-4">
      <Card>
        <template #title>
          Login
        </template>
        <template #content>
          <form @submit.prevent="handleLogin">
            <div class="p-fluid">
              <div class="p-field">
                <label for="email">Email</label>
                <InputText id="email" v-model="email" type="email" required />
              </div>
              <div class="p-field">
                <label for="password">Password</label>
                <Password id="password" v-model="password" :feedback="false" required />
              </div>
              <Button type="submit" label="Login" />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

export default {
  name: 'Login',
  components: {
    Card,
    InputText,
    Password,
    Button
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost/auth/api/login', {
          email: this.email,
          password: this.password
        })
        this.login({ token: response.data.access_token, user: response.data.user })
        this.$router.push('/dashboard')
      } catch (error) {
        console.error(error)
        // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
      }
    }
  }
}
</script>