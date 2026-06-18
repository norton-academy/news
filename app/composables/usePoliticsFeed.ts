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
  { key: 'parliament',     label: 'រដ្ឋសភា',             icon: Building2,  count: 12 },
  { key: 'elections',      label: 'ការបោះឆ្នោត',         icon: Vote,       count: 8  },
  { key: 'foreign_policy', label: 'គោលនយោបាយ',          icon: Globe,      count: 9  },
  { key: 'economy',        label: 'សេដ្ឋកិច្ច',          icon: TrendingUp, count: 15 },
  { key: 'law_justice',    label: 'ច្បាប់និងយុត្តិធម៌',   icon: Scale,      count: 6  },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 1,
    title: 'រដ្ឋសភាអនុម័តច្បាប់សេដ្ឋកិច្ចឌីជីថលដ៏សំខាន់',
    excerpt: 'រដ្ឋសភាបានអនុម័តជាឯកច្ឆន្ទលើសេចក្តីព្រាងច្បាប់ក្របខ័ណ្ឌសេដ្ឋកិច្ចឌីជីថល ដែលបើកផ្លូវសម្រាប់បទប្បញ្ញត្តិថ្មីៗគ្រប់គ្រងលើវិស័យបច្ចេកវិទ្យាហិរញ្ញវត្ថុ (Fintech) ពាណិជ្ជកម្មអេឡិចត្រូនិក (E-commerce) និងអធិបតេយ្យភាពទិន្នន័យនៅទូទាំងប្រទេសកម្ពុជា។',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&h=500&fit=crop',
    topic: 'parliament',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '4.8k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'កម្ពុជានិងចិនចុះហត្ថលេខាលើកិច្ចព្រមព្រៀងហេដ្ឋារចនាសម្ព័ន្ធថ្មី ៥',
    excerpt: 'ក្នុងអំឡុងពេលទស្សនកិច្ចផ្លូវរដ្ឋនៅទីក្រុងប៉េកាំង មន្ត្រីកម្ពុជាបានសម្រេចកិច្ចព្រមព្រៀងចុងក្រោយគ្របដណ្តប់លើការអភិវឌ្ឍន៍កំពង់ផែ ការពង្រីកបណ្តាញផ្លូវរថភ្លើង និងតំបន់សេដ្ឋកិច្ចពិសេសថ្មីមួយនៅក្នុងក្រុងព្រះសីហនុ។',
    image: 'https://images.unsplash.com/photo-1605106702842-01a887a31122?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '៤ នាទី',
    views: '3.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'គណៈកម្មការជាតិរៀបចំការបោះឆ្នោតប្រកាសកាលវិភាគការបោះឆ្នោតឃុំ ២០២៧',
    excerpt: 'គណៈកម្មាធិការជាតិរៀបចំការបោះឆ្នោត (គ.ជ.ប) បានកំណត់កាលបរិច្ឆេទឈប់ទទួលពាក្យចុះឈ្មោះ និងបានបញ្ជាក់ថា ការិយាល័យបោះឆ្នោតនឹងកើនឡើង ១៥% នៅតាមបណ្តាខេត្ត ដើម្បីបង្កលក្ខណៈងាយស្រួលដល់អ្នកបោះឆ្នោតដំបូង។',
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '2.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 4,
    title: 'តុលាការកំពូលសម្រេចលើបណ្ដឹងសិទ្ធិដីធ្លីដ៏សំខាន់នៅកំពង់ចាម',
    excerpt: 'នៅក្នុងការសម្រេចចិត្តដ៏មានសារៈសំខាន់ជាប្រវត្តិសាស្ត្រ តុលាការកំពូលបានកាត់ក្តីឱ្យគ្រួសារកសិករចំនួន ៣៤០គ្រួសារ ឈ្នះក្តីក្នុងវិវាទដីសម្បទានដែលបានផ្តល់ទៅឱ្យក្រុមហ៊ុនអភិវឌ្ឍន៍ឯកជនមួយកាលពីឆ្នាំ២០១៩។',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'VOD Khmer',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '3.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: 'ក្រសួងសេដ្ឋកិច្ចព្យាករណ៍កំណើន GDP ៦.៨% ក្នុងឆ្នាំ ២០២៦',
    excerpt: 'ការកែសម្រួលដំឡើងពីការព្យាករណ៍ចាស់ ៦% នេះ គឺដោយសារតែក្រសួងបានមើលឃើញពីការនាំចេញសម្លៀកបំពាក់ដ៏រឹងមាំលើសពីការរំពឹងទុក និងការកើនឡើង ២៨% នៃចំនួនភ្ញៀវទេសចរមកពីបណ្តាប្រទេសក្នុងតំបន់អាស៊ាន។',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    topic: 'economy',
    source: 'Fresh News',
    date: 'May 24, 2026',
    readTime: '៣ នាទី',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: 'គណៈកម្មការព្រឹទ្ធសភាពិនិត្យវិសោធនកម្មច្បាប់ប្រឆាំងអំពើពុករលួយ',
    excerpt: 'វិសោធនកម្មដែលបានស្នើឡើងនេះ នឹងពង្រឹងលក្ខខណ្ឌតម្រូវក្នុងការប្រកាសទ្រព្យសម្បត្តិសម្រាប់មន្ត្រីជាន់ខ្ពស់ និងដាក់ចេញនូវរយៈពេលរង់ចាំរយៈពេលបីឆ្នាំជាកំហិត សម្រាប់មន្ត្រីរាជការដែលផ្លាស់ប្តូរទៅបម្រើការងារក្នុងវិស័យឯកជន។',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    topic: 'parliament',
    source: 'Kohsantepheap',
    date: 'May 23, 2026',
    readTime: '៤ នាទី',
    views: '1.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: 'កម្ពុជាចូលរួមក្របខ័ណ្ឌសេដ្ឋកិច្ចឌីជីថលអាស៊ាន',
    excerpt: 'ក្នុងនាមជាសមាជិកអាស៊ានចុងក្រោយគេដែលបានចុះហត្ថលេខា ប្រទេសកម្ពុជាប្តេជ្ញាអនុវត្តតាមស្តង់ដារលំហូរទិន្នន័យឆ្លងដែន ការសម្របសម្រួលពាណិជ្ជកម្មឌីជីថល និងពិធីសារសន្តិសុខសាយប័ររួមគ្នានៅត្រឹមឆ្នាំ២០២៨។',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop',
    topic: 'foreign_policy',
    source: 'Dap News',
    date: 'May 22, 2026',
    readTime: '៤ នាទី',
    views: '2.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: 'គណបក្សប្រឆាំងស្នើឱ្យពិនិត្យឡើងវិញនូវគណៈកម្មការជាតិរៀបចំការបោះឆ្នោត',
    excerpt: 'សម្ព័ន្ធភាពនៃក្រុមគណបក្សប្រឆាំងបានដាក់ញត្តិជាផ្លូវការ ដោយស្នើសុំឱ្យមានការសវនកម្មឯករាជ្យលើសមាសភាព គ.ជ.ប និងភាពត្រឹមត្រូវនៃបញ្ជីឈ្មោះអ្នកបោះឆ្នោត មុនពេលវដ្តនៃការបោះឆ្នោតឆ្នាំ២០ concert ចូលមកដល់។',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop',
    topic: 'elections',
    source: 'RFA Khmer',
    date: 'May 21, 2026',
    readTime: '៣ នាទី',
    views: '3.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: 'បទប្បញ្ញត្តិថ្មីប្រឆាំងការសំអាតប្រាក់នឹងចូលជាធរមានខែក្រោយ',
    excerpt: 'អង្គភាពស៊ើបការណ៍ហិរញ្ញវត្ថុនឹងទទួលបានអំណាចថ្មីក្នុងការបង្កកទ្រព្យសម្បត្តិ និងបង្ខំឱ្យមានការលាតត្រដាងព័ត៌មានពីសំណាក់អ្នកអភិវឌ្ឍន៍អចលនទ្រព្យ ក្រុមហ៊ុនប្តូរប្រាក់គ្រីបតូ (Cryptocurrency) និងអ្នកជំនាញផ្នែកច្បាប់។',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
    topic: 'law_justice',
    source: 'Fresh News',
    date: 'May 20, 2026',
    readTime: '៤ នាទី',
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
