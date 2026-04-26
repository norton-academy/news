<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

const auth = useAuth()
const authStore = useAuthStore()

onMounted(async () => {
  if (!authStore.user && authStore.token) {
    await auth.fetchUser()
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Stat cards -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">Total Users</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-900">1,245</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">Active Roles</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-900">12</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">Permissions</p>
        <h3 class="mt-3 text-3xl font-bold text-slate-900">48</h3>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm font-medium text-slate-500">System Status</p>
        <h3 class="mt-3 text-3xl font-bold text-green-600">Healthy</h3>
      </div>
    </div>

    <!-- Welcome card -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-xl font-bold text-slate-900">
        Welcome, {{ authStore.user?.name || 'User' }}
      </h3>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        This is your professional dashboard layout. From here, you can manage
        users, roles, permissions, settings, and all future modules in a clean way.
      </p>
    </div>

    <!-- Recent activity -->
    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-slate-900">Recent Activity</h3>

      <div class="mt-4 space-y-4">
        <div class="rounded-xl bg-slate-50 p-4">
          <p class="text-sm font-medium text-slate-900">New user registered</p>
          <p class="mt-1 text-sm text-slate-500">A new account was created in the system.</p>
        </div>

        <div class="rounded-xl bg-slate-50 p-4">
          <p class="text-sm font-medium text-slate-900">Role updated</p>
          <p class="mt-1 text-sm text-slate-500">Permissions were updated for manager role.</p>
        </div>

        <div class="rounded-xl bg-slate-50 p-4">
          <p class="text-sm font-medium text-slate-900">System backup completed</p>
          <p class="mt-1 text-sm text-slate-500">Nightly backup finished successfully.</p>
        </div>
      </div>
    </div>
  </div>
</template>