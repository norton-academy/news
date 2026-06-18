import { ref, computed } from "vue"
import type { Article, FeedFilter } from "~/types/news"

const ARTICLES: Article[] = [
  {
    id: 5,
    title: 'ក្រសួងសេដ្ឋកិច្ចព្យាករណ៍កំណើន GDP ៦.៨% ក្នុងឆ្នាំ ២០២៦',
    excerpt: 'ការកែសម្រួលដំឡើងពីការព្យាករណ៍ចាស់ ៦% នេះ គឺដោយសារតែក្រសួងបានមើលឃើញពីការនាំចេញសម្លៀកបំពាក់ដ៏រឹងមាំលើសពីការរំពឹងទុក និងការកើនឡើង ២៨% នៃចំនួនភ្ញៀវទេសចរមកពីបណ្តាប្រទេសក្នុងតំបន់អាស៊ាន។',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    category: 'economy',
    source: 'Fresh News',
    date: 'May 24, 2026',
    readTime: '៣ នាទី',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 13,
    title: 'ក្រុមហ៊ុនអាជីវកម្មថ្មី (Startup) នៅភ្នំពេញកៀរគរទុនបាន ៤លានដុល្លារ ដើម្បីពង្រីកបច្ចេកវិទ្យាកសិកម្ម',
    excerpt: 'ការកៀរគរទុនក្នុងវគ្គនេះ នឹងជួយពន្លឿនការអភិវឌ្ឍឧបករណ៍កសិកម្មទំនើប (Precision Farming) សម្រាប់អ្នកដាំដុះស្រូវនៅក្នុងប្រទេសកម្ពុជា និងអាស៊ាន។',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    category: 'startup',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '2.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 49,
    title: 'យុទ្ធនាការសុខុមាលភាព ជម្រុញការហាត់ប្រាណ និងដំណេកប្រកបដោយសុខភាពសម្រាប់បុគ្គលិកការិយាល័យ',
    excerpt: 'វគ្គណែនាំសាធារណៈនៅទូទាំងរាជធានី នឹងផ្តល់ដំបូន្មានអំពីការគ្រប់គ្រងស្ត្រេស ការហាត់ពត់ប្រាណសម្រាលការហត់នឿយ និងគន្លឹះអាហារូបត្ថម្ភ។',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop',
    category: 'wellness',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '៣ នាទី',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 77,
    title: 'ស្រុកតាមជនបទ ទទួលបានថវិកាឧបត្ថម្ភថ្មីសម្រាប់កសាងលំនៅឋានជូនគ្រូបង្រៀន',
    excerpt: 'កញ្ចប់លើកទឹកចិត្តនេះ ត្រូវបានរចនាឡើងដើម្បីកាត់បន្ថយការផ្លាស់ប្តូរការងារ និងទាក់ទាញគ្រូបង្រៀនដែលមានសមត្ថភាពទៅកាន់តំបន់ដាច់ស្រយាល។',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    category: 'teachers',
    source: 'Fresh News',
    date: 'May 22, 2026',
    readTime: '៤ នាទី',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 63,
    title: 'មជ្ឈមណ្ឌលភាពយន្តជាតិ បើកផ្តល់ប្រាក់ឧបត្ថម្ភសម្រាប់អ្នកដឹកនាំរឿងដំបូង',
    excerpt: 'កម្មវិធីនេះនឹងផ្តល់មូលនិធិដល់ភាពយន្តខ្នាតខ្លី ការបង្ហាញគម្រោងខ្សែកុនឯកសារ និងការបណ្តុះបណ្តាលផលិតកម្មសម្រាប់ក្រុមការងារវ័យក្មេងកម្ពុជា។',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
    category: 'movies',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '៤ នាទី',
    views: '3.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 25,
    title: 'កម្ពុជាធ្វើជាម្ចាស់ផ្ទះរៀបចំពិព័រណ៍កីឡាយានយន្តជាតិលើកដំបូងនៅក្នុងខេត្តកំពត',
    excerpt: 'ការដាក់បង្ហាញរថយន្តប្រណាំង (Rally) ម៉ូតូធំ និងការសម្តែងដ្រីហ្វ (Drift) បានទាក់ទាញអ្នកគាំទ្រក្នុងតំបន់ សម្រាប់ចុងសប្តាហ៍នៃល្បឿនដ៏គួរឱ្យរំភើបនេះ។',
    image: 'https://images.unsplash.com/photo-1518173946687-a4c889ad7f32?w=600&h=400&fit=crop',
    category: 'motorsport',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៣ នាទី',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 34,
    title: 'មជ្ឈមណ្ឌលសន្តិសុខសាយប័រ ព្រមានដល់សហគ្រាសធុនតូចនិងមធ្យម ក្រោយមានរលកនៃការបោកប្រាស់តាមវិក្កយបត្រ',
    excerpt: 'មន្ត្រីជំនាញណែនាំឱ្យមានការផ្ទៀងផ្ទាត់ការទូទាត់ប្រាក់ឱ្យបានម៉ត់ចត់ និងការបណ្តុះបណ្តាលបុគ្គលិក ខណៈដែលការប៉ុនប៉ងបោកប្រាស់មានការកើនឡើងក្នុងវិស័យនាំចេញ និងអចលនទ្រព្យ។',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    category: 'cybersecurity',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '៥ នាទី',
    views: '4.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 90,
    title: 'ម៉ាស៊ីនបូមទឹកដើរដោយថាមពលព្រះអាទិត្យ បង្កើនលទ្ធភាពទទួលបានទឹកសម្រាប់កសិករខ្នាតតូច',
    excerpt: 'កម្មវិធីឧបត្ថម្ភធននេះ ជួយកាត់បន្ថយថ្លៃចំណាយលើប្រេងឥន្ធនៈ និងជួយកសិករក្នុងការស្រោចស្រពដំណាំបានកាន់តែច្បាស់លាស់ពេញមួយរដូវប្រាំង។',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=600&h=400&fit=crop',
    category: 'water',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '៤ នាទី',
    views: '2.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 11,
    title: 'ផ្សារមូលបត្រកម្ពុជាសម្រេចបានកំណើនប្រចាំត្រីមាសខ្ពស់បំផុតជាប្រវត្តិសាស្ត្ររហូតដល់ ១៨%',
    excerpt: 'ទំនុកចិត្តរបស់អ្នកវិនិយោគបានកើនឡើង បន្ទាប់ពីការចុះបញ្ជីថ្មីៗក្នុងវិស័យបច្ចេកវិទ្យាហិរញ្ញវត្ថុ និងថាមពលបៃតង បានជំរុញឱ្យសន្ទស្សន៍កើនឡើងលើសពី ១,២០០ ពិន្ទុ។',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&h=500&fit=crop',
    category: 'markets',
    source: 'Fresh News',
    date: 'May 28, 2026',
    readTime: '៥ នាទី',
    views: '5.1k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 75,
    title: 'មជ្ឈមណ្ឌលនវានុវត្តន៍ក្នុងបរិវេណសាកលវិទ្យាល័យ ជួយនិស្សិតបង្កើតគម្រោងអាជីវកម្មថ្មីៗ',
    excerpt: 'និស្សិតកំពុងកែច្នៃសារណាបញ្ចប់ការសិក្សាឱ្យទៅជាផលិតផលជាក់ស្តែង ក្រោមការណែនាំពីស្ថាបនិកក្រុមហ៊ុនក្នុងស្រុក និងសាស្ត្រាចារ្យ។',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    category: 'higher_ed',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '៤ នាទី',
    views: '3.3k',
    isBreaking: false,
    isFeatured: false,
  },
];

export function useArticleFeed() {
  const articles = ref<Article[]>(ARTICLES)
  const activeFilter = ref<FeedFilter>("latest")

  const breakingArticles = computed(() =>
    articles.value.filter((a) => a.isBreaking)
  )

  const filteredArticles = computed(() => {
    const all = articles.value
    switch (activeFilter.value) {
      case "latest":
        return [...all].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      case "popular":
        return [...all].sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      case "trending":
        return [...all]
          .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
          .slice(0, 6)
      case "breaking":
        return all.filter((a) => a.isBreaking)
      case "editors_pick":
        return all.filter((a) => a.isFeatured)
      default:
        return all
    }
  })

  const featuredArticle = computed(
    () =>
      filteredArticles.value.find((a) => a.isFeatured) ??
      filteredArticles.value[0] ??
      null
  )

  const secondaryArticles = computed(() => {
    const featured = featuredArticle.value
    return filteredArticles.value
      .filter((a) => a.id !== featured?.id)
      .slice(0, 6)
  })

  const trendingArticles = computed(() =>
    [...articles.value]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 5)
  )

  function setFilter(key: FeedFilter) {
    activeFilter.value = key
  }

  return {
    articles,
    activeFilter,
    breakingArticles,
    filteredArticles,
    featuredArticle,
    secondaryArticles,
    trendingArticles,
    setFilter,
  }
}
