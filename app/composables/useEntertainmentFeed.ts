import { ref, computed } from 'vue'
import { Clapperboard, Music, Tv, Star, Film, Camera } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const ENTERTAINMENT_SUB_TOPICS: SubTopic[] = [
  { key: 'movies', label: 'Movies', labelKm: 'ភាពយន្ត', icon: Film, count: 10 },
  { key: 'music', label: 'Music', labelKm: 'តន្ត្រី', icon: Music, count: 9 },
  { key: 'tv', label: 'TV', labelKm: 'ទូរទស្សន៍', icon: Tv, count: 7 },
  { key: 'celebrities', label: 'Celebrities', labelKm: 'តារាល្បី', icon: Star, count: 8 },
  { key: 'events', label: 'Events', labelKm: 'ព្រឹត្តិការណ៍', icon: Clapperboard, count: 6 },
  { key: 'lifestyle', label: 'Lifestyle', labelKm: 'របៀបរស់នៅ', icon: Camera, count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 61,
    title: 'Angkor Music Festival Sells Out in 48 Hours',
    titleKm: 'មហោស្រពតន្ត្រីអង្គរលក់អស់ក្នុង ៤៨ ម៉ោង',
    excerpt: 'Organizers expanded the lineup with Khmer headliners, regional acts, and an immersive night show near the temple complex.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=500&fit=crop',
    topic: 'music',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '6.4k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 62,
    title: 'Khmer Comedy Series Returns With New Phnom Penh Filming Locations',
    titleKm: 'ស៊េរីកំប្លែងខ្មែរវិលត្រឡប់ជាមួយទីតាំងថតថ្មីនៅភ្នំពេញ',
    excerpt: 'The second season will feature local writers, street-market scenes, and guest appearances from Cambodian comedians.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
    topic: 'tv',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '4.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 63,
    title: 'National Film Center Launches Grants for First-Time Directors',
    titleKm: 'មជ្ឈមណ្ឌលភាពយន្តជាតិបើកជំនួយសម្រាប់អ្នកដឹកនាំដំបូង',
    excerpt: 'The program will fund short films, documentary pitches, and production training for young Cambodian crews.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
    topic: 'movies',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 64,
    title: 'Celebrity Chef-Host Opens Riverside Cultural Dining Space',
    titleKm: 'តារាមេចុងភៅបើកកន្លែងញុំាបែបវប្បធម៌នៅមាត់ទន្លេ',
    excerpt: 'The new venue blends performance nights, local recipes, and regional art showcases in a restored colonial building.',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
    topic: 'celebrities',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '4.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 65,
    title: 'Open-Air Street Performance Series Draws Crowds to Battambang',
    titleKm: 'ស៊េរីការសម្តែងតាមដងផ្លូវទាក់ទាញមនុស្សទៅបាត់ដំបង',
    excerpt: 'Artists, dancers, and visual performers will travel across provinces with weekend showcases through June.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
    topic: 'events',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '3 min',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 66,
    title: 'Khmer Pop Album Debuts at No. 1 on Regional Streaming Charts',
    titleKm: 'អាល់ប៊ុមប៉ុបខ្មែរឡើងលេខ១លើតារាងស្ទ្រីមតំបន់',
    excerpt: 'The record blends traditional instrumentation with modern production and features collaborations with ASEAN artists.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
    topic: 'music',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '4 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 67,
    title: 'TV Drama Filmmakers Explore New Funding for Khmer Language Content',
    titleKm: 'អ្នកផលិតរឿងទូរទស្សន៍ស្វែងរកថវិកាថ្មីសម្រាប់មាតិកាភាសាខ្មែរ',
    excerpt: 'Broadcasters and creators are pushing for more local productions with stronger scripts and better post-production support.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
    topic: 'tv',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 68,
    title: 'Young Directors Launch Short-Form Film Competition in Phnom Penh',
    titleKm: 'អ្នកដឹកនាំវ័យក្មេងចាប់ផ្តើមការប្រកួតភាពយន្តខ្លីនៅភ្នំពេញ',
    excerpt: 'The competition will showcase stories from students, indie filmmakers, and first-time screenwriters.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    topic: 'movies',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '3 min',
    views: '2.7k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 69,
    title: 'Actress and Humanitarian Launches Youth Arts Mentorship Program',
    titleKm: 'តារាសម្ដែងនិងអ្នកមនុស្សធម៌ចាប់ផ្តើមកម្មវិធីណែនាំសិល្បៈយុវជន',
    excerpt: 'The initiative pairs emerging performers with mentors across acting, dance, styling, and backstage production.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop',
    topic: 'celebrities',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '4 min',
    views: '2.5k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 70,
    title: 'Lifestyle Column: The Rise of Khmer Design in Modern Homes',
    titleKm: 'ជួរឈររបៀបរស់នៅ: ការកើនឡើងនៃការរចនាខ្មែរនៅផ្ទះសម័យថ្មី',
    excerpt: 'Interior designers say traditional patterns, woodwork, and local textiles are back in demand among urban homeowners.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop',
    topic: 'lifestyle',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '3 min',
    views: '2.2k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useEntertainmentFeed() {
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
    return ENTERTAINMENT_SUB_TOPICS.find((topic) => topic.key === key)?.icon ?? Clapperboard
  }

  function topicLabel(key: string) {
    return ENTERTAINMENT_SUB_TOPICS.find((topic) => topic.key === key)?.label ?? 'Entertainment'
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
