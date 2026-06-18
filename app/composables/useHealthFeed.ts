import { ref, computed } from 'vue'
import { HeartPulse, Pill, Shield, Stethoscope, Syringe, Leaf } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const HEALTH_SUB_TOPICS: SubTopic[] = [
  { key: 'public_health', label: 'សុខភាពសាធារណៈ', icon: HeartPulse, count: 10 },
  { key: 'hospitals',     label: 'មន្ទីរពេទ្យ',        icon: Stethoscope, count: 8 },
  { key: 'pharmacy',      label: 'ឱសថស្ថាន',        icon: Pill,        count: 7 },
  { key: 'vaccines',      label: 'វ៉ាក់សាំង',         icon: Syringe,     count: 6 },
  { key: 'safety',        label: 'សុវត្ថិភាព',        icon: Shield,      count: 9 },
  { key: 'wellness',      label: 'សុខុមាលភាព',      icon: Leaf,        count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 41,
    title: 'បណ្តាញមន្ទីរពេទ្យជាតិ បន្ថែមបន្ទប់ពិគ្រោះជំងឺពីចម្ងាយ (Telemedicine) ថ្មីចំនួន ២០០ បន្ទប់',
    excerpt: 'ការដាក់ឱ្យដំណើរការការពិគ្រោះជំងឺពីចម្ងាយនេះ នឹងតភ្ជាប់មន្ទីរពេទ្យបង្អែកស្រុកជាមួយគ្រូពេទ្យជំនាញនៅភ្នំពេញ ដើម្បីជួយឱ្យការធ្វើរោគវិនិច្ឆ័យ និងការបញ្ជូនបន្តបានលឿនជាងមុន។',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=500&fit=crop',
    topic: 'hospitals',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '4.9k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 42,
    title: 'ក្រសួងបើកយុទ្ធនាការចាក់វ៉ាក់សាំងកុមារ នៅតាមបណ្តាខេត្តដាច់ស្រយាល',
    excerpt: 'គ្លីនិកចល័តនឹងចុះទៅតាមសាលារៀន និងសាលាឃុំ ដើម្បីបង្កើនការគ្របដណ្តប់លើការចាក់វ៉ាក់សាំងការពារជំងឺកញ្ជ្រឹល ស្វិតដៃជើង និងការចាក់ថ្នាំបង្ការជាប្រចាំ។',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop',
    topic: 'vaccines',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '៤ នាទី',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 43,
    title: 'មន្ត្រីត្រួតពិនិត្យឱសថ បង្កើនការត្រួតពិនិត្យលើឱសថក្លែងក្លាយ',
    excerpt: 'អាជ្ញាធរមានសមត្ថកិច្ចថ្លែងថា វិធានការបង្ក្រាបនេះនឹងផ្តោតលើអ្នកលក់តាមអនឡាញ និងអ្នកចែកចាយដែលគ្មានអាជ្ញាប័ណ្ណ នៅក្នុងទីផ្សារទីប្រជុំជនធំៗ។',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&h=400&fit=crop',
    topic: 'pharmacy',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 44,
    title: 'ក្រុមឆ្លើយតបគ្រោះអាសន្ន ហ្វឹកហាត់លើការត្រៀមលក្ខណៈបង្ការរលកកម្តៅ និងទឹកជំនន់',
    excerpt: 'ផែនការឆ្លើយតបដែលបានធ្វើបច្ចុប្បន្នភាព រួមបញ្ចូលទាំងគ្លីនិកចល័ត ស្ថានីយទឹកស្អាត និងការសម្របសម្រួលសង្គ្រោះបឋមសម្រាប់សហគមន៍ដែលងាយរងគ្រោះ។',
    image: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop',
    topic: 'safety',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 45,
    title: 'កម្មវិធីអាហារូបត្ថម្ភថ្មី ផ្តោតលើការការពារជំងឺទឹកនោមផ្អែមនៅភ្នំពេញ',
    excerpt: 'គ្លីនិកនឹងផ្តល់ការប្រឹក្សាយោបល់អំពីរបបអាហារ ការហាត់ប្រាណ និងការពិនិត្យជាតិស្ករក្នុងឈាម នៅតាមមជ្ឈមណ្ឌលសុខភាពសហគមន៍។',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop',
    topic: 'wellness',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៤ នាទី',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 46,
    title: 'គ្លីនិកស្រុក ចាប់ផ្តើមផ្លាស់ប្តូរទៅប្រើប្រាស់ប្រព័ន្ធកត់ត្រាប្រវត្តិអ្នកជំងឺបែបឌីជីថល',
    excerpt: 'ប្រព័ន្ធកត់ត្រាថ្មីនេះ នឹងជួយកាត់បន្ថយការធ្វើតេស្តជាន់គ្នា និងជួយឱ្យគ្រូពេទ្យអាចចែករំលែកកំណត់ត្រាករណីជំងឺសំខាន់ៗប្រកបដោយសុវត្ថិភាព។',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop',
    topic: 'public_health',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '៣ នាទី',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 47,
    title: 'មហាវិទ្យាល័យវេជ្ជសាស្ត្រនៃសាកលវិទ្យាល័យភូមិន្ទ ពង្រីកកម្មវិធីពិនិត្យសុខភាពសហគមន៍',
    excerpt: 'និស្សិត និងសាស្ត្រាចារ្យ នឹងធ្វើដំណើរទៅកាន់តំបន់ដាច់ស្រយាល ដើម្បីពិនិត្យសម្ពាធឈាម ភ្នែក និងសុខភាពមាត់ធ្មេញ ជូនប្រជាពលរដ្ឋ។',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
    topic: 'public_health',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '៤ នាទី',
    views: '2.7k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 48,
    title: 'មន្ទីរពេទ្យនៅភ្នំពេញ ធ្វើតេស្តប្រព័ន្ធ AI សម្រាប់បែងចែកកម្រិតសង្គ្រោះបន្ទាន់នៅបន្ទប់សង្គ្រោះបន្ទាន់',
    excerpt: 'កម្មវិធីសាកល្បងនេះ នឹងផ្តល់អាទិភាពលើការពិនិត្យបឋមដែលមិនទាមទារការវះកាត់ និងការបញ្ជូនអ្នកជំងឺកម្រិតធ្ងន់ឱ្យបានលឿនក្នុងអំឡុងពេលមានមនុស្សច្រើន។',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
    topic: 'hospitals',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '៤ នាទី',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 49,
    title: 'យុទ្ធនាការសុខុមាលភាព ជម្រុញការហាត់ប្រាណ និងដំណេកប្រកបដោយសុខភាពសម្រាប់បុគ្គលិកការិយាល័យ',
    excerpt: 'វគ្គណែនាំសាធារណៈនៅទូទាំងរាជធានី នឹងផ្តល់ដំបូន្មានអំពីការគ្រប់គ្រងស្ត្រេស ការហាត់ពត់ប្រាណសម្រាលការហត់នឿយ និងគន្លឹះអាហារូបត្ថម្ភ។',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    topic: 'wellness',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '៣ នាទី',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 50,
    title: 'ស្តង់ដារត្រួតពិនិត្យការចងកាត់មេរោគថ្មី ដាក់ឱ្យអនុវត្តនៅតាមគ្លីនិកឯកជន',
    excerpt: 'ក្រសួងសុខាភិបាលបញ្ជាក់ថា ការចុះសវនកម្មជាប្រចាំនឹងធ្វើឡើងដើម្បីពិនិត្យការសម្លាប់មេរោគ ការគ្រប់គ្រងកាកសំណល់ និងការអនុវត្តតាមការបណ្តុះបណ្តាលរបស់បុគ្គលិក។',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=600&h=400&fit=crop',
    topic: 'safety',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '៤ នាទី',
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
