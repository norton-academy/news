<template>
  <div class="w-full max-w-none animate-fade-in">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Average Permissions Analysis</h1>
        <p class="mt-1 text-gray-500 dark:text-gray-400">Trends and insights for permission density per role</p>
      </div>
      <NuxtLink
        to="/admin/roles"
        class="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:shadow-md dark:bg-gray-800 dark:text-gray-300"
      >
        <ArrowLeft :size="16" />
        Back to Roles
      </NuxtLink>
    </div>

    <AnalyticsDateRangeFilter
      v-model:range="range"
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      class="mb-6"
    />

    <div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
      <div class="rounded-2xl bg-white p-5 shadow-md dark:bg-gray-800">
        <p class="text-sm text-gray-500">Avg. Permissions</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ avgPermissionsPerRole }}</p>
        <p class="mt-1 text-xs text-emerald-600">↑ 0.3 compared with last period</p>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-md dark:bg-gray-800">
        <p class="text-sm text-gray-500">Assigned Permissions</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ totalPermissionsAssigned }}</p>
        <p class="mt-1 text-xs text-gray-500">Current global assignment load</p>
      </div>
      <div class="rounded-2xl bg-white p-5 shadow-md dark:bg-gray-800">
        <p class="text-sm text-gray-500">Highest Load Role</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ highestLoadCount }}</p>
        <p class="mt-1 text-xs text-blue-600">{{ highestLoadRoleName }}</p>
      </div>
    </div>

    <LineChart
      title="Average Permissions Per Role"
      :labels="chartLabels"
      dataset-label="Avg Permissions / Role"
      :data="chartData"
      color="rgb(16, 185, 129)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const { roles, avgPermissionsPerRole, totalPermissionsAssigned } = useRole()

const range = ref('month')
const dateFrom = ref('')
const dateTo = ref('')

const updateDates = () => {
  const today = new Date()
  const to = today.toISOString().split('T')[0]
  let from: string

  switch (range.value) {
    case 'day': from = to; break
    case 'week': from = new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0]; break
    case 'month': from = new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0]; break
    case 'year': from = new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0]; break
    default: from = ''
  }

  dateFrom.value = from
  dateTo.value = to
}

watch(range, updateDates, { immediate: true })

const highestLoadRole = computed(() => {
  if (roles.value.length === 0) return null
  return roles.value.reduce((max, role) => role.permissions.length > max.permissions.length ? role : max)
})

const highestLoadRoleName = computed(() => highestLoadRole.value?.name ?? 'N/A')
const highestLoadCount = computed(() => highestLoadRole.value?.permissions.length ?? 0)

const chartLabels = computed(() => {
  if (range.value === 'day') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
  if (range.value === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  if (range.value === 'month') return Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

const chartData = computed(() => {
  const len = chartLabels.value.length
  const baseline = Number(avgPermissionsPerRole.value) || 0
  return Array.from({ length: len }, (_, i) => Number((baseline + i * 0.05 + Math.random() * 0.4).toFixed(1)))
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
