<template>
  <div id="app" class="h-full flex flex-col">
    <NavBar />
    <div class="content-wrapper flex-grow overflow-auto p-4 bg-gray-100">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>
