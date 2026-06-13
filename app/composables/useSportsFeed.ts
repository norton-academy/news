import { ref, computed } from 'vue'
import { Trophy, Activity, BarChart3, ShieldCheck, Sparkles } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const SPORTS_SUB_TOPICS: SubTopic[] = [
  { key: 'football',   label: 'Football',   labelKm: 'បាល់ទាត់',       icon: Trophy,       count: 14 },
  { key: 'boxing',     label: 'Boxing',     labelKm: 'កីឡាក្បួន',      icon: ShieldCheck,  count: 8  },
  { key: 'athletics',  label: 'Athletics',  labelKm: 'កីឡាសន្តិសុខ',    icon: Activity,     count: 10 },
  { key: 'basketball', label: 'Basketball', labelKm: 'បាល់ក្នុងធុង',    icon: Sparkles,     count: 6  },
  { key: 'motorsport', label: 'Motorsport', labelKm: 'កីឡាម៉ូតូ',       icon: BarChart3,    count: 5  },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 21,
    title: 'Cambodia Qualifies for AFF Nations Cup Quarterfinals',
    titleKm: 'កម្ពុជា ឈានដល់ក្បាលពូល AFF Nations Cup',
    excerpt: 'A dramatic stoppage-time winner secures the national team’s best finish in the tournament since 2018.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=500&fit=crop',
    topic: 'football',
    source: 'Fresh News',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '6.2k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 22,
    title: 'Cambodian Boxer Wins Silver at Southeast Asia Championships',
    titleKm: 'អ្នកឈ្នះកម្ពុជាគ្រប់យ៉ាងទទួលពានសម្តេចព្រហ្ម',
    excerpt: 'The lightweight champion rallied in the final round to take the country’s first medal in the competition.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop',
    topic: 'boxing',
    source: 'VOD Khmer',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 23,
    title: 'Phnom Penh Marathon Attracts 10k Runners for Charity Race',
    titleKm: 'ប្រមូលមហានាគរគ្រប់ ១០០០០ អ្នករត់សម្រាប់ការរត់ប្រយុទ្ធចិត្តសប្បុរស',
    excerpt: 'Organizers report record participation as sports fans join in support of youth development programs.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55c8f?w=600&h=400&fit=crop',
    topic: 'athletics',
    source: 'RFA Khmer',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 24,
    title: 'Angkor Warriors Sign New Sponsor Deal Ahead of Season',
    titleKm: 'ក្រុម Angkor Warriors ចុះពិភាក្សាជាមួយដៃគូផ្នែកពាណិជ្ជកម្មថ្មី',
    excerpt: 'The basketball club will unveil refreshed branding and community clinics before opening night.',
    image: 'https://images.unsplash.com/photo-1505842465776-3b3b6aa99258?w=600&h=400&fit=crop',
    topic: 'basketball',
    source: 'Kohsantepheap',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '4.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 25,
    title: 'Cambodia Hosts First National Motorsport Festival in Kampot',
    titleKm: 'កម្ពុជា រៀបចំពិធីវិទ្យាសាស្រ្តម៉ូតូមូលដ្ឋានទីមួយនៅកំពត',
    excerpt: 'Rally cars, motorbikes, and drift exhibitions draw regional fans for a weekend of high-speed action.',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c889ad7f32?w=600&h=400&fit=crop',
    topic: 'motorsport',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '3 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 26,
    title: 'National Football Academy Expands Training to Rural Provinces',
    titleKm: 'សាកលវិទ្យាល័យបាល់ទាត់ជាតិពង្រឹងការបណ្តុះបណ្តាលទៅតំបន់ជនបទ',
    excerpt: 'New coaching centers will support the next generation of talent across six provinces.',
    image: 'https://images.unsplash.com/photo-1495562569060-2eec283d3391?w=600&h=400&fit=crop',
    topic: 'football',
    source: 'Fresh News',
    date: 'May 23, 2026',
    readTime: '4 min',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 27,
    title: 'Local Champion Announces Plan to Build Boxing Gym for Youth',
    titleKm: 'ជើងឯកមូលដ្ឋានប្រកាសផែនការកសាងកាំបិតឆ្នូតសម្រាប់យុវជន',
    excerpt: 'The facility will offer free training sessions and mentorship for aspiring fighters.',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=600&h=400&fit=crop',
    topic: 'boxing',
    source: 'VOD Khmer',
    date: 'May 22, 2026',
    readTime: '3 min',
    views: '2.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 28,
    title: 'Basketball League Announces New Youth Development Program',
    titleKm: 'សហព័ន្ធបាល់ទះប្រកាសកម្មវិធីអភិវឌ្ឍយុវជនថ្មី',
    excerpt: 'The league will invest in grassroots clubs and coach education ahead of the next season.',
    image: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=600&h=400&fit=crop',
    topic: 'basketball',
    source: 'RFA Khmer',
    date: 'May 21, 2026',
    readTime: '4 min',
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
