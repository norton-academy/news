import { ref, computed } from "vue"
import type { Article, FeedFilter } from "~/types/news"

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Cambodia's Economy Shows Strong Recovery with 6% GDP Growth in Q1 2026",
    excerpt:
      "The Ministry of Economy and Finance reports robust performance across tourism, manufacturing, and digital services sectors, with foreign direct investment rising 18% year-on-year.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800&h=500&fit=crop",
    category: "Business",
    source: "Fresh News",
    date: "May 28, 2026",
    readTime: "4 min",
    views: "2.4k",
    isBreaking: false,
    isFeatured: true,
  },
  {
    id: 2,
    title: "New Tech Hub Launch in Phnom Penh Attracts Regional Startups",
    excerpt:
      "The 'Silicon Temple' innovation center aims to foster digital talent and cross-border collaboration across Southeast Asia.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    category: "Technology",
    source: "VOD Khmer",
    date: "May 27, 2026",
    readTime: "3 min",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 3,
    title: "Angkor Wat Conservation Receives $10M Global Heritage Fund",
    excerpt:
      "International partners accelerate preservation efforts ahead of the 2027 UNESCO review cycle.",
    image: "https://images.unsplash.com/photo-1563351660-502e1f5c5d5c?w=600&h=400&fit=crop",
    category: "Politics",
    source: "RFA Khmer",
    date: "May 26, 2026",
    readTime: "5 min",
    views: "3.2k",
    isBreaking: true,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Cambodian Football Team Prepares for AFF Championship Semifinals",
    excerpt:
      "National squad intensifies training under new head coach targeting historic semifinal appearance.",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop",
    category: "Sports",
    source: "Dap News",
    date: "May 25, 2026",
    readTime: "3 min",
    views: "4.1k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Universal Healthcare Expansion Announced for Rural Provinces",
    excerpt:
      "New government initiative to provide coverage to 2 million citizens by end of year.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    category: "Health",
    source: "Fresh News",
    date: "May 24, 2026",
    readTime: "4 min",
    views: "1.5k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 6,
    title: "Khmer Film Wins Best Director at Busan International Film Festival",
    excerpt:
      "'Last Night in Siem Reap' becomes the first Cambodian film to win in the main competition.",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop",
    category: "Entertainment",
    source: "VOD Khmer",
    date: "May 23, 2026",
    readTime: "3 min",
    views: "2.2k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 7,
    title: "Solar Farm Network Across 8 Provinces Achieves Renewable Energy Milestone",
    excerpt:
      "Government partnership with private sector puts Cambodia ahead of its 30% target for 2027.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop",
    category: "Technology",
    source: "Kohsantepheap",
    date: "May 22, 2026",
    readTime: "5 min",
    views: "1.9k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 8,
    title: "EU Trade Deal Gives Cambodian Rice Tariff-Free Access to European Markets",
    excerpt:
      "Fragrant rice and cashew exports expected to grow 40% following the new bilateral agreement.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb221f7a1?w=600&h=400&fit=crop",
    category: "Agriculture",
    source: "RFA Khmer",
    date: "May 21, 2026",
    readTime: "4 min",
    views: "2.7k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 9,
    title: "Digital Literacy Program Reaches 200,000 Students in Remote Schools",
    excerpt:
      "Tablet distribution initiative bridges the urban-rural education divide across 14 provinces.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
    category: "Education",
    source: "Dap News",
    date: "May 20, 2026",
    readTime: "3 min",
    views: "1.8k",
    isBreaking: false,
    isFeatured: false,
  },
  {
    id: 10,
    title: "Cambodia Rice Exporters Target Expanding Gulf Markets",
    excerpt:
      "Premium Cambodian fragrant rice gaining significant share in Saudi Arabia and UAE supermarkets.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop",
    category: "Agriculture",
    source: "Fresh News",
    date: "May 19, 2026",
    readTime: "3 min",
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
