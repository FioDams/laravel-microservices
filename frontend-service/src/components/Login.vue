<template>
  <div class="flex justify-center items-center h-full">
    <div class="w-full max-w-md">
      <Card class="bg-white shadow-md rounded-lg m-5">
        <template #title>
          <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        </template>
        <template #content>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-1">
                <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                <InputText id="email" v-model="email" type="email" required class="w-full" />
              </div>
              <div class="space-y-1">
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <Password id="password" v-model="password" :feedback="false" toggleMask required class="w-full"
                  :inputClass="'w-full'" />
              </div>
              <small class="error-message" v-if="authStore.loginError">{{ authStore.loginError }}</small>
              <Button type="submit" label="Login" class="w-full" :loading="loading" />
            </div>
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import DatePicker from 'primevue/datepicker';

export default {
  name: 'Login',
  components: {
    Card,
    InputText,
    Password,
    Button,
    DatePicker,
  },
  data() {
    return {
      email: '',
      password: '',
      date: null,
    }
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('')
    const password = ref('')
    const loading = ref(false)

    const handleLogin = async () => {
      loading.value = true
      const success = await authStore.login({ email: email.value, password: password.value })
      loading.value = false

      if (success) {
        router.push('/dashboard')
      }
    }

    return { email, password, loading, handleLogin, authStore }
  },
  methods: {
    async handleLogin() {
      try {
        await this.authStore.login({
          email: this.email,
          password: this.password
        });
        this.$router.push('/dashboard')
      } catch (error) {
        console.error(error)
        // Gérer l'erreur (par exemple, afficher un message à l'utilisateur)
      }
    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
  display: block;
  margin-bottom: 10px;
}
</style>