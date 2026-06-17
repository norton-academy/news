import { ref, computed } from "vue"
import type { Article, FeedFilter } from "~/types/news"

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "សេដ្ឋកិច្ចរបស់ប្រទេសកម្ពុជាបង្ហាញពីការងើបឡើងវិញយ៉ាងខ្លាំងក្លា ជាមួយកំណើន GDP ៦% ក្នុងត្រីមាសទី១ ឆ្នាំ២០២៦",
    excerpt:
      "ក្រសួងសេដ្ឋកិច្ច និងហិរញ្ញវត្ថុ បានរាយការណ៍ពីដំណើរការដ៏រឹងមាំនៅក្នុងវិស័យទេសចរណ៍ ផលិតកម្ម និងសេវាកម្មឌីជីថល ដោយការវិនិយោគផ្ទាល់ពីបរទេសបានកើនឡើង ១៨% ធៀបនឹងឆ្នាំមុន។",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=500&fit=crop",
    category: "អាជីវកម្ម",
    source: "Fresh News",
    date: "២៨ ឧសភា ២០២៦",
    readTime: "៤ នាទី",
    views: "2.4k",
    isBreaking: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: "ការបើកសម្ពោធមជ្ឈមណ្ឌលបច្ចេកវិទ្យាថ្មី (Tech Hub) នៅភ្នំពេញ ទាក់ទាញក្រុមហ៊ុនអាជីវកម្មថ្មីៗ (Startups) ក្នុងតំបន់",
    excerpt:
      "មជ្ឈមណ្ឌលនវានុវត្តន៍ 'Silicon Temple' មានគោលបំណងបណ្តុះបណ្តាល استعدادឌីជីថល និងជំរុញកិច្ចសហប្រតិបត្តិការឆ្លងដែននៅទូទាំងតំបន់អាស៊ីអាគ្នេយ៍។",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    category: "បច្ចេកវិទ្យា",
    source: "VOD Khmer",
    date: "២៧ ឧសភា ២០២៦",
    readTime: "៣ នាទី",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: "ការអភិរក្សប្រាសាទអង្គរវត្ត ទទួលបានថវិកាចំនួន ១០លានដុល្លារ ពីមូលនិធិបេតិកភណ្ឌពិភពលោក",
    excerpt:
      "ដៃគូអន្តរជាតិបានពន្លឿនកិច្ចខិតខំប្រឹងប្រែងអភិរក្ស មុនពេលវដ្តនៃការត្រួតពិនិត្យរបស់អង្គការ UNESCO ឆ្នាំ២០២៧ ឈានចូលមកដល់។",
    image: "https://images.unsplash.com/photo-1563351660-502e1f5c5d5c?w=600&h=400&fit=crop",
    category: "នយោបាយ",
    source: "RFA Khmer",
    date: "២៦ ឧសភា ២០២៦",
    readTime: "៥ នាទី",
    views: "3.2k",
    isBreaking: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "ក្រុមបាល់ទាត់ជម្រើសជាតិកម្ពុជា ត្រៀមខ្លួនសម្រាប់ការប្រកួតវគ្គពាក់កណ្តាលផ្តាច់ព្រ័ត្រពានរង្វាន់ AFF Championship",
    excerpt:
      "ក្រុមជម្រើសជាតិបានបង្កើនការហ្វឹកហាត់យ៉ាងខ្លាំងក្លា ក្រោមការដឹកនាំរបស់គ្រូបង្វឹកថ្មី ក្នុងគោលដៅឈានទៅវគ្គពាក់កណ្តាលផ្តាច់ព្រ័ត្រជាប្រវត្តិសាស្ត្រ។",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop",
    category: "កីឡា",
    source: "Dap News",
    date: "២៥ ឧសភា ២០២៦",
    readTime: "៣ នាទី",
    views: "4.1k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: "ការប្រកាសពង្រីកការថែទាំសុខភាពជាសកល ទៅកាន់បណ្តាខេត្តដាច់ស្រយាល",
    excerpt:
      "គំនិតផ្តួចផ្តើមថ្មីរបស់រាជរដ្ឋាភិបាល នឹងផ្តល់ការគ្របដណ្តប់លើសេវាសុខភាពដល់ប្រជាពលរដ្ឋចំនួន ២លាននាក់ នៅត្រឹមដាច់ឆ្នាំនេះ។",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    category: "សុខាភិបាល",
    source: "Fresh News",
    date: "២៤ ឧសភា ២០២៦",
    readTime: "៤ នាទី",
    views: "1.5k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: "ខ្សែភាពយន្តខ្មែរ ឈ្នះពានរង្វាន់អ្នកដឹកនាំរឿងល្អបំផុត (Best Director) នៅមហោស្រពភាពយន្តអន្តរជាតិប៊ូសាន",
    excerpt:
      "រឿង 'រាត្រីចុងក្រោយនៅសៀមរាប' បានក្លាយជាភាពយន្តកម្ពុជាដំបូងគេបង្អស់ ដែលបានឈ្នះពានរង្វាន់នៅក្នុងការប្រកួតប្រជែងធំផ្លូវការ។",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
    category: "កម្សាន្ត",
    source: "VOD Khmer",
    date: "២៣ ឧសភា ២០២៦",
    readTime: "៣ នាទី",
    views: "2.2k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: "បណ្តាញស្ថានីយថាមពលដើរដោយពន្លឺព្រះអាទិត្យនៅទូទាំង ៨ខេត្ត សម្រេចបានសមិទ្ធផលថ្មីនៃថាមពលកកើតឡើងវិញ",
    excerpt:
      "ភាពជាដៃគូរវាងរដ្ឋាភិបាល និងវិស័យឯកជន បានធ្វើឱ្យប្រទេសកម្ពុជាដើរលឿនជាងគោលដៅ ៣០% ដែលបានកំណត់សម្រាប់ឆ្នាំ២០២៧។",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    category: "បច្ចេកវិទ្យា",
    source: "កោះសន្តិភាព",
    date: "២២ ឧសភា ២០២៦",
    readTime: "៥ នាទី",
    views: "1.9k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: "កិច្ចព្រមព្រៀងពាណិជ្ជកម្មជាមួយ EU ផ្តល់សិទ្ធិឱ្យអង្ករកម្ពុជានាំចូលទីផ្សារអឺរ៉ុបដោយមិនជាប់ពន្ធគយ",
    excerpt:
      "ការនាំចេញអង្ករក្រអូប និងគ្រាប់ស្វាយចន្ទី ត្រូវបានរំពឹងថានឹងកើនឡើង ៤០% បន្ទាប់ពីមានកិច្ចព្រមព្រៀងទ្វេភាគីថ្មីនេះ។",
    image: "https://images.unsplash.com/photo-1574943320219-553eb221f7a1?w=600&h=400&fit=crop",
    category: "កសិកម្ម",
    source: "RFA Khmer",
    date: "២១ ឧសភា ២០២៦",
    readTime: "៤ នាទី",
    views: "2.7k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "កម្មវិធីចំណេះដឹងផ្នែកឌីជីថល ឈានទៅដល់សិស្សានុសិស្សចំនួន ២០០,០០០នាក់ នៅតាមសាលារៀនដាច់ស្រយាល",
    excerpt:
      "គំនិតផ្តួចផ្តើមចែករំលែកកុំព្យូទ័រថេប្លេត (Tablet) បានជួយកាត់បន្ថយគម្លាតអប់រំរវាងទីក្រុង និងជនបទ នៅទូទាំង ១៤ខេត្ត។",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    category: "ការអប់រំ",
    source: "Dap News",
    date: "២០ ឧសភា ២០២៦",
    readTime: "៣ នាទី",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "អ្នកនាំចេញអង្ករកម្ពុជា បង្កើនគោលដៅពង្រីកទីផ្សារទៅកាន់តំបន់ឈូងសមុទ្រ (Gulf Markets)",
    excerpt:
      "អង្ករក្រអូបប្រណិតរបស់កម្ពុជា កំពុងទទួលបានចំណែកទីផ្សារយ៉ាងខ្លាំងក្លានៅក្នុងផ្សារទំនើបនានាក្នុងប្រទេសអារ៉ាប៊ីសាអូឌីត និងអារ៉ាប់រួម (UAE)។",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    category: "កសិកម្ម",
    source: "Fresh News",
    date: "១៩ ឧសភា ២០២៦",
    readTime: "៣ នាទី",
    views: "1.2k",
    isBreaking: false,
    isFeatured: false,
  },
]

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
