import { defineStore } from 'pinia'
import type { PublicHomeData } from '~/types/news'

export const usePublicHomeStore = defineStore('publicHome', {
  state: () => ({
    data: null as PublicHomeData | null,
    loading: false,
    refreshing: false,
    errorMessage: null as string | null,
    lastFetchedAt: null as number | null,
  }),

  getters: {
    categories: (state) => state.data?.categories ?? [],
    provinces: (state) => state.data?.provinces ?? [],
    breakingNews: (state) => state.data?.breaking_news ?? [],
    featuredArticles: (state) => state.data?.featured_articles ?? [],
    latestArticles: (state) => state.data?.latest_articles ?? [],
    popularArticles: (state) => state.data?.popular_articles ?? [],
    trendingTopics: (state) => state.data?.trending_topics ?? [],
    advertisements: (state) => state.data?.advertisements ?? [],
    weather: (state) => state.data?.weather ?? null,
    exchangeRate: (state) => state.data?.exchange_rate ?? null,
    sources: (state) => state.data?.sources ?? [],
  },

  actions: {
    async fetchHome(force = false) {
      const now = Date.now()
      const cacheDuration = 1000 * 60 * 3

      if (!force && this.data && this.lastFetchedAt && now - this.lastFetchedAt < cacheDuration) {
        return this.data
      }

      this.loading = true
      this.errorMessage = null

      try {
        const publicNewsApi = usePublicNews()
        const response = await publicNewsApi.getHome()

        this.data = response.data
        this.lastFetchedAt = Date.now()

        return this.data
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          'Failed to load homepage data'

        throw error
      } finally {
        this.loading = false
      }
    },

    async refreshHome() {
      this.refreshing = true

      try {
        return await this.fetchHome(true)
      } finally {
        this.refreshing = false
      }
    },

    clearCache() {
      this.data = null
      this.lastFetchedAt = null
    },

    resetState() {
      this.data = null
      this.loading = false
      this.refreshing = false
      this.errorMessage = null
      this.lastFetchedAt = null
    },
  },
})