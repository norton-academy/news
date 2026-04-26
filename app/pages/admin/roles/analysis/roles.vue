<template>
  <div class="w-full max-w-none animate-fade-in">
    <!-- Header -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Roles Analysis</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Trends and insights for total roles</p>
      </div>
      <NuxtLink
        to="/admin/roles"
        class="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-md transition-all flex items-center gap-2"
      >
        <ArrowLeft :size="16" />
        Back to Analytics
      </NuxtLink>
    </div>

    <!-- Filter Bar -->
    <AnalyticsDateRangeFilter
      v-model:range="range"
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      class="mb-6"
    />

    <!-- Summary Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">Total Roles</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ totalRoles }}</p>
        <p class="text-xs text-emerald-600 mt-1">↑ 2 from last period</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">Active Roles</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ activeRoles }}</p>
        <p class="text-xs text-emerald-600 mt-1">↑ 1 from last period</p>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <p class="text-sm text-gray-500">New Roles (Period)</p>
        <p class="text-3xl font-bold text-gray-900 dark:text-white">{{ newRolesCount }}</p>
        <p class="text-xs text-gray-500 mt-1">Created in selected range</p>
      </div>
    </div>

    <!-- Line Chart -->
    <LineChart
      title="Roles Over Time"
      :labels="chartLabels"
      dataset-label="Number of Roles"
      :data="chartData"
      color="rgb(99, 102, 241)"
    />

    <!-- Additional table or details can go here -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowLeft } from 'lucide-vue-next'
import { useRole } from '~/composables/useRole'

definePageMeta({
  layout: 'admin'
})

const { roles } = useRole()

const range = ref('month')
const dateFrom = ref('')
const dateTo = ref('')

// Set default dates
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

// Mock data generation
const totalRoles = computed(() => roles.value.length)
const activeRoles = computed(() => roles.value.filter(r => r.status !== 'inactive').length)
const newRolesCount = computed(() => 2) // mock

// Generate mock chart data based on range
const chartLabels = computed(() => {
  if (range.value === 'day') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
  if (range.value === 'week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  if (range.value === 'month') {
    const days = []
    for (let i = 1; i <= 30; i++) days.push(`Day ${i}`)
    return days
  }
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
})

const chartData = computed(() => {
  const len = chartLabels.value.length
  return Array.from({ length: len }, (_, i) => Math.floor(3 + i * 0.5 + Math.random() * 2))
})
</script>