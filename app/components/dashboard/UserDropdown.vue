<script setup lang="ts">
const props = defineProps<{
  user: {
    id?: number
    name?: string
    email?: string
  } | null
}>()

const auth = useAuth()
const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const handleLogout = async () => {
  await auth.logout()
  await navigateTo('/login')
}
</script>

<template>
  <div class="relative">
    <button
      class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50"
      @click="toggleDropdown"
    >
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
        {{ props.user?.name?.charAt(0)?.toUpperCase() || 'U' }}
      </div>

      <div class="hidden text-left sm:block">
        <p class="text-sm font-semibold text-slate-900">
          {{ props.user?.name || 'User' }}
        </p>
        <p class="text-xs text-slate-500">
          {{ props.user?.email || 'user@example.com' }}
        </p>
      </div>
    </button>

    <div
      v-if="open"
      class="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
    >
      <NuxtLink
        to="/profile"
        class="block rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        @click="open = false"
      >
        Profile
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="block rounded-xl px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
        @click="open = false"
      >
        Settings
      </NuxtLink>

      <button
        class="block w-full rounded-xl px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </div>
</template>
