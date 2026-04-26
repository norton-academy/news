<template>
  <div class="w-full max-w-none">
    <!-- Welcome Section -->
    <div class="mb-8 animate-slide-in">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mt-1">High‑level management for your platform – only what matters.</p>
      <div class="flex items-center gap-2 mt-2 text-xs text-gray-400">
        <Clock :size="12" />
        <span>Last updated: {{ lastUpdated }}</span>
      </div>
    </div>

    <!-- Stat Cards Grid -->
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
        <AdminStatCard
          v-for="stat in enhancedStats"
          :key="stat.title"
          v-bind="stat"
        />
      </template>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Quick Actions (2/3) -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Quick Actions</h2>
          <NuxtLink to="/admin/all-actions" class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-1 transition-all hover:gap-2">
            View all
            <ArrowRight :size="16" />
          </NuxtLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AdminQuickActionCard
            v-for="(action, index) in quickActions"
            :key="action.title"
            v-bind="action"
            :style="{ animationDelay: `${index * 0.05}s` }"
          />
        </div>
      </div>

      <!-- Pending Tasks (1/3) -->
      <AdminPendingTasks :tasks="pendingTasks" />
    </div>

    <!-- Footer -->
    <footer class="mt-12 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>&copy; 2025 AdminCore. All rights reserved. | <NuxtLink to="/admin/privacy" class="hover:text-indigo-600 transition-colors">Privacy</NuxtLink></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ShoppingBag,
  ShieldCheck,
  Banknote,
  Package,
  Users,
  Megaphone,
  UserCheck,
  Box,
  ShoppingCart,
  HandCoins,
  Mail,
  LayoutGrid,
  ShieldAlert,
  ArrowRight,
  Clock
} from 'lucide-vue-next'

definePageMeta({
  layout: 'admin'
})

const loading = ref(true)
const lastUpdated = ref('')

const animatedStats = ref({
  orders: 0,
  kyc: 0,
  withdraw: 0,
  lowStock: 0,
  subscribers: 0,
  ads: 0
})

const enhancedStats = ref([
  {
    title: 'Total Orders',
    value: 1482,
    unit: '',
    trend: '↑ 8.2%',
    trendText: 'vs last month',
    progress: '68%',
    gradient: 'from-indigo-500 to-indigo-300',
    icon: ShoppingBag,
    animatedValue: animatedStats.value.orders
  },
  {
    title: 'KYC Pending',
    value: 24,
    unit: '',
    trend: '↑ 2',
    trendText: 'new this week',
    progress: '45%',
    gradient: 'from-amber-500 to-orange-500',
    icon: ShieldCheck,
    animatedValue: animatedStats.value.kyc
  },
  {
    title: 'Withdrawals',
    value: 12430,
    unit: '$',
    trend: '↓ 3%',
    trendText: 'this month',
    progress: '32%',
    gradient: 'from-rose-500 to-pink-500',
    icon: Banknote,
    animatedValue: animatedStats.value.withdraw
  },
  {
    title: 'Low Stock',
    value: 23,
    unit: '',
    trend: '↑ 5',
    trendText: 'needs action',
    progress: '76%',
    gradient: 'from-orange-500 to-red-500',
    icon: Package,
    animatedValue: animatedStats.value.lowStock
  },
  {
    title: 'Subscribers',
    value: 3245,
    unit: '',
    trend: '↑ 12%',
    trendText: 'growth',
    progress: '89%',
    gradient: 'from-emerald-500 to-teal-500',
    icon: Users,
    animatedValue: animatedStats.value.subscribers
  },
  {
    title: 'Active Ads',
    value: 8,
    unit: '',
    trend: '+2',
    trendText: 'this week',
    progress: '40%',
    gradient: 'from-cyan-500 to-blue-500',
    icon: Megaphone,
    animatedValue: animatedStats.value.ads
  }
])

const quickActions = [
  {
    title: 'KYC Requests',
    description: 'Verify user identities and documents',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    icon: UserCheck,
    link: '/admin/kyc',
    count: '24 pending'
  },
  {
    title: 'Manage Products',
    description: 'Inventory, pricing, and variants',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    icon: Box,
    link: '/admin/products',
    count: '1,284 total'
  },
  {
    title: 'Orders',
    description: 'Process and track customer orders',
    iconBg: 'bg-gradient-to-br from-amber-500 to-amber-600',
    icon: ShoppingCart,
    link: '/admin/orders',
    count: '1,482 total'
  },
  {
    title: 'Withdrawals',
    description: 'Payment requests and approvals',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    icon: HandCoins,
    link: '/admin/withdraw',
    count: '12 pending'
  },
  {
    title: 'Subscribers',
    description: 'Email list and campaigns',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    icon: Mail,
    link: '/admin/subscribers',
    count: '3,245 active'
  },
  {
    title: 'Page Builder',
    description: 'Drag & drop editor for pages',
    iconBg: 'bg-gradient-to-br from-fuchsia-500 to-fuchsia-600',
    icon: LayoutGrid,
    link: '/admin/page-builder',
    count: '5 published'
  }
]

const pendingTasks = [
  {
    title: 'KYC Verification',
    count: '24 pending requests',
    link: '/admin/kyc',
    bgClass: 'bg-yellow-50 dark:bg-yellow-900/20',
    iconBg: 'bg-yellow-100 dark:bg-yellow-800 text-yellow-600',
    icon: ShieldAlert
  },
  {
    title: 'Withdrawal Requests',
    count: '12 requests totaling $12,430',
    link: '/admin/withdraw',
    bgClass: 'bg-red-50 dark:bg-red-900/20',
    iconBg: 'bg-red-100 dark:bg-red-800 text-red-600',
    icon: Banknote
  },
  {
    title: 'Low Stock Alerts',
    count: '23 products below threshold',
    link: '/admin/products?filter=low-stock',
    bgClass: 'bg-orange-50 dark:bg-orange-900/20',
    iconBg: 'bg-orange-100 dark:bg-orange-800 text-orange-600',
    icon: Package
  },
  {
    title: 'Unread Messages',
    count: '8 contact form submissions',
    link: '/admin/contact',
    bgClass: 'bg-blue-50 dark:bg-blue-900/20',
    iconBg: 'bg-blue-100 dark:bg-blue-800 text-blue-600',
    icon: Mail
  }
]

onMounted(() => {
  const now = new Date()
  lastUpdated.value = now.toLocaleTimeString() + ' ' + now.toLocaleDateString()
  loading.value = false

  const targets = { orders: 1482, kyc: 24, withdraw: 12430, lowStock: 23, subscribers: 3245, ads: 8 }
  for (const key in targets) {
    const target = targets[key as keyof typeof targets]
    animatedStats.value[key as keyof typeof animatedStats.value] = key === 'withdraw' ? `$${target.toLocaleString()}` : target
  }
  enhancedStats.value.forEach((stat, index) => {
    const keys = ['orders', 'kyc', 'withdraw', 'lowStock', 'subscribers', 'ads']
    stat.animatedValue = animatedStats.value[keys[index] as keyof typeof animatedStats.value]
  })
})
</script>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}
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
  100% { left: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .animate-slide-in {
    animation: none;
    opacity: 1;
  }
}
</style>