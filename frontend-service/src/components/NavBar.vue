<template>
  <div class="card">
    <Menubar :model="items">
      <template #end>
        <span v-if="isAuthenticated">
          <Button label="Logout" icon="pi pi-power-off" @click="handleLogout" class="p-button-danger" />
        </span>
        <span v-else>
          <Button label="Login" icon="pi pi-sign-in" @click="$router.push('/login')" class="p-button-success mr-2" />
          <Button label="Register" icon="pi pi-user-plus" @click="$router.push('/register')" class="p-button-info" />
        </span>
      </template>
    </Menubar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'

export default {
  name: 'NavBar',
  components: {
    Menubar,
    Button
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    items() {
      const baseItems = [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/'
        }
      ]
      if (this.isAuthenticated) {
        baseItems.push({
          label: 'Dashboard',
          icon: 'pi pi-fw pi-th-large',
          to: '/dashboard'
        })
      }
      return baseItems
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout()
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