import { ref, computed } from 'vue'
import { Bot, Cloud, Cpu, ShieldCheck, Smartphone, Wifi } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const TECHNOLOGY_SUB_TOPICS: SubTopic[] = [
  { key: 'startups', label: 'Startups', labelKm: 'ស្តាតអាប់', icon: Bot, count: 10 },
  { key: 'digital_government', label: 'Digital Government', labelKm: 'រដ្ឋាភិបាលឌីជីថល', icon: Cloud, count: 8 },
  { key: 'telecom', label: 'Telecom', labelKm: 'ទូរគមនាគមន៍', icon: Wifi, count: 7 },
  { key: 'cybersecurity', label: 'Cybersecurity', labelKm: 'សន្តិសុខសាយប័រ', icon: ShieldCheck, count: 6 },
  { key: 'ai', label: 'AI', labelKm: 'បញ្ញាសិប្បនិម្មិត', icon: Cpu, count: 9 },
  { key: 'mobile', label: 'Mobile', labelKm: 'ទូរស័ព្ទចល័ត', icon: Smartphone, count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 31,
    title: 'Phnom Penh Innovation Hub Opens With 80 Regional Startups',
    titleKm: 'មជ្ឈមណ្ឌលនវានុវត្តន៍ភ្នំពេញបើកជាមួយស្តាតអាប់តំបន់ ៨០',
    excerpt: 'The new downtown campus brings founders, engineers, and investors together for fintech, logistics, climate, and media technology programs.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&h=500&fit=crop',
    topic: 'startups',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '5.6k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 32,
    title: 'Government Expands Digital ID Services to Five More Provinces',
    titleKm: 'រដ្ឋាភិបាលពង្រីកសេវាអត្តសញ្ញាណប័ណ្ណឌីជីថលទៅខេត្តថ្មី ៥',
    excerpt: 'Residents can now access civil registration, business permits, and tax filings through a unified mobile-first platform.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    topic: 'digital_government',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 33,
    title: 'Telecom Operators Begin 5G Corridor Tests Along Phnom Penh Ring Road',
    titleKm: 'ប្រតិបត្តិករទូរគមនាគមន៍ចាប់ផ្តើមសាកល្បងច្រក 5G នៅផ្លូវក្រវាត់ក្រុងភ្នំពេញ',
    excerpt: 'Pilot coverage will support traffic sensors, logistics fleets, and emergency response applications before wider rollout.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    topic: 'telecom',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 34,
    title: 'Cybersecurity Center Warns SMEs After Wave of Invoice Scams',
    titleKm: 'មជ្ឈមណ្ឌលសន្តិសុខសាយប័រព្រមាន SME បន្ទាប់ពីការឆបោកវិក្កយបត្រ',
    excerpt: 'Officials recommend stronger payment verification and staff training as fraud attempts rise across export and real estate firms.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    topic: 'cybersecurity',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '4.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 35,
    title: 'Khmer Language AI Assistant Pilot Starts in Public Service Centers',
    titleKm: 'គម្រោងសាកល្បងជំនួយការ AI ភាសាខ្មែរចាប់ផ្តើមនៅមជ្ឈមណ្ឌលសេវាសាធារណៈ',
    excerpt: 'The assistant answers common permit and registration questions in Khmer, English, and voice-based mobile chat.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    topic: 'ai',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '4 min',
    views: '3.7k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 36,
    title: 'Mobile Wallets Add Offline QR Payments for Rural Markets',
    titleKm: 'កាបូបលុយចល័តបន្ថែមការទូទាត់ QR ក្រៅបណ្តាញសម្រាប់ទីផ្សារជនបទ',
    excerpt: 'New low-bandwidth transaction support is designed for farmers, small shops, and roadside vendors with unstable connectivity.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
    topic: 'mobile',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '3 min',
    views: '3.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 37,
    title: 'Cambodian Drone Startup Maps Flood Risk in Tonle Sap Communities',
    titleKm: 'ស្តាតអាប់ដ្រូនកម្ពុជាធ្វើផែនទីហានិភ័យទឹកជំនន់នៅសហគមន៍ទន្លេសាប',
    excerpt: 'High-resolution aerial data will help local authorities prepare evacuation routes and protect fisheries infrastructure.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop',
    topic: 'startups',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 38,
    title: 'National Cloud Migration Plan Targets Core Ministries by 2027',
    titleKm: 'ផែនការផ្លាស់ទីទៅពពកជាតិកំណត់គោលដៅក្រសួងសំខាន់ៗនៅឆ្នាំ ២០២៧',
    excerpt: 'The roadmap prioritizes secure hosting, disaster recovery, and shared data standards across public agencies.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
    topic: 'digital_government',
    source: 'Fresh News',
    date: 'May 21, 2026',
    readTime: '4 min',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 39,
    title: 'Universities Launch Joint AI Lab for Agriculture and Health Research',
    titleKm: 'សាកលវិទ្យាល័យបើកបន្ទប់ពិសោធន៍ AI រួមសម្រាប់កសិកម្មនិងសុខភាព',
    excerpt: 'Researchers will develop crop disease detection, Khmer medical triage, and open datasets for local innovators.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    topic: 'ai',
    source: 'Kohsantepheap',
    date: 'May 20, 2026',
    readTime: '3 min',
    views: '2.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 40,
    title: 'New Fiber Backbone Connects Schools Across Northeast Provinces',
    titleKm: 'ខ្សែកាបអុបទិកថ្មីតភ្ជាប់សាលារៀននៅខេត្តភាគឦសាន',
    excerpt: 'The education network upgrade brings faster online learning access to remote schools in Ratanakiri, Mondulkiri, and Stung Treng.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
    topic: 'telecom',
    source: 'RFA Khmer',
    date: 'May 19, 2026',
    readTime: '3 min',
    views: '2.1k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useTechnologyFeed() {
  const articles = ref<PoliticsArticle[]>(ARTICLES)
  const activeTopic = ref('all')

  const breakingArticles = computed(() =>
    articles.value.filter((article) => article.isBreaking)
  )

  const filteredArticles = computed(() =>
    activeTopic.value === 'all'
      ? articles.value
      : articles.value.filter((article) => article.topic === activeTopic.value)
  )

  const featuredArticle = computed(
    () =>
      filteredArticles.value.find((article) => article.isFeatured) ??
      filteredArticles.value[0] ??
      null
  )

  const gridArticles = computed(() => {
    const featured = featuredArticle.value
    return filteredArticles.value.filter((article) => article.id !== featured?.id)
  })

  const trendingArticles = computed(() =>
    [...articles.value]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 4)
  )

  function topicIcon(key: string) {
    return TECHNOLOGY_SUB_TOPICS.find((topic) => topic.key === key)?.icon ?? Cpu
  }

  function topicLabel(key: string) {
    return TECHNOLOGY_SUB_TOPICS.find((topic) => topic.key === key)?.label ?? 'Technology'
  }

  function setTopic(key: string) {
    activeTopic.value = key
  }

  return {
    articles,
    activeTopic,
    breakingArticles,
    filteredArticles,
    featuredArticle,
    gridArticles,
    trendingArticles,
    topicIcon,
    topicLabel,
    setTopic,
  }
}
