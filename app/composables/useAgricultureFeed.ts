import { ref, computed } from 'vue'
import { Sprout, Tractor, Package, Users, Droplets, Leaf } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const AGRICULTURE_SUB_TOPICS: SubTopic[] = [
  { key: 'crops', label: 'Crops', labelKm: 'ដំណាំ', icon: Sprout, count: 10 },
  { key: 'livestock', label: 'Livestock', labelKm: 'សត្វចិញ្ចឹម', icon: Users, count: 8 },
  { key: 'agritech', label: 'Agri-Tech', labelKm: 'បច្ចេកវិទ្យាកសិកម្ម', icon: Tractor, count: 7 },
  { key: 'trade', label: 'Trade', labelKm: 'ពាណិជ្ជកម្ម', icon: Package, count: 6 },
  { key: 'water', label: 'Water', labelKm: 'ទឹក', icon: Droplets, count: 9 },
  { key: 'sustainability', label: 'Sustainability', labelKm: 'ចីរភាព', icon: Leaf, count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 81,
    title: 'Rice Exports Surge After New Milling Standards Take Effect',
    titleKm: 'ការនាំចេញស្រូវកើនឡើងបន្ទាប់ពីស្តង់ដារកិនថ្មីចូលជាធរមាន',
    excerpt: 'Millers say quality upgrades are helping Cambodian fragrant rice win stronger demand in Europe and the Gulf.',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&h=500&fit=crop',
    topic: 'trade',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '5.2k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 82,
    title: 'Farmers Adopt Smart Irrigation Systems in Drought-Prone Provinces',
    titleKm: 'កសិករទទួលយកប្រព័ន្ធស្រោចស្រពឆ្លាតវៃនៅខេត្តប្រឈមគ្រោះរាំងស្ងួត',
    excerpt: 'New sensors and solar pumps are helping rice growers cut water use and stabilize yields during the dry season.',
    image: 'https://images.unsplash.com/photo-1592417817038-d13fd7342609?w=600&h=400&fit=crop',
    topic: 'agritech',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '4.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 83,
    title: 'New Livestock Health Campaign Targets Rural Poultry Farmers',
    titleKm: 'យុទ្ធនាការសុខភាពសត្វថ្មីកំណត់គោលដៅកសិករចិញ្ចឹមមាន់ជនបទ',
    excerpt: 'Veterinarians will travel province by province to offer vaccines, training, and biosecurity guidance.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop',
    topic: 'livestock',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 84,
    title: 'Mekong Water Levels Stabilize After Early Monsoon Rains',
    titleKm: 'កម្រិតទឹកមេគង្គមានស្ថេរភាពបន្ទាប់ពីភ្លៀងមុនរដូវមូសុង',
    excerpt: 'Officials say the improved water supply should support dry-season vegetable planting and fish migration routes.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop',
    topic: 'water',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 85,
    title: 'Organic Pepper Growers Launch Cooperative Branding Campaign',
    titleKm: 'អ្នកដាំម្រេចអ័រហ្គានិចចាប់ផ្តើមយុទ្ធនាការម៉ាករួមគ្នា',
    excerpt: 'The campaign aims to open premium export channels and give smallholders a stronger bargaining position.',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=400&fit=crop',
    topic: 'sustainability',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '4 min',
    views: '3.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 86,
    title: 'Agribusiness Startups Bring Drone Mapping to Corn Fields',
    titleKm: 'ស្តាតអាប់កសិកម្មនាំយកការគូសផែនទីដ្រូនទៅវាលពោត',
    excerpt: 'The service helps growers spot pest pressure early and plan fertilizer application more precisely.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb221f7a1?w=600&h=400&fit=crop',
    topic: 'agritech',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '3 min',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 87,
    title: 'Farm Cooperatives Expand Cold Storage for Fruit Harvests',
    titleKm: 'សហគមន៍កសិករពង្រីកបន្ទប់ត្រជាក់សម្រាប់ផលឈើ',
    excerpt: 'New storage rooms in Kampot and Battambang aim to reduce spoilage and improve access to export buyers.',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665c6e2?w=600&h=400&fit=crop',
    topic: 'trade',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 88,
    title: 'Rice Research Center Releases Climate-Resilient Seed Varieties',
    titleKm: 'មជ្ឈមណ្ឌលស្រាវជ្រាវស្រូវបញ្ចេញពូជធន់នឹងអាកាសធាតុថ្មី',
    excerpt: 'The new seed lines are designed for low rainfall and shorter growing seasons in the northern provinces.',
    image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=600&h=400&fit=crop',
    topic: 'crops',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '4 min',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 89,
    title: 'Greenhouse Vegetables Gain Popularity in Phnom Penh Markets',
    titleKm: 'បន្លែក្នុងផ្ទះកញ្ចក់ទទួលការពេញនិយមនៅទីផ្សារភ្នំពេញ',
    excerpt: 'Urban retailers say consumers are willing to pay more for consistent quality and pesticide-free produce.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    topic: 'sustainability',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '3 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 90,
    title: 'Solar-Powered Water Pumps Expand Access for Smallholders',
    titleKm: 'ម៉ាស៊ីនបូមទឹកថាមពលព្រះអាទិត្យពង្រីកការចូលប្រើសម្រាប់កសិករតូច',
    excerpt: 'The subsidy program lowers fuel costs and helps farmers irrigate crops more predictably through the dry season.',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop',
    topic: 'water',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '4 min',
    views: '2.2k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useAgricultureFeed() {
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
    return AGRICULTURE_SUB_TOPICS.find((topic) => topic.key === key)?.icon ?? Sprout
  }

  function topicLabel(key: string) {
    return AGRICULTURE_SUB_TOPICS.find((topic) => topic.key === key)?.label ?? 'Agriculture'
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
