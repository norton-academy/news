import { ref, computed } from 'vue'
import { Trophy, Activity, BarChart3, ShieldCheck, Sparkles } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const SPORTS_SUB_TOPICS: SubTopic[] = [
  { key: 'football',   label: 'បាល់ទាត់',    icon: Trophy,       count: 14 },
  { key: 'boxing',     label: 'ប្រដាល់',     icon: ShieldCheck,  count: 8  },
  { key: 'athletics',  label: 'អត្តពលកម្ម',   icon: Activity,     count: 10 },
  { key: 'basketball', label: 'បាល់បោះ',    icon: Sparkles,     count: 6  },
  { key: 'motorsport', label: 'កីឡាយានយន្ត', icon: BarChart3,    count: 5  },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 21,
    title: 'កម្ពុជាឡើងទៅវគ្គត្រីមាសផ្តាច់ព្រ័ត្រនៃពានរង្វាន់ AFF Nations Cup',
    excerpt: 'ការស៊ុតបញ្ចូលទីយកឈ្នះយ៉ាងរំភើបនៅនាទីបន្ថែមចុងម៉ោង បានជួយឱ្យក្រុមជម្រើសជាតិសម្រេចបានលទ្ធផលល្អបំផុតនៅក្នុងការប្រកួតនេះ ចាប់តាំងពីឆ្នាំ២០១៨ មក។',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=500&fit=crop',
    topic: 'football',
    source: 'Fresh News',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '6.2k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 22,
    title: 'កីឡាករប្រដាល់កម្ពុជាឈ្នះមេដាយប្រាក់ក្នុងការប្រកួតជើងឯកអាស៊ីអាគ្នេយ៍',
    excerpt: 'ម្ចាស់ជើងឯកទម្ងន់ស្រាល (Lightweight) បានខិតខំប្រឹងប្រែងប្រកួតយ៉ាងខ្លាំងក្លានៅទឹកចុងក្រោយ ដើម្បីដណ្តើមបានមេដាយដំបូងជូនជាតិក្នុងការប្រកួតនេះ។',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop',
    topic: 'boxing',
    source: 'VOD Khmer',
    date: 'May 27, 2026',
    readTime: '៤ នាទី',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 23,
    title: 'ព្រឹត្តិការណ៍រត់ប្រណាំងម៉ារ៉ាតុងក្រុងភ្នំពេញ ទាក់ទាញអ្នករត់ជាង ១ម៉ឺននាក់ ដើម្បីសប្បុរសធម៌',
    excerpt: 'អ្នករៀបចំកម្មវិធីបានរាយការណ៍ពីចំនួនអ្នកចូលរួមច្រើនបំផុតជាប្រវត្តិសាស្ត្រ ខណៈដែលអ្នកគាំទ្រកីឡាបានរួមគ្នាគាំទ្រដល់កម្មវិធីអភិវឌ្ឍន៍យុវជន។',
    image: 'https://image.freshnewsasia.com/2021/2026/06/fn-2026-06-14-06-17-36-824.jpg',
    topic: 'athletics',
    source: 'RFA Khmer',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '3.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 24,
    title: 'ក្រុមបាល់បោះ Angkor Warriors ចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងឧបត្ថម្ភថ្មី មុនបើករដូវកាល',
    excerpt: 'ក្លិបបាល់បោះមួយនេះនឹងដាក់បង្ហាញការកែប្រែម៉ាកសញ្ញាថ្មី និងរៀបចំវគ្គបណ្តុះបណ្តាលសហគមន៍ មុនពេលរាត្រីបើកឆាកការប្រកួតមកដល់។',
    image: 'https://cdn.troryorng.com/wp-content/uploads/2026/06/16133409/714631199_1510821027163049_8010282073945793194_n-819x1024.jpg',
    topic: 'basketball',
    source: 'Kohsantepheap',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '4.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 25,
    title: 'កម្ពុជាធ្វើជាម្ចាស់ផ្ទះរៀបចំពិព័រណ៍កីឡាយានយន្តជាតិលើកដំបូងនៅក្នុងខេត្តកំពត',
    excerpt: 'ការដាក់បង្ហាញរថយន្តប្រណាំង (Rally) ម៉ូតូធំ និងការសម្តែងដ្រីហ្វ (Drift) បានទាក់ទាញអ្នកគាំទ្រក្នុងតំបន់ សម្រាប់ចុងសប្តាហ៍នៃល្បឿនដ៏គួរឱ្យរំភើបនេះ។',
    image: 'https://s3.ams.com.kh/economy/2023/11/20220411034538_NY_auto_show.jpeg',
    topic: 'motorsport',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៣ នាទី',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 26,
    title: 'សាលាបាល់ទាត់ជាតិ ពង្រីកការហ្វឹកហាត់ទៅកាន់បណ្តាខេត្តដាច់ស្រយាល',
    excerpt: 'មជ្ឈមណ្ឌលបង្ហាត់បង្រៀនថ្មីៗ នឹងគាំទ្រដល់ការបណ្តុះបណ្តាលទេពកោសល្យជំនាន់ក្រោយ នៅតាមបណ្តាខេត្តចំនួនប្រាំមួយ។',
    image: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=600&h=400&fit=crop',
    topic: 'football',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '៤ នាទី',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 27,
    title: 'ម្ចាស់ជើងឯកក្នុងស្រុក ប្រកាសផែនការសាងសង់សង្វៀនប្រដាល់សម្រាប់យុវជន',
    excerpt: 'ទីកន្លែងហ្វឹកហាត់នេះ នឹងផ្តល់ជូននូវវគ្គហ្វឹកហ្វឺនដោយឥតគិតថ្លៃ និងការណែនាំតម្រង់ទិសសម្រាប់អ្នកដែលមានបំណងចង់ក្លាយជាអ្នកប្រដាល់។',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=600&h=400&fit=crop',
    topic: 'boxing',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '៣ នាទី',
    views: '2.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 28,
    title: 'លីគបាល់បោះ ប្រកាសកម្មវិធីថ្មីសម្រាប់ការអភិវឌ្ឍយុវជន',
    excerpt: 'លីគនឹងវិនិយោគលើក្លិបមូលដ្ឋាន និងការអប់រំបណ្តុះបណ្តាលគ្រូបង្វឹក មុនពេលរដូវកាលបន្ទាប់ចាប់ផ្តើម។',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=600&h=400&fit=crop',
    topic: 'basketball',
    source: 'RFA Khmer',
    date: 'May 21, 2026',
    readTime: '៤ នាទី',
    views: '2.0k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useSportsFeed() {
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
    return SPORTS_SUB_TOPICS.find((t) => t.key === key)?.icon ?? Trophy
  }

  function topicLabel(key: string) {
    return SPORTS_SUB_TOPICS.find((t) => t.key === key)?.label ?? 'Sports'
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
