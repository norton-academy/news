<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ChevronRight,
  Calendar,
  Eye,
  Trophy,
  Zap,
  TrendingUp,
  Clock,
  Bookmark,
  Share2,
  Flame,
  Star,
  Newspaper,
  DollarSign,
  Briefcase
} from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

// ─── Sector Accent Mappings ──────────────────────────────────────────────────
const SECTOR_DOT: Record<string, string> = {
  Macroeconomy:   '#dc2626', // Crimson Red
  Finance:        '#b91c1c', // Dark Red
  Infrastructure: '#991b1b', // Wine Red
  Trade:          '#ea580c', // Secondary Accent Orange
  Innovation:     '#475569', // Slate Accent
}

// ─── Filter Navigation State Engine ──────────────────────────────────────────
type HubFilter = 'all' | 'macro' | 'banking' | 'real_estate' | 'logistics' | 'startups'

interface FilterTab {
  key: HubFilter
  label: string
  labelKm: string
  icon: unknown
  description: string
}

const HUB_FILTERS: FilterTab[] = [
  { key: 'all',          label: 'All Sectors',     labelKm: 'គ្រប់វិស័យ',    icon: Newspaper,  description: 'Comprehensive economic snapshot overview' },
  { key: 'macro',        label: 'Macro Parameters', labelKm: 'ម៉ាក្រូសេដ្ឋកិច្ច', icon: TrendingUp, description: 'Inflation tracking, revised GDP targets, and growth metrics' },
  { key: 'banking',      label: 'Banking & Tech',  labelKm: 'ធនាគារ',       icon: Zap,        description: 'Cross-border digital settlement networks, LPCO liquidity, and KHQR' },
  { key: 'real_estate',  label: 'Infra & Estate',   labelKm: 'អចលនទ្រព្យ',    icon: DollarSign, description: 'Asset tier performance grids, capital gains deferrals, and structural yield maps' },
  { key: 'logistics',    label: 'Trade Corridors', labelKm: 'ពាណិជ្ជកម្ម',   icon: Flame,      description: 'Export expansion metrics, rubber pricing, and primary network inflows' },
  { key: 'startups',     label: 'Innovation Hub',  labelKm: 'នវានុវត្តន៍',    icon: Star,       description: 'Policy roadmap timelines, technical sandboxes, and early-stage seed metrics' },
]

const activeFilter = ref<HubFilter>('all')

// ─── Dynamic Intelligence Entries ───────────────────────────────────────────
const economicBriefs = ref([
  {
    id: 1,
    title: "Cambodia Adjusts 2026 Growth Projections to 4.2% Amid Rising Energy Costs",
    excerpt: "The Ministry of Economy and Finance officially revised down the medium-term real GDP trajectory from 5.0% to 4.2%. Adjustments are driven by global energy trends, inflationary pressures, and strategic border revisions.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=500&fit=crop",
    sector: "Macroeconomy",
    source: "MEF Policy Release",
    date: "May 22, 2026",
    readTime: "5 min",
    impactScore: "High Impact",
    isBreaking: true,
    isFeatured: true,
    metric: "4.2% GDP Target"
  },
  {
    id: 2,
    title: "Cross-Border Settlement Scaling: India-Cambodia KHQR Phase 1 Live",
    excerpt: "Under supervised central bank execution, direct transactional settlement tools are scaling to allow zero-friction merchant mapping without intermediate conversion layers, pushing non-cash retail footprints.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
    sector: "Finance",
    source: "NBC Operations",
    date: "June 08, 2026",
    readTime: "4 min",
    impactScore: "Digital Sync",
    isBreaking: false,
    isFeatured: false,
    metric: "Bilateral QR"
  },
  {
    id: 3,
    title: "Ministry Defers 20% Capital Gains Tax Implementation Until Jan 2027",
    excerpt: "Regulatory adjustments insulate immediate developer transactional continuity, shifting commercial priorities toward affordable housing, industrial logistics developments, and urban growth segments.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    sector: "Infrastructure",
    source: "GDT Directive",
    date: "June 06, 2026",
    readTime: "4 min",
    impactScore: "Tax Relief",
    isBreaking: false,
    isFeatured: false,
    metric: "Deferred 2027"
  },
  {
    id: 4,
    title: "Export Shipments Touch $11.12B Marking 21.7% Year-on-Year Expansion Curve",
    excerpt: "Secondary industrial clusters see double-digit surges, led by specialized automotive tire production plants and high-velocity agricultural trade channels to regional trade blocs.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&h=400&fit=crop",
    sector: "Trade",
    source: "Customs Registry",
    date: "June 05, 2026",
    readTime: "3 min",
    impactScore: "+21.7% YoY",
    isBreaking: true,
    isFeatured: false,
    metric: "$11.12B Shipped"
  },
  {
    id: 5,
    title: "National Digital Roadmap Activates Coordinated Policy Matrix for Startups",
    excerpt: "The multi-agency framework implements technical sandbox architectures alongside 3-to-5 year compliance grace horizons to clear structural funding bottlenecks across local incubators.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    sector: "Innovation",
    source: "MISTI Blueprint",
    date: "June 04, 2026",
    readTime: "3 min",
    impactScore: "Sandbox Live",
    isBreaking: false,
    isFeatured: false,
    metric: "Seed Support"
  },
  {
    id: 6,
    title: "Fuel Parameter Pressures Drive Localized Regular Gas to 4,400 Riels per Liter",
    excerpt: "Global supply disruptions impact heavy shipping lane operational parameters. Domestic freight companies initiate dynamic route optimization protocols to defend current profit margins.",
    image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&h=400&fit=crop",
    sector: "Macroeconomy",
    source: "Commerce Log",
    date: "June 02, 2026",
    readTime: "4 min",
    impactScore: "Volatile",
    isBreaking: false,
    isFeatured: false,
    metric: "4,400 KHR/L"
  },
  {
    id: 7,
    title: "National Bank of Cambodia Reduces LPCO 7-Day Tenor Rates to 2.50%",
    excerpt: "The Monetary Policy Committee announced a tactical reduction in standard liquidity provision rates from 2.75% to 2.50% to manage system liquidity and improve commercial lending capacity.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=600&h=400&fit=crop",
    sector: "Finance",
    source: "NBC Announcement",
    date: "May 12, 2026",
    readTime: "3 min",
    impactScore: "Monetary Ease",
    isBreaking: false,
    isFeatured: false,
    metric: "2.50% LPCO"
  },
  {
    id: 8,
    title: "Industrial Manufacturing Outlook Projects 7.3% Output Boost via Non-Garment Units",
    excerpt: "Data from the Asian Development Bank forecasts that non-garment manufacturing segments, specifically automotive tires, furniture, and electronic components, are transforming the industrial baseline.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    sector: "Trade",
    source: "ADB Outlook",
    date: "May 08, 2026",
    readTime: "4 min",
    impactScore: "+7.3% Growth",
    isBreaking: false,
    isFeatured: false,
    metric: "Industrial Shift"
  },
  {
    id: 9,
    title: "Deep-Sea Port Upgrades Accelerate Multi-Modal Logistics Corridors",
    excerpt: "Construction schedules accelerate along primary coastal supply networks. The infrastructure overhaul aims to cut container transit rates and position international gateways directly against regional peers.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&h=400&fit=crop",
    sector: "Infrastructure",
    source: "MPWT Project Registry",
    date: "April 28, 2026",
    readTime: "5 min",
    impactScore: "Structural",
    isBreaking: false,
    isFeatured: false,
    metric: "Logistics Link"
  },
  {
    id: 10,
    title: "Agriculture Sector Target Set at 0.9% Fueled by Rice & Cashew Export Demands",
    excerpt: "Sustainable agricultural initiatives and tech-enabled farming investments aim to stabilize crop returns despite unpredictable climate parameters and regional logistical changes.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
    sector: "Macroeconomy",
    source: "MAFF Database",
    date: "April 15, 2026",
    readTime: "3 min",
    impactScore: "Stable",
    isBreaking: false,
    isFeatured: false,
    metric: "Agri Export"
  }
])

// ─── Real Estate Analytics Sub-Data ──────────────────────────────────────────
const realEstateMatrix = ref([
  { tier: 'Premium Core Zone', location: 'BKK1, Tonle Bassac Districts', price: '$2,300 – $3,200 / sqm', yield: '4.5% – 6.0%' },
  { tier: 'Mid-Tier Residential', location: 'Toul Kork, Sen Sok Corridors', price: '$1,400 – $1,900 / sqm', yield: '5.5% – 7.0%' },
  { tier: 'Emerging Sub-Markets', location: 'Russian Market (TTP Hub)', price: '$1,200 – $1,600 / sqm', yield: '5.5% – 7.0%' }
])

// ─── Global Trade Partner Flows ──────────────────────────────────────────────
const tradePartners = ref([
  { name: 'China Bilateral Network', value: '$5.15 Billion', percentage: 'w-full', color: 'bg-red-600' },
  { name: 'United States Corridor', value: '$3.48 Billion', percentage: 'w-2/3', color: 'bg-red-700' },
  { name: 'Vietnam Inter-Hub Trade', value: '$2.26 Billion', percentage: 'w-2/5', color: 'bg-stone-600' }
])

// ─── Computed Processing Engines ────────────────────────────────────────────
const breakingBriefs = computed(() => 
  economicBriefs.value.filter(b => b.isBreaking)
)

const filteredBriefs = computed(() => {
  const all = economicBriefs.value
  switch (activeFilter.value) {
    case 'macro':       return all.filter(b => b.sector === 'Macroeconomy')
    case 'banking':     return all.filter(b => b.sector === 'Finance')
    case 'real_estate': return all.filter(b => b.sector === 'Infrastructure')
    case 'logistics':   return all.filter(b => b.sector === 'Trade')
    case 'startups':    return all.filter(b => b.sector === 'Innovation')
    default:            return [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }
})

const activeFilterTab = computed(() => 
  HUB_FILTERS.find(f => f.key === activeFilter.value)!
)

const featuredBrief = computed(() => 
  filteredBriefs.value.find(b => b.isFeatured) ?? filteredBriefs.value[0] ?? null
)

const secondaryBriefs = computed(() => {
  const featured = featuredBrief.value
  return filteredBriefs.value.filter(b => b.id !== featured?.id)
})

// ─── UI Utility Helpers ──────────────────────────────────────────────────────
function setFilter(key: HubFilter) {
  activeFilter.value = key
}

function sectorColor(sector: string): string {
  return SECTOR_DOT[sector] ?? '#64748b'
}

function sectorBadgeClass(sector: string): string {
  const map: Record<string, string> = {
    Macroeconomy:   'text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/30',
    Finance:        'text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-950/30 border border-red-200/50 dark:border-red-900/20',
    Infrastructure: 'text-stone-700 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/40',
    Trade:          'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border border-orange-100 dark:border-orange-900/30',
    Innovation:     'text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/40',
  }
  return map[sector] ?? 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/60 dark:bg-slate-950 transition-colors duration-500 font-sans antialiased">
    
    <!-- Realtime Flash Ticker Bar -->
    <div 
      v-if="breakingBriefs.length" 
      class="bg-slate-900 text-white text-xs font-semibold h-11 flex items-center relative overflow-hidden z-30 shadow-md border-b border-slate-800"
    >
      <div class="absolute left-0 top-0 bottom-0 px-4 bg-red-600 text-white flex items-center gap-1.5 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.3)] select-none">
        <Zap class="size-3.5 fill-white animate-pulse text-white" />
        <span class="tracking-wider uppercase text-[10px] font-black">Market Alert</span>
      </div>
      
      <div class="marquee-track flex items-center pl-36 hover:[animation-play-state:paused]">
        <div class="flex items-center gap-16 whitespace-nowrap animate-marquee">
          <NuxtLink 
            v-for="b in [...breakingBriefs, ...breakingBriefs]" 
            :key="b.id" 
            class="flex items-center gap-2 hover:text-red-400 transition-colors font-medium text-xs tracking-tight group"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-red-500 opacity-80 group-hover:scale-125 transition-transform"></span>
            <span class="text-slate-400 font-semibold uppercase text-[10px] bg-slate-800 px-1.5 py-0.5 rounded mr-1 border border-slate-700">{{ b.sector }}</span>
            {{ b.title }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main Dynamic Core Layout Frame -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <!-- Hub Introduction Header Block -->
      <header class="mb-10 max-w-3xl">
        <span class="text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest block mb-2">Macroeconomic Intelligence Hub</span>
        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight sm:text-4xl">Cambodia Data Dispatch</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          Consolidating updated economic performance indicators, infrastructure investments, central bank monetary adjustments, and regional cross-border payment logs.
        </p>
      </header>

      <!-- Multi-Tab Categorization Track -->
      <div class="flex items-center justify-between mb-8 border-b border-slate-200/80 dark:border-slate-800/80 relative">
        <div class="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0 relative w-full lg:w-auto">
          <button 
            v-for="tab in HUB_FILTERS" 
            :key="tab.key" 
            @click="setFilter(tab.key)"
            class="group relative flex items-center gap-2 px-4 py-4 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 z-10"
            :class="activeFilter === tab.key ? 'text-red-600 dark:text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            :title="tab.description"
          >
            <component 
              :is="tab.icon" 
              class="size-3.5 transition-transform duration-300"
              :class="activeFilter === tab.key ? 'scale-110' : 'group-hover:scale-105'" 
            />
            <span>{{ tab.label }}</span>
            
            <span 
              v-if="activeFilter === tab.key" 
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500 origin-left animate-line-slide"
            ></span>
          </button>
        </div>
        
        <p class="hidden lg:block text-xs text-slate-400 dark:text-slate-500 font-medium italic opacity-90">
          {{ activeFilterTab.description }}
        </p>
      </div>

      <!-- Main Asymmetric Workspace Layout -->
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
        
        <!-- Primary Left Content Core Stream -->
        <div class="xl:col-span-3">
          <transition name="fade-layout" mode="out-in">
            <div :key="activeFilter">
              
              <!-- Empty Analytical Fallback State -->
              <div v-if="filteredBriefs.length === 0" class="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-xs">
                <div class="size-14 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl mb-4 shadow-inner">
                  📊
                </div>
                <h4 class="text-slate-800 dark:text-slate-200 font-bold text-base">No telemetry under this specific matrix sector</h4>
                <p class="text-slate-400 dark:text-slate-500 text-xs mt-1 max-w-sm leading-relaxed">
                  Live pipelines are performing algorithmic sorting operations. Try changing parameters to see other metrics.
                </p>
                <button @click="setFilter('all')" class="mt-5 px-5 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:opacity-90 active:scale-95 transition-all">
                  Show All Data Blocks
                </button>
              </div>

              <!-- Content Render Grid Block -->
              <div v-else class="space-y-8">
                
                <!-- HERO: Single Spotlight Focus Block -->
                <div 
                  v-if="featuredBrief"
                  class="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-lg transition-all duration-300"
                >
                  <div class="grid grid-cols-1 md:grid-cols-5 min-h-[280px]">
                    <div class="relative md:col-span-3 overflow-hidden bg-slate-100 dark:bg-slate-800 h-52 md:h-auto">
                      <img 
                        :src="featuredBrief.image" 
                        :alt="featuredBrief.title"
                        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                      />
                      <span class="absolute top-3 left-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur text-white text-[9px] font-black px-2 py-0.5 rounded border border-slate-700/60 uppercase tracking-widest shadow-md">
                        <span class="size-1.5 rounded-full bg-red-500 animate-ping"></span> Live Briefing
                      </span>
                    </div>
                    
                    <div class="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/40 dark:from-slate-900 dark:to-slate-900/60">
                      <div>
                        <div class="flex items-center gap-2 mb-3">
                          <span class="text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md" :class="sectorBadgeClass(featuredBrief.sector)">
                            {{ featuredBrief.sector }}
                          </span>
                          <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <span class="size-1.5 rounded-full" :style="{ background: sectorColor(featuredBrief.sector) }"></span>
                            {{ featuredBrief.source }}
                          </span>
                        </div>
                        <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 tracking-tight line-clamp-3">
                          {{ featuredBrief.title }}
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-3 font-normal">
                          {{ featuredBrief.excerpt }}
                        </p>
                      </div>
                      
                      <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        <div class="flex items-center gap-3 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                          <span class="flex items-center gap-0.5"><Clock class="size-3" /> {{ featuredBrief.readTime }}</span>
                          <span class="flex items-center gap-0.5 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded font-bold">{{ featuredBrief.metric }}</span>
                        </div>
                        <span class="flex items-center gap-0.5 text-red-600 dark:text-red-500 text-xs font-bold transition-all duration-200 group-hover:gap-1.5">
                          Inspect Layer <ChevronRight class="size-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Structured Dynamic Divider -->
                <div class="flex items-center gap-4 select-none pt-2">
                  <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Sourced Telemetry Stream</span>
                  <div class="flex-1 h-px bg-slate-200/80 dark:bg-slate-800/80"></div>
                </div>

                <!-- SECONDARY MESH: Core Structured Grid Stream -->
                <div class="relative">
                  <TransitionGroup 
                    name="card-grid" 
                    tag="div" 
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <article 
                      v-for="brief in secondaryBriefs" 
                      :key="brief.id"
                      class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/70 hover:border-slate-200 dark:hover:border-slate-700 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div class="relative overflow-hidden h-40 bg-slate-100 dark:bg-slate-800 shrink-0">
                          <img 
                            :src="brief.image" 
                            :alt="brief.title"
                            loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                          />
                          <span 
                            class="absolute top-3 left-3 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow-xs"
                            :class="sectorBadgeClass(brief.sector)"
                          >
                            {{ brief.sector }}
                          </span>
                        </div>

                        <div class="p-5 pb-0">
                          <div class="flex items-center gap-2 mb-2 text-[10px]">
                            <span class="size-1.5 rounded-full shrink-0" :style="{ background: sectorColor(brief.sector) }"></span>
                            <span class="font-bold text-slate-800 dark:text-slate-300">{{ brief.source }}</span>
                            <span class="text-slate-300 dark:text-slate-700">·</span>
                            <span class="text-slate-400 dark:text-slate-500 flex items-center gap-0.5 font-medium">
                              <Calendar class="size-3" /> {{ brief.date }}
                            </span>
                          </div>

                          <h3 class="text-xs font-bold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 tracking-tight">
                            {{ brief.title }}
                          </h3>
                          <p class="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal opacity-90">
                            {{ brief.excerpt }}
                          </p>
                        </div>
                      </div>

                      <div class="p-5 pt-4 mt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between">
                        <div class="flex items-center gap-2 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                          <span class="flex items-center gap-0.5"><Clock class="size-3" /> {{ brief.readTime }}</span>
                          <span class="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-bold text-[9px]">{{ brief.impactScore }}</span>
                        </div>
                        <div class="flex items-center gap-1 text-slate-400 dark:text-slate-600">
                          <button class="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" aria-label="Save Info">
                            <Bookmark class="size-3.5" />
                          </button>
                          <button class="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors" aria-label="Share Briefing">
                            <Share2 class="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </TransitionGroup>
                </div>

                <!-- Footer Telemetry Load Action -->
                <div class="pt-2 text-center">
                  <button class="inline-flex items-center gap-1.5 px-5 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-white dark:hover:bg-slate-900 shadow-xs hover:shadow-sm active:scale-98 transition-all duration-200 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200">
                    <span>Fetch Historical Records</span>
                    <ChevronRight class="size-3.5" />
                  </button>
                </div>

                <!-- CONTEXT COMPONENT: Embedded Structural Real Estate Matrix (Shows only when Relevant or 'All') -->
                <div v-if="activeFilter === 'all' || activeFilter === 'real_estate'" class="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-xs mt-6">
                  <div class="flex items-center gap-2 mb-4">
                    <Briefcase class="size-4 text-red-600" />
                    <h3 class="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Phnom Penh Core Commercial Yield Grid</h3>
                  </div>
                  <div class="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                    <table class="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                          <th class="px-4 py-3">Asset Classification Tier</th>
                          <th class="px-4 py-3">Spatial Corridor Coverage</th>
                          <th class="px-4 py-3">Value Target Window</th>
                          <th class="px-4 py-3 text-right">Yield Spread</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-600 dark:text-slate-400">
                        <tr v-for="item in realEstateMatrix" :key="item.tier" class="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
                          <td class="px-4 py-3 font-bold text-slate-900 dark:text-white">{{ item.tier }}</td>
                          <td class="px-4 py-3">{{ item.location }}</td>
                          <td class="px-4 py-3">{{ item.price }}</td>
                          <td class="px-4 py-3 text-right font-semibold text-slate-900 dark:text-white">{{ item.yield }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          </transition>
        </div>

        <!-- Right System Monitor Sidebar Components -->
        <aside class="xl:col-span-1 space-y-6">

          <!-- Dynamic Allocation Radar Widget -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-xs">
            <div class="flex items-center gap-2 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
              <TrendingUp class="size-3.5 text-red-600" />
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Primary Inflow Corridors</span>
            </div>
            <div class="p-4 space-y-3.5">
              <div v-for="partner in tradePartners" :key="partner.name" class="space-y-1.5">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-slate-500 font-medium">{{ partner.name }}</span>
                  <span class="font-bold text-slate-900 dark:text-white">{{ partner.value }}</span>
                </div>
                <div class="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full">
                  <div :class="[partner.color, partner.percentage]" class="h-1.5 rounded-full transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Editorial Analytical Showcase Block -->
          <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 shadow-md">
            <div class="relative h-32 overflow-hidden bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1543993452-315c2f5b5f3d?w=400&h=250&fit=crop" 
                alt="Infrastructure Breakdown Analysis"
                class="w-full h-full object-cover opacity-40"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <span class="absolute bottom-3 left-4 flex items-center gap-1 text-red-400 text-[9px] font-extrabold uppercase tracking-widest">
                <Trophy class="size-3" /> Technical Deep Dive
              </span>
            </div>
            
            <div class="p-4 sm:p-5">
              <h3 class="text-xs font-bold text-white leading-snug mb-1.5 tracking-tight">
                Evaluating the 2026-2030 Special Economic Zone Multi-Modal Connectivity Masterplan
              </h3>
              <p class="text-[11px] text-slate-400 leading-relaxed line-clamp-3 mb-4 font-light opacity-95">
                An executive audit reviewing spatial logistics corridors, secondary processing clusters, and duty exemptions.
              </p>
              
              <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <div class="flex items-center gap-2">
                  <div class="size-6 bg-red-700 text-white font-black text-[9px] rounded-full flex items-center justify-center ring-2 ring-slate-800">SR</div>
                  <div>
                    <p class="text-[9px] font-bold text-slate-200">S. Rithipong</p>
                    <p class="text-[8px] text-slate-500 font-medium">8 min verification</p>
                  </div>
                </div>
                <button class="flex items-center gap-0.5 text-xs text-red-400 font-bold hover:text-red-300 transition-colors group/btn">
                  Open <ChevronRight class="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Institutional Intelligence Sign-up Portal -->
          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 shadow-xs relative overflow-hidden">
            <div class="flex items-center gap-1.5 mb-1.5">
              <span class="text-sm">📬</span>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Executive Dispatch</span>
            </div>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Receive raw macro indicators, infrastructure yields, and central bank parameters compressed and delivered directly to your workstation layout weekly.
            </p>
            <div class="space-y-2">
              <input 
                type="email" 
                placeholder="analyst@domain.com"
                class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
              <button class="w-full text-xs font-bold py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors duration-200 active:scale-98">
                Subscribe Telemetry
              </button>
            </div>
          </div>

        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── High-Performance Fluid Component Morph Transitions ────────────────── */
.card-grid-enter-active,
.card-grid-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.97);
}
.card-grid-move {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-leave-active {
  position: absolute !important;
  visibility: hidden;
  width: 100%;
  max-width: 280px; 
}

/* Horizontal Line Insertion Effect */
@keyframes lineSlide {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}
.animate-line-slide {
  animation: lineSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Complete Tab Routing Layout Swaps */
.fade-layout-enter-active,
.fade-layout-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(3px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}

/* ── Seamless Ticker Rail Architecture ─────────────────────────────── */
.marquee-track {
  width: 100%;
  display: flex;
}
@keyframes marqueeAnimation {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
.animate-marquee {
  animation: marqueeAnimation 38s linear infinite;
}

/* Layout Utilities override */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>