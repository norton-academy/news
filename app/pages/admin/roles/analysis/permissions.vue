<template>
  <div class="w-full max-w-none animate-fade-in">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Permissions Analysis</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Trends and distribution of permissions</p>
      </div>
      <NuxtLink
        to="/admin/roles"
        class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-md transition-all flex items-center gap-2"
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

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">Total Permissions</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ totalPermissions }}</p>
        <p class="text-xs text-emerald-600 mt-1">↑ 5 from last period</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">Assigned Permissions</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ assignedPermissions }}</p>
        <p class="text-xs text-emerald-600 mt-1">↑ 8 from last period</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">Avg per Role</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ avgPermissions }}</p>
        <p class="text-xs text-emerald-600 mt-1">↑ 0.5 from last period</p>
      </div>
    </div>

    <LineChart
      title="Permission Assignments Over Time"
      :labels="chartLabels"
      dataset-label="Assigned Permissions"
      :data="chartData"
      color="rgb(59, 130, 246)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const { roles, permissionGroups, totalPermissionsAssigned, avgPermissionsPerRole } = useRole()

const range = ref('month')
const dateFrom = ref('')
const dateTo = ref('')

watch(range, () => {
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
}, { immediate: true })

const totalPermissions = computed(() => permissionGroups.flatMap(g => g.permissions).length)
const assignedPermissions = computed(() => totalPermissionsAssigned.value)
const avgPermissions = computed(() => avgPermissionsPerRole.value)

const chartLabels = computed(() => {
  if (range.value === 'day') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
  if (range.value === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  if (range.value === 'month') return Array.from({ length: 30 }, (_, i) => `Day ${i+1}`)
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

const chartData = computed(() => {
  const len = chartLabels.value.length
  return Array.from({ length: len }, (_, i) => Math.floor(20 + i * 2 + Math.random() * 5))
})
</script>
