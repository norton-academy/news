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
} from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

// ─── Category dot colors (for source badges only) ───────────────────────────
const CATEGORY_DOT: Record<string, string> = {
  Politics:      '#dc2626',
  Business:      '#2563eb',
  Technology:    '#7c3aed',
  Sports:        '#16a34a',
  Health:        '#db2777',
  Entertainment: '#f97316',
  Education:     '#0891b2',
  Agriculture:   '#65a30d',
}

// ─── Feed Filters ───────────────────────────────────────────────────────────
type FeedFilter = 'latest' | 'popular' | 'trending' | 'breaking' | 'editors_pick'

interface FilterTab {
  key: FeedFilter
  label: string
  labelKm: string
  icon: unknown
  description: string
}

const FEED_FILTERS: FilterTab[] = [
  { key: 'latest',       label: 'Latest',        labelKm: 'ថ្មីបំផុត',    icon: Newspaper,   description: 'Most recent stories'          },
  { key: 'popular',      label: 'Popular',       labelKm: 'ពេញនិយម',     icon: Flame,        description: 'Most read today'               },
  { key: 'trending',     label: 'Trending',      labelKm: 'និន្នាការ',    icon: TrendingUp,   description: 'Rising fast in last 6 hours'   },
  { key: 'breaking',     label: 'Breaking',      labelKm: 'បន្ទាន់',     icon: Zap,          description: 'Breaking news only'            },
  { key: 'editors_pick', label: "Editor's Pick", labelKm: 'ជ្រើសរើស',    icon: Star,         description: 'Hand-picked by our editors'    },
]

// ─── State ─────────────────────────────────────────────────────────────────
const activeFilter = ref<FeedFilter>('latest')

// ─── Articles ──────────────────────────────────────────────────────────────
const articles = ref([
  {
    id: 1,
    title: "Cambodia's Economy Shows Strong Recovery with 6% GDP Growth in Q1 2026",
    excerpt: "The Ministry of Economy and Finance reports robust performance across tourism, manufacturing, and digital services sectors, with foreign direct investment rising 18% year-on-year.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=500&fit=crop",
    category: "Business",
    source: "Fresh News",
    date: "May 28, 2026",
    readTime: "4 min",
    views: "2.4k",
    isBreaking: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: "New Tech Hub Launch in Phnom Penh Attracts Regional Startups",
    excerpt: "The 'Silicon Temple' innovation center aims to foster digital talent and cross-border collaboration across Southeast Asia.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    category: "Technology",
    source: "VOD Khmer",
    date: "May 27, 2026",
    readTime: "3 min",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Angkor Wat Conservation Receives $10M Global Heritage Fund",
    excerpt: "International partners accelerate preservation efforts ahead of the 2027 UNESCO review cycle.",
    image: "https://images.unsplash.com/photo-1563351660-502e1f5c5d5c?w=600&h=400&fit=crop",
    category: "Politics",
    source: "RFA Khmer",
    date: "May 26, 2026",
    readTime: "5 min",
    views: "3.2k",
    isBreaking: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Cambodian Football Team Prepares for AFF Championship Semifinals",
    excerpt: "National squad intensifies training under new head coach targeting historic semifinal appearance.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop",
    category: "Sports",
    source: "Dap News",
    date: "May 25, 2026",
    readTime: "3 min",
    views: "4.1k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Universal Healthcare Expansion Announced for Rural Provinces",
    excerpt: "New government initiative to provide coverage to 2 million citizens by end of year.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    category: "Health",
    source: "Fresh News",
    date: "May 24, 2026",
    readTime: "4 min",
    views: "1.5k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: "Khmer Film Wins Best Director at Busan International Film Festival",
    excerpt: "'Last Night in Siem Reap' becomes the first Cambodian film to win in the main competition.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
    category: "Entertainment",
    source: "VOD Khmer",
    date: "May 23, 2026",
    readTime: "3 min",
    views: "2.2k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Solar Farm Network Across 8 Provinces Achieves Renewable Energy Milestone",
    excerpt: "Government partnership with private sector puts Cambodia ahead of its 30% target for 2027.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    category: "Technology",
    source: "Kohsantepheap",
    date: "May 22, 2026",
    readTime: "5 min",
    views: "1.9k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: "EU Trade Deal Gives Cambodian Rice Tariff-Free Access to European Markets",
    excerpt: "Fragrant rice and cashew exports expected to grow 40% following the new bilateral agreement.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb221f7a1?w=600&h=400&fit=crop",
    category: "Agriculture",
    source: "RFA Khmer",
    date: "May 21, 2026",
    readTime: "4 min",
    views: "2.7k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "Digital Literacy Program Reaches 200,000 Students in Remote Schools",
    excerpt: "Tablet distribution initiative bridges the urban-rural education divide across 14 provinces.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    category: "Education",
    source: "Dap News",
    date: "May 20, 2026",
    readTime: "3 min",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Cambodia Rice Exporters Target Expanding Gulf Markets",
    excerpt: "Premium Cambodian fragrant rice gaining significant share in Saudi Arabia and UAE supermarkets.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    category: "Agriculture",
    source: "Fresh News",
    date: "May 19, 2026",
    readTime: "3 min",
    views: "1.2k",
    isBreaking: false,
    isFeatured: false,
  }
])

// ─── Computed ───────────────────────────────────────────────────────────────
const breakingArticles = computed(() =>
  articles.value.filter(a => a.isBreaking)
)

const filteredArticles = computed(() => {
  const all = articles.value
  switch (activeFilter.value) {
    case 'latest':
      return [...all].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    case 'popular':
      return [...all].sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    case 'trending':
      return [...all].sort((a, b) => parseFloat(b.views) - parseFloat(a.views)).slice(0, 6)
    case 'breaking':
      return all.filter(a => a.isBreaking)
    case 'editors_pick':
      return all.filter(a => a.isFeatured)
    default:
      return all
  }
})

const activeFilterTab = computed(() =>
  FEED_FILTERS.find(f => f.key === activeFilter.value)!
)

const featuredArticle = computed(() =>
  filteredArticles.value.find(a => a.isFeatured) ?? filteredArticles.value[0] ?? null
)

const secondaryArticles = computed(() => {
  const featured = featuredArticle.value
  return filteredArticles.value
    .filter(a => a.id !== featured?.id)
    .slice(0, 6)
})

const trendingArticles = computed(() =>
  [...articles.value].sort((a, b) =>
    parseFloat(b.views) - parseFloat(a.views)
  ).slice(0, 5)
)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function setFilter(key: FeedFilter) {
  activeFilter.value = key
}

function categoryDot(cat: string): string {
  return CATEGORY_DOT[cat] ?? '#64748b'
}

function categoryTextClass(cat: string): string {
  const map: Record<string, string> = {
    Politics:      'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40',
    Business:      'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40',
    Technology:    'text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40',
    Sports:        'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/40',
    Health:        'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40',
    Entertainment: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40',
    Education:     'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40',
    Agriculture:   'text-lime-700 dark:text-lime-400 bg-lime-50 dark:bg-lime-950/40',
  }
  return map[cat] ?? 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors duration-500">

    <div
      v-if="breakingArticles.length"
      class="bg-red-600 text-white text-xs font-semibold h-10 flex items-center relative overflow-hidden z-30 shadow-md"
    >
      <div class="absolute left-0 top-0 bottom-0 px-4 bg-red-700 flex items-center gap-1.5 z-10 shadow-[4px_0_12px_rgba(0,0,0,0.15)] select-none">
        <Zap class="size-3.5 fill-white animate-pulse" />
        <span class="tracking-wider uppercase text-[11px] font-black">Breaking</span>
      </div>
      
      <div class="marquee-track flex items-center pl-32 hover:[animation-play-state:paused]">
        <div class="flex items-center gap-16 whitespace-nowrap animate-marquee">
          <NuxtLink
            v-for="a in [...breakingArticles, ...breakingArticles]"
            :key="a.id"
            :to="`/article/${a.id}`"
            class="flex items-center gap-2 hover:text-slate-200 transition-colors font-medium text-sm group"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:scale-125 transition-transform"></span>
            {{ a.title }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <div class="flex items-center justify-between mb-8 border-b border-slate-200/60 dark:border-slate-800/80 relative">
        <div class="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0 relative">
          <button
            v-for="tab in FEED_FILTERS"
            :key="tab.key"
            @click="setFilter(tab.key)"
            class="group relative flex items-center gap-2 px-5 py-3.5 text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-95 z-10"
            :class="activeFilter === tab.key ? 'text-red-600 dark:text-red-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'"
            :title="tab.description"
          >
            <component
              :is="tab.icon"
              class="size-4 transition-transform duration-300 ease-out"
              :class="activeFilter === tab.key ? 'scale-110 rotate-3' : 'group-hover:scale-110 group-hover:-rotate-3'"
            />
            <span>{{ tab.label }}</span>
            <span v-if="tab.key === 'breaking' && breakingArticles.length" class="inline-flex items-center justify-center size-4 text-[9px] font-black bg-red-600 text-white rounded-full animate-bounce">
              {{ breakingArticles.length }}
            </span>

            <span 
              v-if="activeFilter === tab.key"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 dark:bg-red-500 origin-left animate-line-slide"
            ></span>
          </button>
        </div>

        <p class="hidden lg:block text-xs text-slate-400 dark:text-slate-500 font-medium italic opacity-85">
          {{ activeFilterTab.description }}
        </p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

        <div class="xl:col-span-3">
          <transition name="fade-layout" mode="out-in">
            <div :key="activeFilter">

              <div v-if="filteredArticles.length === 0" class="flex flex-col items-center justify-center py-28 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8 shadow-xs">
                <div class="size-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-3xl mb-4 shadow-xs animate-pulse">
                  {{ activeFilter === 'breaking' ? '⚡' : activeFilter === 'editors_pick' ? '⭐' : '📰' }}
                </div>
                <h4 class="text-slate-800 dark:text-slate-200 font-bold text-lg">
                  {{ activeFilter === 'breaking' ? 'No breaking news right now' : 'No entries available' }}
                </h4>
                <p class="text-slate-400 dark:text-slate-500 text-sm mt-1.5 max-w-sm leading-relaxed">
                  {{ activeFilter === 'breaking' ? 'All quiet at this moment. Live feeds populate instantly when dispatches arrive.' : 'Try shifting filters or review updates shortly.' }}
                </p>
                <button @click="setFilter('latest')" class="mt-6 px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs hover:opacity-90 active:scale-95 transition-all">
                  Return to Latest News
                </button>
              </div>

              <div v-else class="space-y-8">
                <NuxtLink
                  v-if="featuredArticle"
                  :to="`/article/${featuredArticle.id}`"
                  class="group block rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300"
                >
                  <div class="grid md:grid-cols-5 min-h-[260px]">
                    <div class="relative md:col-span-3 overflow-hidden bg-slate-100 dark:bg-slate-800 h-56 md:h-auto">
                      <img
                        :src="featuredArticle.image"
                        :alt="featuredArticle.title"
                        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      <span v-if="featuredArticle.isBreaking" class="absolute top-3 left-3 flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                        <Zap class="size-3 fill-white" /> Live
                      </span>
                    </div>
                    
                    <div class="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-900/60">
                      <div>
                        <div class="flex items-center gap-2 mb-3.5">
                          <span class="text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-md" :class="categoryTextClass(featuredArticle.category)">
                            {{ featuredArticle.category }}
                          </span>
                          <span class="text-[11px] font-semibold text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                            <span class="size-1.5 rounded-full" :style="{ background: categoryDot(featuredArticle.category) }"></span>
                            {{ featuredArticle.source }}
                          </span>
                        </div>
                        <h2 class="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 line-clamp-3 tracking-tight">
                          {{ featuredArticle.title }}
                        </h2>
                        <p class="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal opacity-90">
                          {{ featuredArticle.excerpt }}
                        </p>
                      </div>
                      
                      <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        <div class="flex items-center gap-3.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                          <span class="flex items-center gap-1"><Clock class="size-3.5" /> {{ featuredArticle.readTime }}</span>
                          <span class="flex items-center gap-1"><Eye class="size-3.5" /> {{ featuredArticle.views }}</span>
                        </div>
                        <span class="flex items-center gap-1 text-red-600 dark:text-red-500 text-xs font-bold transition-all duration-200 group-hover:gap-2">
                          Read Story <ChevronRight class="size-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </NuxtLink>

                <div class="flex items-center gap-4 select-none">
                  <span class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">Stream Registry</span>
                  <div class="flex-1 h-px bg-slate-200/60 dark:bg-slate-800/80"></div>
                </div>

                <div class="relative">
                  <TransitionGroup
                    name="card-grid"
                    tag="div"
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    <article
                      v-for="article in secondaryArticles"
                      :key="article.id"
                      class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/70 hover:border-slate-200 dark:hover:border-slate-700 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div class="relative overflow-hidden h-48 bg-slate-100 dark:bg-slate-800 shrink-0">
                          <img
                            :src="article.image"
                            :alt="article.title"
                            loading="lazy"
                            class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                          />
                          <NuxtLink
                            :to="`/${article.category.toLowerCase()}`"
                            @click.stop
                            class="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-md backdrop-blur-md shadow-xs transform transition-transform duration-200 hover:scale-105"
                            :class="categoryTextClass(article.category)"
                          >
                            {{ article.category }}
                          </NuxtLink>
                        </div>

                        <div class="p-5 pb-0">
                          <div class="flex items-center gap-2 mb-2.5 text-xs">
                            <span class="size-1.5 rounded-full shrink-0" :style="{ background: categoryDot(article.category) }"></span>
                            <span class="font-bold text-slate-800 dark:text-slate-300 text-[11px]">{{ article.source }}</span>
                            <span class="text-slate-300 dark:text-slate-700 font-light">·</span>
                            <span class="text-slate-400 dark:text-slate-500 flex items-center gap-1 text-[11px]">
                              <Calendar class="size-3" /> {{ article.date }}
                            </span>
                          </div>

                          <h3 class="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors duration-200 tracking-tight">
                            {{ article.title }}
                          </h3>
                          <p class="text-[13px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal opacity-90">
                            {{ article.excerpt }}
                          </p>
                        </div>
                      </div>

                      <div class="p-5 pt-4 mt-4 border-t border-slate-50 dark:border-slate-800/50 flex items-center justify-between items-end">
                        <div class="flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                          <span class="flex items-center gap-1"><Eye class="size-3.5" /> {{ article.views }}</span>
                          <span class="flex items-center gap-1"><Clock class="size-3.5" /> {{ article.readTime }}</span>
                        </div>
                        <div class="flex items-center gap-1.5 text-slate-400 dark:text-slate-600">
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 active:scale-90 transition-all" aria-label="Bookmark">
                            <Bookmark class="size-3.5" />
                          </button>
                          <button class="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 active:scale-90 transition-all" aria-label="Share">
                            <Share2 class="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </TransitionGroup>
                </div>

                <div class="pt-4 text-center">
                  <button class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white dark:hover:bg-slate-900 shadow-xs hover:shadow-md active:scale-98 transition-all duration-200">
                    <span>Load more stories</span>
                    <ChevronRight class="size-4" />
                  </button>
                </div>
              </div>

            </div>
          </transition>
        </div>

        <aside class="xl:col-span-1 space-y-6">

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-xs">
            <div class="flex items-center gap-2 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
              <TrendingUp class="size-4 text-red-500" />
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Trending Today</span>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-slate-800/50">
              <NuxtLink
                v-for="(article, i) in trendingArticles"
                :key="article.id"
                :to="`/article/${article.id}`"
                class="flex items-start gap-3.5 px-4 py-3.5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
              >
                <span class="text-lg font-black leading-none shrink-0 w-5 text-center mt-0.5" :class="i === 0 ? 'text-red-500' : 'text-slate-300 dark:text-slate-700'">
                  {{ i + 1 }}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors tracking-tight">
                    {{ article.title }}
                  </p>
                  <div class="flex items-center gap-2 mt-2 text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    <span class="size-1.5 rounded-full" :style="{ background: categoryDot(article.category) }"></span>
                    <span>{{ article.source }}</span>
                    <span class="text-slate-300 dark:text-slate-700">·</span>
                    <span class="flex items-center gap-0.5"><Eye class="size-3" /> {{ article.views }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 shadow-md">
            <div class="relative h-36 overflow-hidden bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1543993452-315c2f5b5f3d?w=400&h=250&fit=crop"
                alt="Editorial Legacy Spot"
                class="w-full h-full object-cover opacity-60 transition-transform duration-700 ease-out hover:scale-104"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <span class="absolute bottom-3 left-4 flex items-center gap-1 text-red-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Trophy class="size-3" /> Feature Analysis
              </span>
            </div>
            
            <div class="p-5">
              <h3 class="text-sm font-black text-white leading-snug mb-2 tracking-tight">
                Cambodia SEA Games Legacy: How Sports Infrastructure Transforms Communities
              </h3>
              <p class="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4 font-light opacity-90">
                From structural regional stadiums to digital youth programs, an analytical study on local updates across structural developments.
              </p>
              
              <div class="flex items-center justify-between pt-3.5 border-t border-slate-800/80">
                <div class="flex items-center gap-2">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" class="size-7 rounded-full ring-2 ring-slate-800 shadow-xs" alt="Sokha profile" />
                  <div>
                    <p class="text-[10px] font-bold text-slate-200">Sokha Chea</p>
                    <p class="text-[9px] text-slate-500 font-medium">5 min read</p>
                  </div>
                </div>
                <button class="flex items-center gap-0.5 text-xs text-red-400 font-bold hover:text-red-300 transition-colors group/btn">
                  Explore <ChevronRight class="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 p-5 shadow-xs relative overflow-hidden">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-md">📬</span>
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">Daily Dispatch</span>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed font-normal">
              Get the top 5 localized insights from Cambodia compressed elegantly directly into your mailbox daily.
            </p>
            <div class="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
              <button class="w-full text-xs font-bold py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors duration-200 active:scale-98">
                Subscribe Free
              </button>
            </div>
          </div>

        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── High-Performance Fluid Layout Morph Transitions ────────────────── */
.card-grid-enter-active,
.card-grid-leave-active {
  transition: all 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}
.card-grid-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.card-grid-leave-active {
  position: absolute !important;
  visibility: hidden;
  width: 100%;
  max-width: 290px; /* Prevent grid collapse visual flicker */
}

/* Tab Line Entry Effect */
@keyframes lineSlide {
  from { transform: scaleX(0); opacity: 0; }
  to { transform: scaleX(1); opacity: 1; }
}
.animate-line-slide {
  animation: lineSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Complete View Swapping Animations */
.fade-layout-enter-active,
.fade-layout-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.fade-layout-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.fade-layout-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* ── Seamless Marquee Track Core Styles ─────────────────────────────── */
.marquee-track {
  width: 100%;
  display: flex;
}
@keyframes marqueeAnimation {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}
.animate-marquee {
  animation: marqueeAnimation 35s linear infinite;
}

/* Layout Utilities */
.scrollbar-none::-webkit-scrollbar { display: none; }
.scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
</style>