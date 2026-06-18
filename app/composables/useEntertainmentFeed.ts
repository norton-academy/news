import { ref, computed } from 'vue'
import { Clapperboard, Music, Tv, Star, Film, Camera } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const ENTERTAINMENT_SUB_TOPICS: SubTopic[] = [
  { key: 'movies',      label: 'ភាពយន្ត',       icon: Film,         count: 10 },
  { key: 'music',       label: 'តន្ត្រី',          icon: Music,        count: 9  },
  { key: 'tv',          label: 'ទូរទស្សន៍',      icon: Tv,           count: 7  },
  { key: 'celebrities', label: 'អ្នកសិល្បៈល្បីៗ',  icon: Star,         count: 8  },
  { key: 'events',      label: 'ព្រឹត្តិការណ៍',    icon: Clapperboard, count: 6  },
  { key: 'lifestyle',   label: 'របៀបរស់នៅ',    icon: Camera,       count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 61,
    title: 'សំបុត្រចូលទស្សនាពិព័រណ៍តន្ត្រីអង្គរ ត្រូវបានលក់អស់ក្នុងរយៈពេល ៤៨ ម៉ោង',
    excerpt: 'អ្នករៀបចំកម្មវិធីបានពង្រីកបញ្ជីឈ្មោះសិល្បករល្បីៗ ដោយមានការចូលរួមពីតារាចម្រៀងកម្ពុជា តារាចម្រៀងក្នុងតំបន់ និងការសម្តែងពេលរាត្រីដ៏អស្ចារ្យនៅជិតបរិវេណប្រាសាទ។',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&h=500&fit=crop',
    topic: 'music',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '6.4k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 62,
    title: 'រឿងភាគកំប្លែងខ្មែរត្រឡប់មកវិញ ជាមួយទីតាំងថតថ្មីៗក្នុងរាជធានីភ្នំពេញ',
    excerpt: 'រដូវកាលទីពីរនេះ នឹងមានការចូលរួមពីអ្នកនិពន្ធក្នុងស្រុក ទិដ្ឋភាពតាមផ្សាររទេះបុក និងការចូលរួមសម្តែងពិសេសពីតារាកំប្លែងកម្ពុជាជាច្រើនរូប។',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
    topic: 'tv',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '៤ នាទី',
    views: '4.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 63,
    title: 'មជ្ឈមណ្ឌលភាពយន្តជាតិ បើកផ្តល់ប្រាក់ឧបត្ថម្ភសម្រាប់អ្នកដឹកនាំរឿងដំបូង',
    excerpt: 'កម្មវិធីនេះនឹងផ្តល់មូលនិធិដល់ភាពយន្តខ្នាតខ្លី ការបង្ហាញគម្រោងខ្សែកុនឯកសារ និងការបណ្តុះបណ្តាលផលិតកម្មសម្រាប់ក្រុមការងារវ័យក្មេងកម្ពុជា។',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
    topic: 'movies',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '3.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 64,
    title: 'មេចុងភៅ និងជាពិធីករល្បីឈ្មោះ បើកដំណើរការទីតាំងអាហារដ្ឋានវប្បធម៌តាមដងទន្លេ',
    excerpt: 'ទីកន្លែងថ្មីនេះ រួមបញ្ចូលគ្នានូវរាត្រីសម្តែងសិល្បៈ រូបមន្តម្ហូបក្នុងស្រុក និងការដាក់បង្ហាញសិល្បៈក្នុងតំបន់ នៅក្នុងអគារសម័យអាណានិគមដែលបានជួសជុលឡើងវិញ។',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&h=400&fit=crop',
    topic: 'celebrities',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '4.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 65,
    title: 'កម្មវិធីសម្តែងសិល្បៈតាមដងផ្លូវបែបបើកចំហ ទាក់ទាញហ្វូងមនុស្សយ៉ាងច្រើននៅបាត់ដំបង',
    excerpt: 'សិល្បករ អ្នករាំ និងអ្នកសម្តែងទស្សនីយភាពប្លែកភ្នែក នឹងធ្វើដំណើរទៅតាមបណ្តាខេត្តនានា ជាមួយនឹងការបង្ហាញខ្លួននៅចុងសប្តាហ៍រហូតដល់ខែមិថុនា។',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
    topic: 'events',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៣ នាទី',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 66,
    title: 'អាល់ប៊ុមចម្រៀងប៉ុបខ្មែរ ឈរនៅចំណាត់ថ្នាក់លេខ១ លើតារាងចាក់តន្ត្រីអនឡាញក្នុងតំបន់',
    excerpt: 'ស្នាដៃតន្ត្រីនេះ រួមបញ្ចូលគ្នារវាងឧបករណ៍តន្ត្រីប្រពៃណី ជាមួយការផលិតបែបសម័យទំនើប និងមានការចូលរួមសហការពីសិល្បករអាស៊ានផងដែរ។',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop',
    topic: 'music',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '៤ នាទី',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 67,
    title: 'អ្នកផលិតរឿងភាគទូរទស្សន៍ ស្វែងរកមូលនិធិថ្មីសម្រាប់ការផលិតមាតិកាជាភាសាខ្មែរ',
    excerpt: 'ស្ថានីយទូរទស្សន៍ និងអ្នកបង្កើតមាតិកា កំពុងជម្រុញឱ្យមានការផលិតក្នុងស្រុកកាន់តែច្រើន ជាមួយនឹងអត្ថបទរឿងកាន់តែល្អ និងការគាំទ្រផ្នែកបច្ចេកទេសកាត់តកាន់តែប្រសើរ។',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&h=400&fit=crop',
    topic: 'tv',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '៤ នាទី',
    views: '3.0k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 68,
    title: 'អ្នកដឹកនាំរឿងវ័យក្មេង បើកដំណើរការការប្រកួតប្រជែងភាពយន្តខ្នាតខ្លីនៅភ្នំពេញ',
    excerpt: 'ការប្រកួតប្រជែងនេះ នឹងដាក់បង្ហាញសាច់រឿងពីនិស្សិត អ្នកផលិតភាពយន្តឯករាជ្យ និងអ្នកសរសេរស្គ្រីបភាពយន្តជាលើកដំបូង។',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop',
    topic: 'movies',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '៣ នាទី',
    views: '2.7k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 69,
    title: 'តារាសម្តែង និងជាសកម្មជនមនុស្សធម៌ បើកកម្មវិធីណែនាំសិល្បៈយុវជន',
    excerpt: 'គំនិតផ្តួចផ្តើមនេះ ភ្ជាប់អ្នកសម្តែងជំនាន់ក្រោយជាមួយអ្នកណែនាំជំនាញ លើផ្នែកសម្តែង រាំ ការរៀបចំស្ទីលសម្លៀកបំពាក់ និងការផលិតនៅពីក្រោយឆាក។',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop',
    topic: 'celebrities',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '៤ នាទី',
    views: '2.5k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 70,
    title: 'អត្ថបទរបៀបរស់នៅ៖ កំណើននៃការរចនាម៉ូដបែបខ្មែរក្នុងគេហដ្ឋានសម័យទំនើប',
    excerpt: 'អ្នករចនាម៉ូដផ្នែកខាងក្នុង (Interior Designers) លើកឡើងថា គំរូក្បាច់ប្រពៃណី ការងារឈើ និងវាយនភណ្ឌក្នុងស្រុក កំពុងមានតម្រូវការឡើងវិញក្នុងចំណោមម្ចាស់ផ្ទះនៅទីក្រុង។',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=400&fit=crop',
    topic: 'lifestyle',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '៣ នាទី',
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
