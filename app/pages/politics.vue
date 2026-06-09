<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Eye,
  Clock,
  Bookmark,
  Share2,
  ChevronRight,
  Zap,
  TrendingUp,
  Users,
  Globe,
  Scale,
  Building2,
  Vote,
  Flame,
} from 'lucide-vue-next'

definePageMeta({
  layout: 'public'
})

useSeoMeta({
  title: 'Politics — ខ្មែរហ្វីត',
  description: 'Latest Cambodia political news covering Parliament, Elections, Foreign Policy and more.',
})

// ─── Sub-topics ─────────────────────────────────────────────────────────────
interface SubTopic {
  key: string
  label: string
  labelKm: string
  icon: unknown
  count: number
}

const SUB_TOPICS: SubTopic[] = [
  { key: 'parliament',      label: 'Parliament',      labelKm: 'រដ្ឋសភា',       icon: Building2, count: 12 },
  { key: 'elections',       label: 'Elections',       labelKm: 'ការបោះឆ្នោត',   icon: Vote,      count: 8  },
  { key: 'foreign_policy',  label: 'Foreign Policy',  labelKm: 'គោលនយោបាយ',    icon: Globe,     count: 9  },
  { key: 'economy',         label: 'Economy',         labelKm: 'សេដ្ឋកិច្ច',    icon: TrendingUp,count: 15 },
  { key: 'law_justice',     label: 'Law & Justice',   labelKm: 'ច្បាប់និងយុត្តិធម៌', icon: Scale, count: 6  },
]

// ─── State ───────────────────────────────────────────────────────────────────
const activeTopic = ref('all')

// ─── Articles ────────────────────────────────────────────────────────────────
interface Article {
  id: number
  title: string
  titleKm: string
  excerpt: string
  image: string
  topic: string
  source: string
  date: string
  readTime: string
  views: string
  isBreaking: boolean
  isFeatured: boolean
}

const articles = ref<Article[]>([
  {
    id: 1,
    title: 'National Assembly Passes Landmark Digital Economy Bill',
    titleKm: 'រដ្ឋសភាអនុម័តច្បាប់សេដ្ឋកិច្ចឌីជីថលដ៏សំខាន់',
    excerpt: 'The National Assembly unanimously approved the Digital Economy Framework Bill, paving the way for new regulations governing fintech, e-commerce, and data sovereignty across Cambodia.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&h=500&fit=crop',
    topic: 'parliament',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '4.8k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Cambodia and China Sign Five New Infrastructure Cooperation Agreements',
    titleKm: 'កម្ពុជានិងចិនចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងហេដ្ឋារចនាសម្ព័ន្ធថ្មី ៥',
    excerpt: 'During a state visit to Beijing, Cambodian officials finalized agreements covering port development, railway expansion, and a new special economic zone in Sihanoukville.',
    image: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'NEC Announces Official Timeline for 2027 Commune Elections',
    titleKm: 'គណៈកម្មការជាតិរៀបចំការបោះឆ្នោតប្រកាសកាលវិភាគការបោះឆ្នោតឃុំ ២០២៧',
    excerpt: 'The National Election Committee set registration deadlines and confirmed polling stations will increase by 15% in rural provinces to improve access for first-time voters.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '2.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 4,
    title: 'Supreme Court Rules on Landmark Land Rights Case in Kampong Cham',
    titleKm: 'តុលាការកំពូលសម្រេចលើបណ្ដឹងសិទ្ធិដីធ្លីដ៏សំខាន់នៅកំពង់ចាម',
    excerpt: 'In a precedent-setting decision, the Supreme Court ruled in favor of 340 farming families disputing land concessions granted to a private development company in 2019.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'VOD Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Ministry of Economy Projects 6.8% GDP Growth for Full Year 2026',
    titleKm: 'ក្រសួងសេដ្ឋកិច្ចព្យាករណ៍កំណើន GDP ៦.៨% ក្នុងឆ្នាំ ២០២៦',
    excerpt: 'Revised upward from the original 6% forecast, the ministry cited stronger-than-expected garment exports and a 28% surge in tourist arrivals from ASEAN countries.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    topic: 'economy',
    source: 'Fresh News',
    date: 'May 24, 2026',
    readTime: '3 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: 'Senate Committee Reviews Proposed Amendments to Anti-Corruption Law',
    titleKm: 'គណៈកម្មការព្រឹទ្ធសភាពិនិត្យវិសោធនកម្មច្បាប់ប្រឆាំងអំពើពុករលួយ',
    excerpt: 'The proposed amendments strengthen asset declaration requirements for senior officials and introduce mandatory three-year cooling-off periods for civil servants moving to the private sector.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    topic: 'parliament',
    source: 'Kohsantepheap',
    date: 'May 23, 2026',
    readTime: '4 min',
    views: '1.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: 'Cambodia Joins ASEAN Digital Economy Framework as Full Signatory',
    titleKm: 'កម្ពុជាចូលរួមក្របខ័ណ្ឌសេដ្ឋកិច្ចឌីជីថលអាស៊ាន',
    excerpt: 'As the last ASEAN member to sign, Cambodia commits to cross-border data flow standards, digital trade facilitation, and joint cybersecurity protocols by 2028.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Dap News',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Opposition Parties Call for Independent Electoral Commission Review',
    titleKm: 'គណបក្សប្រឆាំងស្នើឱ្យពិនិត្យឡើងវិញនូវគណៈកម្មការជាតិរៀបចំការបោះឆ្នោត',
    excerpt: 'A coalition of opposition groups formally submitted a petition requesting an independent audit of NEC composition and voter roll accuracy ahead of the 2027 election cycle.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 21, 2026',
    readTime: '3 min',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: 'New Anti-Money Laundering Regulations Take Effect Next Month',
    titleKm: 'បទប្បញ្ញត្តិថ្មីប្រឆាំងការសំអាតប្រាក់នឹងចូលជាធរមានខែក្រោយ',
    excerpt: 'The Financial Intelligence Unit will gain new powers to freeze assets and compel disclosures from real estate developers, cryptocurrency exchanges, and legal professionals.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'Fresh News',
    date: 'May 20, 2026',
    readTime: '4 min',
    views: '1.5k',
    isBreaking: false,
    isFeatured: false,
  },
])

// ─── Computed ────────────────────────────────────────────────────────────────
const filteredArticles = computed(() =>
  activeTopic.value === 'all'
    ? articles.value
    : articles.value.filter(a => a.topic === activeTopic.value)
)

const featuredArticle = computed(() =>
  filteredArticles.value.find(a => a.isFeatured) ?? filteredArticles.value[0] ?? null
)

const gridArticles = computed(() => {
  const featured = featuredArticle.value
  return filteredArticles.value.filter(a => a.id !== featured?.id)
})

const breakingArticles = computed(() =>
  articles.value.filter(a => a.isBreaking)
)

const activeTopicData = computed(() =>
  SUB_TOPICS.find(t => t.key === activeTopic.value) ?? null
)

const trendingArticles = computed(() =>
  [...articles.value]
    .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    .slice(0, 4)
)

// ─── Helpers ─────────────────────────────────────────────────────────────────
function topicIcon(key: string) {
  return SUB_TOPICS.find(t => t.key === key)?.icon ?? Building2
}

function topicLabel(key: string) {
  return SUB_TOPICS.find(t => t.key === key)?.label ?? 'General'
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500 antialiased">

    <div
      v-if="breakingArticles.length"
      class="bg-red-700 dark:bg-red-900 text-white text-xs font-semibold px-4 py-2.5 flex items-center gap-4 overflow-hidden border-b border-red-800/40 relative z-10"
    >
      <span class="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full shrink-0 uppercase tracking-wider text-[11px] shadow-sm animate-pulse">
        <Zap class="size-3 fill-white" /> Breaking
      </span>
      <div class="w-full overflow-hidden relative flex items-center">
        <div class="marquee-content whitespace-nowrap opacity-95 hover:[animation-play-state:paused] cursor-pointer">
          <span v-for="n in 3" :key="n" class="inline-block pr-16">
            {{ breakingArticles[0].title }} <span class="mx-3 opacity-40">|</span> {{ breakingArticles[0].titleKm }}
          </span>
        </div>
      </div>
    </div>

   

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">

        <div class="xl:col-span-3 min-w-0">

          <div class="flex items-center justify-between gap-4 mb-6">
            <div class="flex items-center gap-3">
              <div
                v-if="activeTopicData"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/40 border border-red-100/80 dark:border-red-900/40 shadow-xs"
              >
                <component :is="activeTopicData.icon" class="size-3.5 text-red-700 dark:text-red-400" />
                <span class="text-xs font-bold text-red-700 dark:text-red-400 tracking-wide">{{ activeTopicData.label }}</span>
                <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">· {{ activeTopicData.labelKm }}</span>
              </div>
              <span class="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full font-medium">
                {{ filteredArticles.length }} stories
              </span>
            </div>
            <div class="flex-1 h-px bg-slate-200/60 dark:bg-slate-800/80 hidden sm:block"></div>
          </div>

          <div
            v-if="filteredArticles.length === 0"
            class="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-8 shadow-sm"
          >
            <div class="text-5xl mb-4 animate-bounce duration-1000">🏛️</div>
            <p class="text-slate-800 dark:text-slate-200 font-bold text-xl tracking-tight">No stories in {{ topicLabel(activeTopic) }} yet</p>
            <p class="text-slate-400 dark:text-slate-500 text-sm mt-1.5 mb-6 max-w-sm">Check back soon or browse all current Cambodian political coverage.</p>
            <button
              class="px-6 py-2.5 bg-red-700 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white rounded-full text-sm font-semibold shadow-md shadow-red-700/10 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200"
              @click="activeTopic = 'all'"
            >
              View all Politics
            </button>
          </div>

          <div v-else>
            <NuxtLink
              v-if="featuredArticle"
              :to="`/article/${featuredArticle.id}`"
              class="group block mb-8 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 hover:border-red-300 dark:hover:border-red-900/60 shadow-xs hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-none active:scale-[0.99] transition-all duration-500 relative isolate"
            >
              <div class="relative h-72 md:h-96 overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  :src="featuredArticle.image"
                  :alt="featuredArticle.title"
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 via-40% to-transparent"></div>

                <div class="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  <span
                    v-if="featuredArticle.isBreaking"
                    class="flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                  >
                    <Zap class="size-3 fill-white" /> Live
                  </span>
                  <span class="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1.5 rounded-full border border-white/10 shadow-lg ml-auto">
                    <component :is="topicIcon(featuredArticle.topic)" class="size-3" />
                    {{ topicLabel(featuredArticle.topic) }}
                  </span>
                </div>

                <div class="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col justify-end">
                  <p class="text-red-400 text-xs font-bold uppercase tracking-widest mb-2.5">{{ featuredArticle.source }}</p>
                  <h1 class="text-white text-2xl md:text-3xl font-black leading-tight tracking-tight mb-3 group-hover:text-red-100 transition-colors duration-300 max-w-3xl">
                    {{ featuredArticle.title }}
                  </h1>
                  <p class="text-slate-300 text-sm leading-relaxed line-clamp-2 max-w-2xl hidden md:block opacity-90 group-hover:opacity-100 transition-opacity">
                    {{ featuredArticle.excerpt }}
                  </p>
                  <div class="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-slate-300/90 font-medium">
                    <span class="flex items-center gap-1.5"><Eye class="size-4 opacity-70" /> {{ featuredArticle.views }}</span>
                    <span class="flex items-center gap-1.5"><Clock class="size-4 opacity-70" /> {{ featuredArticle.readTime }} read</span>
                    <span class="ml-auto opacity-70">{{ featuredArticle.date }}</span>
                  </div>
                </div>
              </div>
            </NuxtLink>

            <div class="flex items-center gap-4 mb-6">
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                More Stories
              </span>
              <div class="flex-1 h-px bg-slate-200/60 dark:bg-slate-800/80"></div>
            </div>

            <TransitionGroup
              name="card-grid"
              tag="div"
              class="grid grid-cols-1 sm:grid-cols-2 gap-6 relative"
            >
              <article
                v-for="article in gridArticles"
                :key="article.id"
                class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700/80 shadow-xs hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-none active:scale-[0.99] transition-all duration-500 flex flex-col overflow-hidden relative"
              >
                <div class="relative overflow-hidden h-48 bg-slate-50 dark:bg-slate-950 shrink-0">
                  <img
                    :src="article.image"
                    :alt="article.title"
                    loading="lazy"
                    class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span
                    class="absolute top-3 left-3 flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/95 backdrop-blur-md text-red-700 dark:text-red-400 shadow-sm border border-slate-100 dark:border-slate-800"
                  >
                    <component :is="topicIcon(article.topic)" class="size-3" />
                    {{ topicLabel(article.topic) }}
                  </span>
                </div>

                <div class="p-5 flex flex-col flex-1">
                  <div class="flex items-center gap-2 mb-2.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    <span class="text-red-700 dark:text-red-400 font-bold">{{ article.source }}</span>
                    <span>·</span>
                    <span>{{ article.date }}</span>
                  </div>

                  <NuxtLink :to="`/article/${article.id}`" class="focus:outline-hidden">
                    <h3
                      class="text-base font-bold text-slate-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-300"
                    >
                      {{ article.title }}
                    </h3>
                  </NuxtLink>

                  <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-5 flex-1 opacity-90">
                    {{ article.excerpt }}
                  </p>

                  <div class="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div class="flex items-center gap-3.5 text-xs font-medium text-slate-400 dark:text-slate-500">
                      <span class="flex items-center gap-1"><Eye class="size-3.5" /> {{ article.views }}</span>
                      <span class="flex items-center gap-1"><Clock class="size-3.5" /> {{ article.readTime }}</span>
                    </div>
                    <div class="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                      <button class="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400 active:scale-90 transition-all" aria-label="Bookmark">
                        <Bookmark class="size-3.5" />
                      </button>
                      <button class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 active:scale-90 transition-all" aria-label="Share">
                        <Share2 class="size-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </TransitionGroup>

            <div class="mt-10 text-center">
              <button
                class="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold rounded-full hover:border-red-200 dark:hover:border-red-900 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 active:scale-95 transition-all duration-300 shadow-xs cursor-pointer"
              >
                Load more stories <ChevronRight class="size-4" />
              </button>
            </div>
          </div>
        </div>

        <aside class="xl:col-span-1 space-y-6 w-full">

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-xs">
            <div class="flex items-center gap-2 px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <Building2 class="size-4 text-red-700 dark:text-red-500" />
              <span class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Topics</span>
            </div>
            <div class="p-2.5 flex flex-col gap-1.5">
              <button
                v-for="topic in SUB_TOPICS"
                :key="topic.key"
                class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 text-left active:scale-[0.98] cursor-pointer"
                :class="activeTopic === topic.key
                  ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'"
                @click="activeTopic = topic.key"
              >
                <span class="flex items-center gap-2.5">
                  <component :is="topic.icon" class="size-4 opacity-80" />
                  <span>{{ topic.label }}</span>
                </span>
                <span
                  class="text-[10px] font-extrabold px-2 py-0.5 rounded-full min-w-6 text-center transition-colors duration-300"
                  :class="activeTopic === topic.key
                    ? 'bg-red-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'"
                >
                  {{ topic.count }}
                </span>
              </button>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-xs">
            <div class="flex items-center gap-2 px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <Flame class="size-4 text-red-500 fill-red-500/10" />
              <span class="text-sm font-bold tracking-tight text-slate-900 dark:text-white">Trending Insights</span>
            </div>
            <div class="divide-y divide-slate-100 dark:divide-slate-800">
              <NuxtLink
                v-for="(article, i) in trendingArticles"
                :key="article.id"
                :to="`/article/${article.id}`"
                class="flex items-start gap-4 px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 active:scale-[0.99] transition-all duration-300 group"
              >
                <span
                  class="text-xl font-black leading-none shrink-0 w-6 text-center"
                  :class="i === 0 ? 'text-red-600 dark:text-red-500' : 'text-slate-200 dark:text-slate-700'"
                >
                  {{ i + 1 }}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-300">
                    {{ article.title }}
                  </p>
                  <div class="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-slate-400">
                    <span class="text-red-600 dark:text-red-500 font-bold">{{ article.source }}</span>
                    <span>·</span>
                    <span class="flex items-center gap-1"><Eye class="size-3" /> {{ article.views }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 p-5 shadow-xs">
            <p class="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3.5">
              Related sections
            </p>
            <div class="flex flex-wrap gap-2">
              <NuxtLink
                v-for="cat in ['Business', 'Education', 'Law & Justice']"
                :key="cat"
                :to="`/${cat.toLowerCase().replace(/ & /g, '-')}`"
                class="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-200 dark:hover:border-red-900 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-950/20 active:scale-95 transition-all duration-200"
              >
                {{ cat }}
              </NuxtLink>
            </div>
          </div>

          <div class="bg-gradient-to-br from-slate-900 via-red-950 to-red-900 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-6 text-white border border-red-900/30 dark:border-slate-800 relative overflow-hidden shadow-md">
            <div class="absolute -right-6 -bottom-6 size-24 bg-red-600/10 rounded-full blur-xl"></div>
            <p class="text-base font-black tracking-tight mb-1.5">Stay Updated Directly</p>
            <p class="text-xs text-slate-300 mb-4 leading-relaxed opacity-90">Get verified Cambodian politics news delivered straight to your Telegram feed.</p>
            <a
              href="https://t.me/khmerfeed"
              target="_blank"
              class="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-xl text-xs font-bold active:scale-98 transition-all duration-300 backdrop-blur-xs text-center"
            >
              Join @KhmerFeed
            </a>
          </div>

        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Breaking Ticker Marquee ─────────────────────────────────────── */
.marquee-content {
  display: inline-block;
  animation: marquee 25s linear infinite;
}

@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-33.333%, 0, 0); }
}

/* ── Modern Fluid FLIP Transitions ───────────────────────────────── */
.card-grid-item {
  display: flex;
  flex-direction: column;
}

.card-grid-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.card-grid-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: absolute;
  z-index: 0;
  /* Prevent collapsing grid tracking widths during fade out */
  pointer-events: none;
}

.card-grid-enter-from {
  opacity: 0;
  transform: translateY(24px) scale(0.98);
}
.card-grid-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.97);
}

.card-grid-move {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>