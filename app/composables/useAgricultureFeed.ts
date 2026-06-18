import { ref, computed } from 'vue'
import { Sprout, Tractor, Package, Users, Droplets, Leaf } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const AGRICULTURE_SUB_TOPICS: SubTopic[] = [
  { key: 'crops',          label: 'ដំណាំ',            icon: Sprout,   count: 10 },
  { key: 'livestock',      label: 'ការចិញ្ចឹមសត្វ',     icon: Users,    count: 8  },
  { key: 'agritech',       label: 'បច្ចេកវិទ្យាកសិកម្ម',  icon: Tractor,  count: 7  },
  { key: 'trade',          label: 'ពាណិជ្ជកម្ម',        icon: Package,  count: 6  },
  { key: 'water',          label: 'ប្រភពទឹក',         icon: Droplets, count: 9  },
  { key: 'sustainability', label: 'និរន្តរភាព',        icon: Leaf,     count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 81,
    title: 'ការនាំចេញអង្ករហក់ឡើងខ្ពស់ បន្ទាប់ពីស្តង់ដារម៉ាស៊ីនកិនស្រូវថ្មីចូលជាធរមាន',
    excerpt: 'ម្ចាស់រោងម៉ាស៊ីនកិនស្រូវលើកឡើងថា ការធ្វើបច្ចុប្បន្នភាពគុណភាពកំពុងជួយឱ្យអង្ករក្រអូបកម្ពុជា ទទួលបានតម្រូវការកាន់តែខ្លាំងនៅអឺរ៉ុប និងតំបន់ឈូងសមុទ្រពែរ្ស។',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=900&h=500&fit=crop',
    topic: 'trade',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '5.2k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 82,
    title: 'កសិករចាប់ផ្តើមប្រើប្រាស់ប្រព័ន្ធស្រោចស្រពវៃឆ្លាត នៅតាមបណ្តាខេត្តដែលងាយរងគ្រោះដោយគ្រោះរាំងស្ងួត',
    excerpt: 'ឧបករណ៍សែនស័រ និងម៉ាស៊ីនបូមទឹកដើរដោយថាមពលព្រះអាទិត្យថ្មី កំពុងជួយអ្នកដាំដុះស្រូវកាត់បន្ថយការប្រើប្រាស់ទឹក និងរក្សាទិន្នផលឱ្យមានលំនឹងក្នុងរដូវប្រាំង។',
    image: 'https://gdb.voanews.com/5802ab7e-b3b4-4524-8322-48c61b56af38_cx0_cy9_cw0_w1023_r1_s.jpg',
    topic: 'agritech',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '៤ នាទី',
    views: '4.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 83,
    title: 'យុទ្ធនាការសុខភាពសត្វពាហនៈថ្មី ឆ្ពោះទៅរកកសិករចិញ្ចឹមបក្សីនៅតាមជនបទ',
    excerpt: 'គ្រូពេទ្យសត្វនឹងធ្វើដំណើរចុះទៅតាមបណ្តាខេត្តនានា ដើម្បីផ្តល់វ៉ាក់សាំង ការបណ្តុះបណ្តាល និងការណែនាំអំពីសុវត្ថិភាពជីវសាស្ត្រ។',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&h=400&fit=crop',
    topic: 'livestock',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 84,
    title: 'កម្រិតទឹកទន្លេមេគង្គមានលំនឹងឡើងវិញ បន្ទាប់ពីមានធ្លាក់ភ្លៀងដើមរដូវវស្សា',
    excerpt: 'មន្ត្រីជំនាញថ្លែងថា ការផ្គត់ផ្គង់ទឹកដែលបានធូរស្រាលនេះ គួរតែអាចជួយដល់ការដាំដុះបន្លែក្នុងរដូវប្រាំង និងគន្លងផ្លាស់ទីរបស់សត្វត្រី។',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&h=400&fit=crop',
    topic: 'water',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 85,
    title: 'អ្នកដាំម្រេចសរីរាង្គ បើកយុទ្ធនាការបង្កើតម៉ាកសញ្ញារួមគ្នារបស់សហគមន៍',
    excerpt: 'យុទ្ធនាការនេះមានគោលបំណងបើកច្រកនាំចេញលំដាប់ខ្ពស់ និងផ្តល់ឱ្យកសិករខ្នាតតូចនូវអំណាចចរចាកាន់តែរឹងមាំនៅលើទីផ្សារ។',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=400&fit=crop',
    topic: 'sustainability',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៤ នាទី',
    views: '3.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 86,
    title: 'ក្រុមហ៊ុនបង្កើតថ្មីផ្នែកកសិធុរកិច្ច នាំយកបច្ចេកវិទ្យាដ្រូនវាស់វែងផែនទីមកប្រើប្រាស់ក្នុងចម្ការចោត',
    excerpt: 'សេវាកម្មនេះជួយឱ្យអ្នកដាំដុះអាចមើលឃើញពីសម្ពាធសត្វល្អិតបំផ្លាញបានឆាប់រហ័ស និងរៀបចំផែនការដាក់ជីបានកាន់តែជាក់លាក់។',
    image: 'https://media.licdn.com/dms/image/v2/D5612AQE1p0aR9NcDcA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1703559214630?e=2147483647&v=beta&t=MngVr45IK0oLr58cOdHg4pscGzFUibo-v5MoMmXOpgI',
    topic: 'agritech',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '៣ នាទី',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 87,
    title: 'សហគមន៍កសិកម្ម ពង្រីកឃ្លាំងផ្ទុកត្រជាក់សម្រាប់ការប្រមូលផលផ្លែឈើ',
    excerpt: 'បន្ទប់ផ្ទុកទំនិញថ្មីនៅក្នុងខេត្តកំពត និងខេត្តបាត់ដំបង មានគោលបំណងកាត់បន្ថយការខូចខាត និងបង្កើនឱកាសជួបជាមួយអ្នកទិញដើម្បីនាំចេញ។',
    image: 'https://s3.ams.com.kh/economy/2024/07/450616935_1031538638337999_7699050370433580962_n.jpg',
    topic: 'trade',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '៤ នាទី',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 88,
    title: 'មជ្ឈមណ្ឌលស្រាវជ្រាវស្រូវ បញ្ចេញពូជស្រូវថ្មីដែលអាចធន់នឹងបម្រែបម្រួលអាកាសធាតុ',
    excerpt: 'ខ្សែស្រឡាយពូជស្រូវថ្មីទាំងនេះ ត្រូវបានរចនាឡើងសម្រាប់តំបន់ដែលមានរបាយទឹកភ្លៀងទាប និងមានរដូវកាលដាំដុះខ្លី នៅតាមបណ្តាខេត្តភាគខាងជើង។',
    image: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=600&h=400&fit=crop',
    topic: 'crops',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '៤ នាទី',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 89,
    title: 'បន្លែដាំក្នុងផ្ទះកញ្ចក់ ទទួលបានការគាំទ្រកាន់តែខ្លាំងនៅក្នុងទីផ្សារក្រុងភ្នំពេញ',
    excerpt: 'អ្នកលក់រាយនៅទីក្រុងនិយាយថា ភ្នាក់ងារអ្នកទិញមានឆន្ទៈចំណាយប្រាក់ច្រើនជាងមុន ដើម្បីទទួលបានគុណភាពថេរ និងកសិផលដែលគ្មានជាតិគីមី។',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
    topic: 'sustainability',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '៣ នាទី',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 90,
    title: 'ម៉ាស៊ីនបូមទឹកដើរដោយថាមពលព្រះអាទិត្យ បង្កើនលទ្ធភាពទទួលបានទឹកសម្រាប់កសិករខ្នាតតូច',
    excerpt: 'កម្មវិធីឧបត្ថម្ភធននេះ ជួយកាត់បន្ថយថ្លៃចំណាយលើប្រេងឥន្ធនៈ និងជួយកសិករក្នុងការស្រោចស្រពដំណាំបានកាន់តែច្បាស់លាស់ពេញមួយរដូវប្រាំង។',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop',
    topic: 'water',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '៤ នាទី',
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
