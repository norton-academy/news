<script setup lang="ts">
const sidebarOpen = ref(false)

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppSidebar :open="sidebarOpen" @close="closeSidebar" />

    <div class="lg:pl-72">
      <AppHeader @toggle-sidebar="toggleSidebar" />

      <main class="px-4 py-6 sm:px-6 lg:px-8">
        <slot />
      </main>
    </div>

    <ToastContainer />
  </div>
</template>
