<template>
  <div class="card">
    <Menubar :model="items">
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <!-- <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" /> -->
          <span v-if="isAuthenticated">
            <Button label="Logout" icon="pi pi-power-off" @click="handleLogout" class="p-button-danger" />
          </span>
          <span v-else>
            <Button label="Login" icon="pi pi-sign-in" @click="$router.push('/login')" class="p-button-success mr-2" />
            <Button label="Register" icon="pi pi-user-plus" @click="$router.push('/register')" class="p-button-info" />
          </span>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { storeToRefs } from 'pinia'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

export default {
  name: 'NavBar',
  components: {
    Menubar,
    Button,
    InputText,
  },
  setup() {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)
    return { authStore, isAuthenticated }
  },
  computed: {
    items() {
      const baseItems = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          route: '/'
        }
      ]
      if (this.isAuthenticated) {
        baseItems.push({
          label: 'Dashboard',
          icon: 'pi pi-fw pi-th-large',
          route: '/dashboard'
        })
      }
      return baseItems
    }
  },
  methods: {
    handleLogout() {
      this.authStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.p-menubar {
  border-radius: 0;
}
</style>