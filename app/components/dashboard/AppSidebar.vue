<script setup lang="ts">
defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Users', href: '/users' },
  { name: 'Roles', href: '/roles' },
  { name: 'Permissions', href: '/permissions' },
  { name: 'Profile', href: '/profile' },
  { name: 'Settings', href: '/settings' },
]

const isActive = (href: string) => route.path === href
</script>

<template>
  <div>
    <!-- Mobile overlay -->
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
        @click="emit('close')"
      />
    </transition>

    <!-- Mobile sidebar -->
    <transition name="slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-xl lg:hidden"
      >
        <div class="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <h1 class="text-lg font-bold text-slate-900">Admin Panel</h1>
          <button
            class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            @click="emit('close')"
          >
            Close
          </button>
        </div>

        <nav class="space-y-2 p-4">
          <NuxtLink
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            class="block rounded-xl px-4 py-3 text-sm font-medium transition"
            :class="isActive(item.href)
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'"
            @click="emit('close')"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>
      </aside>
    </transition>

    <!-- Desktop sidebar -->
    <aside class="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white">
      <div class="flex h-16 items-center border-b border-slate-200 px-6">
        <h1 class="text-lg font-bold text-slate-900">Admin Panel</h1>
      </div>

      <nav class="flex-1 space-y-2 p-4">
        <NuxtLink
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          class="block rounded-xl px-4 py-3 text-sm font-medium transition"
          :class="isActive(item.href)
            ? 'bg-slate-900 text-white'
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'"
        >
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
