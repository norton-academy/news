export type FeedFilter =
  | "latest"
  | "popular"
  | "trending"
  | "breaking"
  | "editors_pick"

export interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  source: string
  date: string
  readTime: string
  views: string
  isBreaking: boolean
  isFeatured: boolean
}

export interface FilterTab {
  key: FeedFilter
  label: string
  icon: unknown
  description: string
}

export interface PoliticsArticle {
  id: number
  title: string
  excerpt: string
  image: string
  topic: string
  source: string
  date: string
  readTime: string
  views: string
  isBreaking: boolean
  isFeatured: boolean
}

export interface SubTopic {
  key: string
  label: string
  icon: unknown
  count: number
}
