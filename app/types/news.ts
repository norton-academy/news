export interface NewsSource {
  id: number
  name: string
  slug: string
  logo: string | null
  website_url: string | null
  rss_url: string | null
  is_active: boolean
}

export interface NewsCategory {
  id: number
  name_km: string
  name_en: string | null
  slug: string
  icon: string | null
  sort_order: number
  is_active: boolean
}

export interface Province {
  id: number
  name_km: string
  name_en: string
  slug: string
  is_active: boolean
}

export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  ai_summary: string[]
  hero_image: string | null
  photo_credit: string | null
  original_url: string | null
  views_count: number
  bookmarks_count: number
  is_featured: boolean
  is_breaking: boolean
  is_published: boolean
  published_at: string | null
  published_date: string | null
  published_time: string | null
  source: NewsSource | null
  category: NewsCategory | null
  province: Province | null
}

export interface Advertisement {
  id: number
  title: string
  placement: string
  image: string | null
  link_url: string | null
  is_active: boolean
}

export interface PublicHomeData {
  categories: NewsCategory[]
  provinces: Province[]
  breaking_news: Article[]
  featured_articles: Article[]
  latest_articles: Article[]
  popular_articles: Article[]
  trending_topics: NewsCategory[]
  advertisements: Advertisement[]
  weather: {
    city: string
    temperature: string
    condition: string
  }
  exchange_rate: {
    usd_khr: string
    label: string
  }
}

export interface ArticleDetailData {
  article: Article
  related_articles: Article[]
  more_from_source: Article[]
  popular_articles: Article[]
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}