<script setup lang="ts">
const sidebarOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};
</script>

<template>
  <div
    class="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
  >
    <div class="pointer-events-none fixed inset-0 overflow-hidden">
      <div
        class="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/5"
      />
      <div
        class="absolute -right-40 top-40 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/5"
      />
    </div>

    <AppSidebar :open="sidebarOpen" @close="closeSidebar" />

    <div class="relative lg:pl-72">
      <AppHeader @toggle-sidebar="toggleSidebar" />

      <main class="px-4 py-6 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
