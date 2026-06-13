import { ref, computed } from 'vue'
import { Briefcase, Globe, TrendingUp, BarChart3, Sparkles } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const BUSINESS_SUB_TOPICS: SubTopic[] = [
  { key: 'markets',   label: 'Markets',   labelKm: 'ទីផ្សារ',        icon: BarChart3, count: 11 },
  { key: 'corporate', label: 'Corporate', labelKm: 'សាជីវកម្ម',       icon: Briefcase, count: 9  },
  { key: 'trade',     label: 'Trade',     labelKm: 'ពាណិជ្ជកម្ម',     icon: Globe,      count: 8  },
  { key: 'startup',   label: 'Startups',  labelKm: 'ស្តាត៉ាប់',         icon: Sparkles,  count: 7  },
  { key: 'policy',    label: 'Policy',    labelKm: 'គោលនយោបាយ',    icon: TrendingUp, count: 5  },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 11,
    title: 'Cambodia Stock Exchange Posts Record 18% Quarterly Gain',
    titleKm: 'ការផ្លាស់ប្តូរឈ្មោះភាគហ៊ុនកម្ពុជា បង្ហាញកំណើនកំណត់ត្រា ១៨% ក្នុងត្រីមាសនេះ',
    excerpt: 'Investor confidence rose after new listings in fintech and green energy lifted the index above 1,200 points.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=500&fit=crop',
    topic: 'markets',
    source: 'Fresh News',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '5.1k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 12,
    title: 'Garment Exporters See 22% Growth After EU Trade Concessions',
    titleKm: 'អ្នកនាំចេញសម្លៀកបំពាក់ឈានមុខកើនដល់ ២២% បន្ទាប់ពីសេវាផ្តល់ចំណូលពាណិជ្ជកម្មអឺរ៉ូប',
    excerpt: 'Improved shipping routes and tariff relief helped apparel manufacturers expand orders from European retailers.',
    image: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?w=600&h=400&fit=crop',
    topic: 'trade',
    source: 'VOD Khmer',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 13,
    title: 'Phnom Penh Startup Raises $4M for AgriTech Expansion',
    titleKm: 'ស្តាត៉ាប់ភ្នំពេញបង្កើនទឹកប្រាក់ ៤លានដុល្លារ សម្រាប់ពង្រីក AgriTech',
    excerpt: 'The funding round will accelerate precision farming tools for rice growers in Cambodia and ASEAN.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    topic: 'startup',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '2.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 14,
    title: 'Ministry Approves New Corporate Tax Code for SMEs',
    titleKm: 'ក្រសួងអនុម័តប្រព័ន្ធពន្ធសម្រាប់អង្គការពាណិជ្ជកម្មក្មេង និងមធ្យម',
    excerpt: 'The revised code includes incentives for local startups, digital firms, and qualified exporters.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop',
    topic: 'policy',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 15,
    title: 'Regional Trade Fair Draws 120 Companies to Sihanoukville Port',
    titleKm: 'មេឡាគ្រឿងពាណិជ្ជកម្មតំបន់នាំឲ្យក្រុមហ៊ុន ១២០ ហ្វឹកហាត់មកកំពង់សោម',
    excerpt: 'Exporters from textiles, seafood, and electronics showcased new shipments ahead of the monsoon season.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop',
    topic: 'trade',
    source: 'Fresh News',
    date: 'May 24, 2026',
    readTime: '3 min',
    views: '2.5k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 16,
    title: 'Cambodia Launches National E-Commerce Hub for SMEs',
    titleKm: 'កម្ពុជាបង្ហាញមជ្ឈមណ្ឌលពាណិជ្ជកម្មអេឡិចត្រូនិចជាតិសម្រាប់ SME',
    excerpt: 'The new platform offers logistics support, digital payments, and training to help small businesses sell overseas.',
    image: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&h=400&fit=crop',
    topic: 'corporate',
    source: 'Dap News',
    date: 'May 23, 2026',
    readTime: '4 min',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 17,
    title: 'Banking Sector Expands Mobile Payment Services to Rural Districts',
    titleKm: 'វិស័យធនាគារពង្រីកសេវាបង់ប្រាក់ទូរស័ព្ទចល័តសម្រាប់ស្រុកវិចិត្រស្រុក',
    excerpt: 'A new partnership with telecom operators makes digital wallets available in 45 provinces.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    topic: 'markets',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 18,
    title: 'Cambodian Rice Exporters Target New Gulf Markets',
    titleKm: 'អ្នកនាំចេញស្រូវកម្ពុជា បង្ហាញគោលដៅទីផ្សារ​អាឡិចដ៍ថ្មី​នៅលើឆ្នេរខ្សាច់',
    excerpt: 'New distribution agreements aim to deliver premium rice and cashew products to buyers in Saudi Arabia and UAE.',
    image: 'https://images.unsplash.com/photo-1509402686-892cb7dc82a9?w=600&h=400&fit=crop',
    topic: 'trade',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '4 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 19,
    title: 'Venture Capital Interest in Cambodian Fintech Hits All-Time High',
    titleKm: 'ការវិនិយោគនៅក្នុង Fintech កម្ពុជា កើនឡើងដល់កម្រិតកំណត់ថ្មី',
    excerpt: 'International funds are backing mobile banking, remittances, and B2B payment startups across the Mekong region.',
    image: 'https://images.unsplash.com/photo-1496284045406-d3e0b918d789?w=600&h=400&fit=crop',
    topic: 'startup',
    source: 'Fresh News',
    date: 'May 20, 2026',
    readTime: '3 min',
    views: '1.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 20,
    title: 'Trade Ministry Publishes New Investment Roadmap for 2027',
    titleKm: 'ក្រសួងពាណិជ្ជកម្មបោះពុម្ពផែនទីវិនិយោគថ្មីសម្រាប់ឆ្នាំ 2027',
    excerpt: 'The roadmap prioritizes clean energy, digital infrastructure, and value-added agriculture exports.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop',
    topic: 'policy',
    source: 'RFA Khmer',
    date: 'May 19, 2026',
    readTime: '3 min',
    views: '1.6k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useBusinessFeed() {
  const articles = ref<PoliticsArticle[]>(ARTICLES)
  const activeTopic = ref('all')

  const breakingArticles = computed(() =>
    articles.value.filter((a) => a.isBreaking)
  )

  const filteredArticles = computed(() =>
    activeTopic.value === 'all'
      ? articles.value
      : articles.value.filter((a) => a.topic === activeTopic.value)
  )

  const featuredArticle = computed(
    () =>
      filteredArticles.value.find((a) => a.isFeatured) ??
      filteredArticles.value[0] ??
      null
  )

  const gridArticles = computed(() => {
    const featured = featuredArticle.value
    return filteredArticles.value.filter((a) => a.id !== featured?.id)
  })

  const trendingArticles = computed(() =>
    [...articles.value]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 4)
  )

  function topicIcon(key: string) {
    return BUSINESS_SUB_TOPICS.find((t) => t.key === key)?.icon ?? Briefcase
  }

  function topicLabel(key: string) {
    return BUSINESS_SUB_TOPICS.find((t) => t.key === key)?.label ?? 'Business'
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
