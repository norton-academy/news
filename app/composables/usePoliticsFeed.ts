import { ref, computed } from 'vue'
import {
  Building2,
  Vote,
  Globe,
  TrendingUp,
  Scale,
} from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const SUB_TOPICS: SubTopic[] = [
  { key: 'parliament',     label: 'Parliament',     labelKm: 'រដ្ឋសភា',             icon: Building2,  count: 12 },
  { key: 'elections',      label: 'Elections',      labelKm: 'ការបោះឆ្នោត',         icon: Vote,       count: 8  },
  { key: 'foreign_policy', label: 'Foreign Policy', labelKm: 'គោលនយោបាយ',          icon: Globe,      count: 9  },
  { key: 'economy',        label: 'Economy',        labelKm: 'សេដ្ឋកិច្ច',          icon: TrendingUp, count: 15 },
  { key: 'law_justice',    label: 'Law & Justice',  labelKm: 'ច្បាប់និងយុត្តិធម៌',   icon: Scale,      count: 6  },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 1,
    title: 'National Assembly Passes Landmark Digital Economy Bill',
    titleKm: 'រដ្ឋសភាអនុម័តច្បាប់សេដ្ឋកិច្ចឌីជីថលដ៏សំខាន់',
    excerpt: 'The National Assembly unanimously approved the Digital Economy Framework Bill, paving the way for new regulations governing fintech, e-commerce, and data sovereignty across Cambodia.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&h=500&fit=crop',
    topic: 'parliament',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '4.8k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Cambodia and China Sign Five New Infrastructure Cooperation Agreements',
    titleKm: 'កម្ពុជានិងចិនចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងហេដ្ឋារចនាសម្ព័ន្ធថ្មី ៥',
    excerpt: 'During a state visit to Beijing, Cambodian officials finalized agreements covering port development, railway expansion, and a new special economic zone in Sihanoukville.',
    image: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'NEC Announces Official Timeline for 2027 Commune Elections',
    titleKm: 'គណៈកម្មការជាតិរៀបចំការបោះឆ្នោតប្រកាសកាលវិភាគការបោះឆ្នោតឃុំ ២០២៧',
    excerpt: 'The National Election Committee set registration deadlines and confirmed polling stations will increase by 15% in rural provinces to improve access for first-time voters.',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '2.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 4,
    title: 'Supreme Court Rules on Landmark Land Rights Case in Kampong Cham',
    titleKm: 'តុលាការកំពូលសម្រេចលើបណ្ដឹងសិទ្ធិដីធ្លីដ៏សំខាន់នៅកំពង់ចាម',
    excerpt: 'In a precedent-setting decision, the Supreme Court ruled in favor of 340 farming families disputing land concessions granted to a private development company in 2019.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'VOD Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Ministry of Economy Projects 6.8% GDP Growth for Full Year 2026',
    titleKm: 'ក្រសួងសេដ្ឋកិច្ចព្យាករណ៍កំណើន GDP ៦.៨% ក្នុងឆ្នាំ ២០២៦',
    excerpt: 'Revised upward from the original 6% forecast, the ministry cited stronger-than-expected garment exports and a 28% surge in tourist arrivals from ASEAN countries.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    topic: 'economy',
    source: 'Fresh News',
    date: 'May 24, 2026',
    readTime: '3 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: 'Senate Committee Reviews Proposed Amendments to Anti-Corruption Law',
    titleKm: 'គណៈកម្មការព្រឹទ្ធសភាពិនិត្យវិសោធនកម្មច្បាប់ប្រឆាំងអំពើពុករលួយ',
    excerpt: 'The proposed amendments strengthen asset declaration requirements for senior officials and introduce mandatory three-year cooling-off periods for civil servants moving to the private sector.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    topic: 'parliament',
    source: 'Kohsantepheap',
    date: 'May 23, 2026',
    readTime: '4 min',
    views: '1.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: 'Cambodia Joins ASEAN Digital Economy Framework as Full Signatory',
    titleKm: 'កម្ពុជាចូលរួមក្របខ័ណ្ឌសេដ្ឋកិច្ចឌីជីថលអាស៊ាន',
    excerpt: 'As the last ASEAN member to sign, Cambodia commits to cross-border data flow standards, digital trade facilitation, and joint cybersecurity protocols by 2028.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Dap News',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Opposition Parties Call for Independent Electoral Commission Review',
    titleKm: 'គណបក្សប្រឆាំងស្នើឱ្យពិនិត្យឡើងវិញនូវគណៈកម្មការជាតិរៀបចំការបោះឆ្នោត',
    excerpt: 'A coalition of opposition groups formally submitted a petition requesting an independent audit of NEC composition and voter roll accuracy ahead of the 2027 election cycle.',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 21, 2026',
    readTime: '3 min',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: 'New Anti-Money Laundering Regulations Take Effect Next Month',
    titleKm: 'បទប្បញ្ញត្តិថ្មីប្រឆាំងការសំអាតប្រាក់នឹងចូលជាធរមានខែក្រោយ',
    excerpt: 'The Financial Intelligence Unit will gain new powers to freeze assets and compel disclosures from real estate developers, cryptocurrency exchanges, and legal professionals.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'Fresh News',
    date: 'May 20, 2026',
    readTime: '4 min',
    views: '1.5k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function usePoliticsFeed() {
  const articles = ref<PoliticsArticle[]>(ARTICLES)
  const activeTopic = ref('all')

  const breakingArticles = computed(() =>
    articles.value.filter(a => a.isBreaking)
  )

  const filteredArticles = computed(() =>
    activeTopic.value === 'all'
      ? articles.value
      : articles.value.filter(a => a.topic === activeTopic.value)
  )

  const featuredArticle = computed(() =>
    filteredArticles.value.find(a => a.isFeatured) ??
    filteredArticles.value[0] ??
    null
  )

  const gridArticles = computed(() => {
    const featured = featuredArticle.value
    return filteredArticles.value.filter(a => a.id !== featured?.id)
  })

  const trendingArticles = computed(() =>
    [...articles.value]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 4)
  )

  function topicIcon(key: string) {
    return SUB_TOPICS.find(t => t.key === key)?.icon ?? Building2
  }

  function topicLabel(key: string) {
    return SUB_TOPICS.find(t => t.key === key)?.label ?? 'General'
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
