import { defineStore } from 'pinia'
import type { ArticleDetailData } from '~/types/news'

export const usePublicArticleStore = defineStore('publicArticle', {
  state: () => ({
    articleDetails: {} as Record<string, ArticleDetailData>,
    loading: false,
    refreshing: false,
    errorMessage: null as string | null,
  }),

  actions: {
    async fetchArticle(slug: string, force = false) {
      if (!force && this.articleDetails[slug]) {
        return this.articleDetails[slug]
      }

      this.loading = true
      this.errorMessage = null

      try {
        const publicNewsApi = usePublicNews()
        const response = await publicNewsApi.getArticle(slug)

        this.articleDetails[slug] = response.data

        return response.data
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          'Failed to load article'

        throw error
      } finally {
        this.loading = false
      }
    },

    async refreshArticle(slug: string) {
      this.refreshing = true

      try {
        return await this.fetchArticle(slug, true)
      } finally {
        this.refreshing = false
      }
    },

    clearArticleCache(slug: string) {
      delete this.articleDetails[slug]
    },

    resetState() {
      this.articleDetails = {}
      this.loading = false
      this.refreshing = false
      this.errorMessage = null
    },
  },
})