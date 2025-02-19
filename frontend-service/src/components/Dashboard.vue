<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Total Users</h2>
        <p class="text-4xl font-bold text-blue-600">1,234</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Revenue</h2>
        <p class="text-4xl font-bold text-green-600">$56,789</p>
      </div>
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">Active Orders</h2>
        <p class="text-4xl font-bold text-orange-600">42</p>
      </div>
    </div>
    <div class="mt-8 bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Recent Activity</h2>
      <ul class="space-y-2">
        <li v-for="(activity, index) in recentActivities" :key="index" class="flex items-center">
          <span class="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
          {{ activity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      recentActivities: [
        'New user registered',
        'Order #1234 completed',
        'Product XYZ added to inventory',
        'Customer feedback received',
        'System update scheduled'
      ]
    }
  }
}
</script>