import { ref, computed } from 'vue'
import { BookOpen, GraduationCap, Laptop, School, Users, Award } from 'lucide-vue-next'
import type { PoliticsArticle, SubTopic } from '~/types/news'

export const EDUCATION_SUB_TOPICS: SubTopic[] = [
  { key: 'k12', label: 'K-12', labelKm: 'ថ្នាក់មូលដ្ឋាន', icon: School, count: 10 },
  { key: 'higher_ed', label: 'Higher Ed', labelKm: 'ឧត្តមសិក្សា', icon: GraduationCap, count: 8 },
  { key: 'edtech', label: 'EdTech', labelKm: 'បច្ចេកវិទ្យាអប់រំ', icon: Laptop, count: 7 },
  { key: 'scholarships', label: 'Scholarships', labelKm: 'អាហារូបករណ៍', icon: Award, count: 6 },
  { key: 'teachers', label: 'Teachers', labelKm: 'គ្រូបង្រៀន', icon: Users, count: 9 },
  { key: 'policy', label: 'Policy', labelKm: 'គោលនយោបាយ', icon: BookOpen, count: 11 },
]

const ARTICLES: PoliticsArticle[] = [
  {
    id: 71,
    title: 'Digital Literacy Program Reaches 1 Million Students Nationwide',
    titleKm: 'កម្មវិធីអក្ខរកម្មឌីជីថលឈានដល់សិស្ស ១ លាននាក់ទូទាំងប្រទេស',
    excerpt: 'The rollout brings tablets, internet access, and coding lessons to public schools across every province.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&h=500&fit=crop',
    topic: 'edtech',
    source: 'VOD Khmer',
    date: 'May 28, 2026',
    readTime: '5 min',
    views: '5.8k',
    isBreaking: true,
    isFeatured: true,
  },
  {
    id: 72,
    title: 'University Scholarships Expanded for Rural High School Graduates',
    titleKm: 'អាហារូបករណ៍សាកលវិទ្យាល័យពង្រីកសម្រាប់សិស្សជនបទ',
    excerpt: 'New funding aims to support low-income students entering STEM, education, and public administration programs.',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=400&fit=crop',
    topic: 'scholarships',
    source: 'Fresh News',
    date: 'May 27, 2026',
    readTime: '4 min',
    views: '4.2k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 73,
    title: 'Teacher Training Centers Add New Classroom Coaching Curriculum',
    titleKm: 'មជ្ឈមណ្ឌលបណ្តុះបណ្តាលគ្រូបញ្ចូលកម្មវិធីណែនាំថ្នាក់រៀនថ្មី',
    excerpt: 'The revised curriculum focuses on reading fluency, classroom management, and digital lesson design.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    topic: 'teachers',
    source: 'Kohsantepheap',
    date: 'May 26, 2026',
    readTime: '4 min',
    views: '3.5k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 74,
    title: 'Ministry Unveils New Curriculum for Science and Math in Secondary Schools',
    titleKm: 'ក្រសួងបង្ហាញកម្មវិធីសិក្សាថ្មីសម្រាប់វិទ្យាសាស្ត្រ និងគណិតវិទ្យា',
    excerpt: 'The update adds more project-based learning, lab work, and practical exam preparation across grades 7 to 12.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
    topic: 'k12',
    source: 'RFA Khmer',
    date: 'May 25, 2026',
    readTime: '5 min',
    views: '3.9k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 75,
    title: 'Campus Innovation Hubs Help Students Build Startup Projects',
    titleKm: 'មជ្ឈមណ្ឌលនវានុវត្តន៍នៅសាកលវិទ្យាល័យជួយសិស្សបង្កើតគម្រោងស្តាតអាប់',
    excerpt: 'Students are turning capstone work into real products with mentoring from local founders and professors.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    topic: 'higher_ed',
    source: 'Dap News',
    date: 'May 24, 2026',
    readTime: '4 min',
    views: '3.3k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 76,
    title: 'Public Schools Expand Smart Classroom Pilots to 120 Campuses',
    titleKm: 'សាលាសាធារណៈពង្រីកការសាកល្បងថ្នាក់រៀនឆ្លាតវៃទៅ ១២០ សាលា',
    excerpt: 'The pilot includes interactive boards, teacher tablets, and a shared cloud library for learning materials.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
    topic: 'edtech',
    source: 'VOD Khmer',
    date: 'May 23, 2026',
    readTime: '3 min',
    views: '3.1k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 77,
    title: 'Rural Districts Receive New Teacher Housing Grants',
    titleKm: 'តំបន់ជនបទទទួលជំនួយផ្ទះសម្រាប់គ្រូបង្រៀនថ្មី',
    excerpt: 'The incentive package is designed to reduce turnover and attract qualified teachers to underserved areas.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
    topic: 'teachers',
    source: 'Fresh News',
    date: 'May 22, 2026',
    readTime: '4 min',
    views: '2.8k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 78,
    title: 'University Research Labs Partner With Industry on AI and Data Science',
    titleKm: 'មន្ទីរពិសោធន៍ស្រាវជ្រាវសាកលវិទ្យាល័យភ្ជាប់ជាមួយឧស្សាហកម្មលើ AI និងទិន្នន័យ',
    excerpt: 'The partnership will support student internships, joint research, and shared access to modern computing tools.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop',
    topic: 'higher_ed',
    source: 'Kohsantepheap',
    date: 'May 21, 2026',
    readTime: '4 min',
    views: '2.6k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 79,
    title: 'National Exam Prep App Gains Traction With High School Seniors',
    titleKm: 'កម្មវិធីត្រៀមប្រឡងជាតិទទួលការគាំទ្រពីសិស្សថ្នាក់ចុងក្រោយ',
    excerpt: 'The app offers video lessons, quizzes, and progress tracking for math, Khmer, and science subjects.',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=400&fit=crop',
    topic: 'edtech',
    source: 'RFA Khmer',
    date: 'May 20, 2026',
    readTime: '3 min',
    views: '2.4k',
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 80,
    title: 'Ministry Reviews New Policy for School Meals and Nutrition Standards',
    titleKm: 'ក្រសួងពិនិត្យគោលនយោបាយថ្មីសម្រាប់អាហារសាលា និងស្តង់ដារអាហារូបត្ថម្ភ',
    excerpt: 'The draft policy aims to improve student attendance, focus, and health outcomes in primary schools.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop',
    topic: 'policy',
    source: 'Dap News',
    date: 'May 19, 2026',
    readTime: '4 min',
    views: '2.2k',
    isBreaking: false,
    isFeatured: false,
  },
]

export function useEducationFeed() {
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
    return EDUCATION_SUB_TOPICS.find((topic) => topic.key === key)?.icon ?? BookOpen
  }

  function topicLabel(key: string) {
    return EDUCATION_SUB_TOPICS.find((topic) => topic.key === key)?.label ?? 'Education'
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
