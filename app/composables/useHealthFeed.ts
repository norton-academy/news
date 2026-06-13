import { ref, computed } from 'vue'
import { HeartPulse, Pill, Shield, Stethoscope, Syringe, Leaf } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const HEALTH_SUB_TOPICS: SubTopic[] = [
  { key: 'public_health', label: 'Public Health', labelKm: 'សុខភាពសាធារណៈ', icon: HeartPulse, count: 10 },
  { key: 'hospitals', label: 'Hospitals', labelKm: 'មន្ទីរពេទ្យ', icon: Stethoscope, count: 8 },
  { key: 'pharmacy', label: 'Pharmacy', labelKm: 'ឱសថស្ថាន', icon: Pill, count: 7 },
  { key: 'vaccines', label: 'Vaccines', labelKm: 'វ៉ាក់សាំង', icon: Syringe, count: 6 },
  { key: 'safety', label: 'Safety', labelKm: 'សុវត្ថិភាព', icon: Shield, count: 9 },
  { key: 'wellness', label: 'Wellness', labelKm: 'សុខុមាលភាព', icon: Leaf, count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 41,
    title: 'National Hospital Network Adds 200 New Telemedicine Rooms',
    titleKm: 'បណ្តាញមន្ទីរពេទ្យជាតិនឹងបន្ថែមបន្ទប់ telemedicine ថ្មី ២០០',
    excerpt: 'The remote consultation rollout connects district hospitals with specialists in Phnom Penh for faster diagnosis and referrals.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=500&fit=crop',
    topic: 'hospitals',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '4.9k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 42,
    title: 'Ministry Launches Child Vaccination Drive Across Rural Provinces',
    titleKm: 'ក្រសួងចាប់ផ្តើមយុទ្ធនាការចាក់វ៉ាក់សាំងកុមារនៅខេត្តជនបទ',
    excerpt: 'Mobile clinics will visit schools and commune halls to improve coverage for measles, polio, and routine immunizations.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
    topic: 'vaccines',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 43,
    title: 'Pharmacy Regulators Intensify Checks on Counterfeit Medicines',
    titleKm: 'អាជ្ញាធរឱសថបង្កើនការត្រួតពិនិត្យថ្នាំក្លែងក្លាយ',
    excerpt: 'Authorities say the crackdown will focus on online sellers and unlicensed distributors in major urban markets.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&h=400&fit=crop',
    topic: 'pharmacy',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 44,
    title: 'Emergency Response Teams Train on Heatwave and Flood Preparedness',
    titleKm: 'ក្រុមឆ្លើយតបបន្ទាន់ហ្វឹកហាត់ត្រៀមខ្យល់ក្តៅនិងទឹកជំនន់',
    excerpt: 'The updated response plan includes mobile clinics, clean water stations, and first-aid coordination for vulnerable communities.',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop',
    topic: 'safety',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 45,
    title: 'New Nutrition Program Targets Diabetes Prevention in Phnom Penh',
    titleKm: 'កម្មវិធីអាហារូបត្ថម្ភថ្មីកំណត់គោលដៅការពារទឹកនោមផ្អែមនៅភ្នំពេញ',
    excerpt: 'Clinics will offer counseling on diet, exercise, and blood sugar screening at community health centers.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop',
    topic: 'wellness',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '4 min',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 46,
    title: 'District Clinics Begin Digital Patient Record Transition',
    titleKm: 'គ្លីនិកស្រុកចាប់ផ្តើមផ្លាស់ប្តូរទិន្នន័យអ្នកជំងឺទៅប្រព័ន្ធឌីជីថល',
    excerpt: 'The new records system should reduce duplicate tests and help doctors share essential case notes securely.',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop',
    topic: 'public_health',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '3 min',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 47,
    title: 'Royal University Medical Faculty Expands Community Screening Programs',
    titleKm: 'មហាវិទ្យាល័យវេជ្ជសាស្ត្រពង្រីកកម្មវិធីពិនិត្យសុខភាពសហគមន៍',
    excerpt: 'Students and faculty will travel to underserved areas for blood pressure, eye, and dental screenings.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    topic: 'public_health',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.7k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 48,
    title: 'Phnom Penh Hospitals Test AI Triage for Emergency Rooms',
    titleKm: 'មន្ទីរពេទ្យភ្នំពេញសាកល្បង AI សម្រាប់ការតម្រៀបអ្នកជំងឺបន្ទាន់',
    excerpt: 'The pilot will prioritize non-invasive screening and faster routing for critical patients during peak hours.',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
    topic: 'hospitals',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '4 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 49,
    title: 'Wellness Campaign Promotes Exercise and Sleep Hygiene for Office Workers',
    titleKm: 'យុទ្ធនាការសុខុមាលភាពលើកទឹកចិត្តលំហាត់ប្រាណនិងការគេងសម្រាប់អ្នកការិយាល័យ',
    excerpt: 'Public sessions across the capital will offer stress management advice, guided stretching, and nutrition tips.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    topic: 'wellness',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '3 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 50,
    title: 'New Infection Control Standards Roll Out in Private Clinics',
    titleKm: 'ស្តង់ដារត្រួតពិនិត្យមេរោគថ្មីចាប់ផ្តើមនៅគ្លីនិកឯកជន',
    excerpt: 'The health ministry says routine audits will check sterilization, waste handling, and staff training compliance.',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=400&fit=crop',
    topic: 'safety',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '4 min',
    views: '2.2k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useHealthFeed() {
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
    return HEALTH_SUB_TOPICS.find((topic) => topic.key === key)?.icon ?? HeartPulse
  }

  function topicLabel(key: string) {
    return HEALTH_SUB_TOPICS.find((topic) => topic.key === key)?.label ?? 'Health'
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
