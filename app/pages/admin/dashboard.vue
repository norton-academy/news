<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
    <!-- Header with Admin Dropdown (same as before, but with transition) -->
    <header class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20 shadow-sm transition-all duration-300">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo with bounce animation on hover -->
          <div class="flex items-center gap-3 group">
            <div class="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold text-lg shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              A
            </div>
            <span class="font-semibold text-gray-800 dark:text-white text-lg tracking-tight">AdminCore</span>
          </div>

          <!-- Search with focus animation -->
          <div class="hidden md:block flex-1 max-w-md mx-8">
            <div class="relative group">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-indigo-500 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search..." class="w-full bg-gray-50 dark:bg-gray-800 shadow-sm dark:shadow-sm rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 group-focus-within:shadow-md dark:text-white dark:placeholder-gray-400">
            </div>
          </div>

          <!-- Right side with admin dropdown etc. (same as before but with transitions) -->
          <div class="flex items-center gap-4">
            <!-- Admin Actions Dropdown with slide animation -->
            <div class="relative" ref="dropdownRef">
              <button @click="toggleAdminDropdown" class="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300">
                <svg class="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Admin
                <svg class="h-4 w-4 transition-transform duration-200" :class="{ 'rotate-180': isAdminDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition name="dropdown">
                <div v-if="isAdminDropdownOpen" class="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 z-30 origin-top-right">
                  <NuxtLink to="/admin/settings" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                    System Settings
                  </NuxtLink>
                  <NuxtLink to="/admin/database" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    Database Manager
                  </NuxtLink>
                  <NuxtLink to="/admin/auth-log" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Authentication Logs
                  </NuxtLink>
                  <!-- separator removed to keep border-free aesthetic -->
                  <NuxtLink to="/admin/backup" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    Backup & Restore
                  </NuxtLink>
                  <NuxtLink to="/admin/activity" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>
                    System Activity
                  </NuxtLink>
                </div>
              </Transition>
            </div>

            <!-- Dark Mode Toggle with rotate animation -->
            <button @click="toggleDarkMode" class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-12">
              <svg v-if="isDark" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <!-- Notifications with pulse animation -->
            <button class="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-105">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse"></span>
            </button>

            <div class="flex items-center gap-2 cursor-pointer group">
              <div class="h-8 w-8 rounded-full bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-medium text-sm shadow-sm transition-all duration-200 group-hover:scale-110 group-hover:rotate-3">
                JD
              </div>
              <span class="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition">John Doe</span>
              <svg class="hidden md:block h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-transform duration-200 group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content - with scroll reveal animations -->
    <main class="py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-none">
        <!-- Welcome row with slide-in -->
        <div class="mb-8 animate-slide-in">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">Dashboard</h1>
          <p class="text-gray-500 dark:text-gray-400 mt-1">High‑level management for your platform – only what matters.</p>
          <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Last updated: {{ lastUpdated }}</span>
          </div>
        </div>

        <!-- Card Grid: Always rendered for consistent layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-10">
          <template v-if="loading">
            <div v-for="i in 6" :key="i" class="relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-700 p-5 shadow-sm animate-pulse flex flex-col justify-between min-h-[140px]">
              <div class="absolute inset-0 backdrop-blur-[2px] bg-white/30 dark:bg-gray-900/30"></div>
              <div class="relative z-10 flex flex-col gap-3">
                <div class="h-4 w-1/3 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
                <div class="h-8 w-2/3 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
                <div class="h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600 shimmer"></div>
                <div class="h-2 w-full rounded bg-gray-300 dark:bg-gray-600 shimmer mt-2"></div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="(stat, idx) in enhancedStats" :key="stat.title" class="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl" :class="stat.gradient" style="backdrop-filter: blur(4px);">
              <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8 group-hover:scale-150 transition-transform duration-500"></div>
              <div class="relative z-10">
                <div class="flex items-center justify-between">
                  <div class="text-white/80 text-sm font-medium tracking-wide">{{ stat.title }}</div>
                  <div class="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm animate-icon-bounce">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="stat.icon"></svg>
                  </div>
                </div>
                <div class="mt-3 flex items-end gap-2">
                  <span class="text-3xl font-extrabold text-white animate-counter">{{ stat.animatedValue }}</span>
                  <span v-if="stat.unit" class="text-white/80 text-base ml-1">{{ stat.unit }}</span>
                </div>
                <div class="mt-2 flex items-center gap-1">
                  <span class="text-xs font-semibold animate-trend" :class="stat.trendColor">{{ stat.trend }}</span>
                  <span class="text-white/60 text-xs">{{ stat.trendText }}</span>
                </div>
                <div class="mt-3 h-1 w-full bg-white/20 rounded-full overflow-hidden">
                  <div class="h-full bg-white/50 rounded-full transition-all duration-1000" :style="{ width: stat.progress }"></div>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- Two-column layout with staggered animations -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Quick Actions Grid (2/3 width) -->
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-800 dark:text-white">Quick Actions</h2>
              <NuxtLink to="/admin/all-actions" class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 transition-all hover:gap-2">
                View all
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </NuxtLink>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="(action, index) in quickActions" :key="action.title" class="group relative bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-fade-up" :style="{ animationDelay: `${index * 0.05}s` }">
                <div class="absolute inset-0 rounded-2xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div class="relative flex flex-col h-full">
                  <div class="flex items-center justify-between">
                    <div :class="action.iconBg" class="h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="action.iconSvg"></svg>
                    </div>
                    <span class="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-700">{{ action.count }}</span>
                  </div>
                  <h3 class="text-lg font-bold text-gray-800 dark:text-white mt-4">{{ action.title }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 flex-1">{{ action.description }}</p>
                  <NuxtLink :to="action.link" class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                    Manage
                    <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Tasks Widget with pulse and hover effects -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-5 transition-all hover:shadow-md hover:-translate-y-1 animate-slide-in-right">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-800 dark:text-white">Pending Tasks</h2>
              <svg class="h-5 w-5 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="space-y-4">
              <div v-for="(task, idx) in pendingTasks" :key="task.title" class="flex items-start gap-3 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md" :class="task.bgClass">
                <div :class="task.iconBg" class="h-8 w-8 rounded-full flex items-center justify-center">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-html="task.iconSvg"></svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800 dark:text-white">{{ task.title }}</p>
                  <p class="text-xs text-gray-500">{{ task.count }}</p>
                  <NuxtLink :to="task.link" class="text-xs text-indigo-600 mt-1 inline-block transition-all hover:translate-x-1">Review →</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer class="mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 AdminCore. All rights reserved. | <NuxtLink to="/admin/privacy" class="hover:text-indigo-600 transition-colors">Privacy</NuxtLink></p>
        </footer>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Dark mode
const isDark = ref(false)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Admin Dropdown logic
const isAdminDropdownOpen = ref(false)
const dropdownRef = ref(null)

const toggleAdminDropdown = () => {
  isAdminDropdownOpen.value = !isAdminDropdownOpen.value
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isAdminDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Immediately set loading to false (no simulation)
  loading.value = false
  // Optionally, you can call startCounters() here if needed for animated stats
  startCounters()
})

// Loading state
const loading = ref(true)

// Last updated timestamp
const lastUpdated = ref('')
onMounted(() => {
  const now = new Date()
  lastUpdated.value = now.toLocaleTimeString() + ' ' + now.toLocaleDateString()
})

// Animated counters for new stats
const animatedStats = ref({
  orders: 0,
  kyc: 0,
  withdraw: 0,
  lowStock: 0,
  subscribers: 0,
  ads: 0
})

const enhancedStats = ref([])

// If you want to keep animated counters, keep startCounters, otherwise you can remove it
const startCounters = () => {
  // Optionally, you can keep this logic or replace with direct assignment if you want instant values
  const targets = { orders: 1482, kyc: 24, withdraw: 12430, lowStock: 23, subscribers: 3245, ads: 8 }
  for (let key in targets) {
    animatedStats.value[key] = key === 'withdraw' ? `$${targets[key].toLocaleString()}` : targets[key]
  }
  enhancedStats.value = [
    { title: 'Total Orders', value: 1482, unit: '', trend: '↑ 8.2%', trendColor: 'text-white', trendText: 'vs last month', progress: '68%', gradient: 'from-indigo-500 to-indigo-300', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />', animatedValue: animatedStats.value.orders },
    { title: 'KYC Pending', value: 24, unit: '', trend: '↑ 2', trendColor: 'text-white', trendText: 'new this week', progress: '45%', gradient: 'from-amber-500 to-orange-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />', animatedValue: animatedStats.value.kyc },
    { title: 'Withdrawals', value: 12430, unit: '$', trend: '↓ 3%', trendColor: 'text-white', trendText: 'this month', progress: '32%', gradient: 'from-rose-500 to-pink-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v4m4-4v4" />', animatedValue: animatedStats.value.withdraw },
    { title: 'Low Stock', value: 23, unit: '', trend: '↑ 5', trendColor: 'text-white', trendText: 'needs action', progress: '76%', gradient: 'from-orange-500 to-red-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />', animatedValue: animatedStats.value.lowStock },
    { title: 'Subscribers', value: 3245, unit: '', trend: '↑ 12%', trendColor: 'text-white', trendText: 'growth', progress: '89%', gradient: 'from-emerald-500 to-teal-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />', animatedValue: animatedStats.value.subscribers },
    { title: 'Active Ads', value: 8, unit: '', trend: '+2', trendColor: 'text-white', trendText: 'this week', progress: '40%', gradient: 'from-cyan-500 to-blue-500', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />', animatedValue: animatedStats.value.ads }
  ]
}

// Quick Actions data (same as before)
const quickActions = [
  {
    title: 'KYC Requests',
    description: 'Verify user identities and documents',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />',
    link: '/admin/kyc',
    count: '24 pending'
  },
  {
    title: 'Manage Products',
    description: 'Inventory, pricing, and variants',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />',
    link: '/admin/products',
    count: '1,284 total'
  },
  {
    title: 'Orders',
    description: 'Process and track customer orders',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />',
    link: '/admin/orders',
    count: '1,482 total'
  },
  {
    title: 'Withdrawals',
    description: 'Payment requests and approvals',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v4m4-4v4" />',
    link: '/admin/withdraw',
    count: '12 pending'
  },
  {
    title: 'Subscribers',
    description: 'Email list and campaigns',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />',
    link: '/admin/subscribers',
    count: '3,245 active'
  },
  {
    title: 'Page Builder',
    description: 'Drag & drop editor for pages',
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />',
    link: '/admin/page-builder',
    count: '5 published'
  }
]

// Pending tasks data
const pendingTasks = [
  {
    title: 'KYC Verification',
    count: '24 pending requests',
    link: '/admin/kyc',
    bgClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    iconBg: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />'
  },
  {
    title: 'Withdrawal Requests',
    count: '12 requests totaling $12,430',
    link: '/admin/withdraw',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    iconBg: 'bg-red-100 dark:bg-red-800 text-red-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm0 0v4m4-4v4" />'
  },
  {
    title: 'Low Stock Alerts',
    count: '23 products below threshold',
    link: '/admin/products?filter=low-stock',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    iconBg: 'bg-orange-100 dark:bg-orange-800 text-orange-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />'
  },
  {
    title: 'Unread Messages',
    count: '8 contact form submissions',
    link: '/admin/contact',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    iconBg: 'bg-blue-100 dark:bg-blue-800 text-blue-600',
    iconSvg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />'
  }
]
</script>

<style>
/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9);
  transform-origin: top;
}

/* Scroll reveal animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}
.animate-slide-in-right {
  animation: slideInRight 0.5s ease-out forwards;
}
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-fade-up {
  opacity: 0;
  animation: fadeUp 0.4s ease-out forwards;
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Icon bounce animation */
@keyframes iconBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px) scale(1.1); }
}
.animate-icon-bounce {
  animation: iconBounce 1.2s infinite cubic-bezier(.68,-0.55,.27,1.55);
}

/* Counter pop animation */
@keyframes counterPop {
  0% { transform: scale(1); }
  20% { transform: scale(1.15); }
  40% { transform: scale(0.98); }
  60% { transform: scale(1.05); }
  80% { transform: scale(0.99); }
  100% { transform: scale(1); }
}
.animate-counter {
  animation: counterPop 0.8s;
}

/* Trend pulse animation */
@keyframes trendPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
.animate-trend {
  animation: trendPulse 1.2s infinite;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in,
  .animate-slide-in-right,
  .animate-fade-up,
  .dropdown-enter-active,
  .dropdown-leave-active {
    animation: none;
    transition: none;
    opacity: 1;
    transform: none;
  }
}
</style>

/* Shimmer effect for loading cards */
.shimmer {
  position: relative;
  overflow: hidden;
}
.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -150%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
  animation: shimmerMove 1.2s infinite;
}
@keyframes shimmerMove {
  100% {
    left: 100%;
  }
}

/* Fade transition for loader */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1);
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

