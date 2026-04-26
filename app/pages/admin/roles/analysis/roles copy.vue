<template>
  <div class="w-full max-w-none animate-fade-in-up text-slate-300 font-sans">
    
    <div class="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/5 pb-8">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <div class="h-1 w-12 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
          <span class="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">System Analytics</span>
        </div>
        <h1 class="text-5xl font-black tracking-tighter text-white italic">
          ROLES_<span class="text-indigo-500">ANALYSIS</span>
        </h1>
        <p class="text-slate-500 text-xs font-mono mt-2 uppercase tracking-widest">
          Scanning core permissions and access trends...
        </p>
      </div>

      <NuxtLink
        to="/admin/roles/analytics"
        class="group px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all flex items-center gap-3"
      >
        <LucideArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Return to Nexus
      </NuxtLink>
    </div>

    <div class="mb-10 relative group">
      <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-transparent blur-lg opacity-50"></div>
      <AnalyticsDateRangeFilter
        v-model:range="range"
        v-model:date-from="dateFrom"
        v-model:date-to="dateTo"
        class="relative bg-black/40 backdrop-blur-xl border border-white/5 p-2 rounded-2xl"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
      <div v-for="stat in statsCards" :key="stat.label" 
        class="relative overflow-hidden bg-slate-900/40 border border-white/5 p-6 rounded-3xl group hover:border-indigo-500/50 transition-all"
      >
        <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 group-hover:text-indigo-500 transition-all">
          <component :is="stat.icon" class="w-12 h-12" />
        </div>
        
        <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">{{ stat.label }}</p>
        <div class="flex items-baseline gap-3">
          <p class="text-4xl font-black text-white tracking-tighter italic">{{ stat.value }}</p>
          <p :class="['text-[10px] font-bold px-2 py-0.5 rounded', stat.trendUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400']">
            {{ stat.trend }}
          </p>
        </div>
        
        <div class="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            class="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all duration-1000" 
            :style="{ width: stat.percent + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <div class="relative bg-[#080808] border border-white/5 rounded-[40px] p-8 lg:p-12 overflow-hidden group">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 40px 40px;"></div>
      
      <div class="relative z-10">
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
              <LucideActivity class="w-5 h-5 text-indigo-500 animate-pulse" />
            </div>
            <div>
              <h3 class="text-xl font-black text-white tracking-tight uppercase italic">Live_Role_Feed</h3>
              <p class="text-[10px] font-mono text-slate-500">Frequency: {{ range.toUpperCase() }} // Mode: Linear_Scan</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recording</span>
          </div>
        </div>

        <div class="h-[400px] w-full">
          <LineChart
            :labels="chartLabels"
            dataset-label="ACTIVE_NODES"
            :data="chartData"
            color="#6366f1"
            :grid-color="isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)'"
            class="filter drop-shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          />
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-slate-600">
        <span>STR_DATA_BYTES: 1024KB</span>
        <span>LATENCY: 12MS</span>
        <span class="text-indigo-500/50">CRC_OK</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  LucideArrowLeft, 
  LucideShield, 
  LucideZap, 
  LucidePlusCircle, 
  LucideActivity 
} from 'lucide-vue-next'
// Assuming useRole is your composable
// const { roles } = useRole() 

definePageMeta({
  layout: 'admin' // Ensure your admin layout follows the Play Style
})

const range = ref('month')
const dateFrom = ref('')
const dateTo = ref('')

// Mocking roles for standalone demo
const roles = ref([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }])

const statsCards = computed(() => [
  { 
    label: 'Total Clusters', 
    value: totalRoles.value, 
    icon: LucideShield, 
    trend: '↑ 2', 
    trendUp: true, 
    percent: 85 
  },
  { 
    label: 'Active Sync', 
    value: activeRoles.value, 
    icon: LucideZap, 
    trend: '↑ 1', 
    trendUp: true, 
    percent: 92 
  },
  { 
    label: 'New Sequences', 
    value: newRolesCount.value, 
    icon: LucidePlusCircle, 
    trend: 'STABLE', 
    trendUp: false, 
    percent: 40 
  }
])

// Logic remains the same, styling handles the transformation
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

const totalRoles = computed(() => roles.value.length)
const activeRoles = computed(() => roles.value.length - 1)
const newRolesCount = computed(() => 2)

const chartLabels = computed(() => {
  if (range.value === 'day') return ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']
  if (range.value === 'week') return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  if (range.value === 'month') return Array.from({ length: 12 }, (_, i) => `SEQ_${i + 1}`)
  return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
})

const chartData = computed(() => {
  const len = chartLabels.value.length
  return Array.from({ length: len }, (_, i) => Math.floor(10 + i * 2 + Math.random() * 10))
})
</script>

<style scoped>
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>