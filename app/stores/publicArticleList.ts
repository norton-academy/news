import { defineStore } from "pinia";
import type { Article } from "~/types/news";
import type { ArticleListParams } from "~/composables/usePublicNews";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const usePublicArticleListStore = defineStore("publicArticleList", {
  state: () => ({
    articles: [] as Article[],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 12,
      total: 0,
    } as Pagination,
    loading: false,
    refreshing: false,
    errorMessage: null as string | null,
    lastFilters: {} as ArticleListParams,
  }),

  actions: {
    async fetchArticles(filters: ArticleListParams = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const publicNewsApi = usePublicNews();
        const response = await publicNewsApi.getArticles(filters);

        this.articles = response.data.articles;
        this.pagination = response.data.pagination;

        return response.data;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load articles";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async refreshArticles() {
      this.refreshing = true;

      try {
        return await this.fetchArticles(this.lastFilters);
      } finally {
        this.refreshing = false;
      }
    },

    resetState() {
      this.articles = [];
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 12,
        total: 0,
      };
      this.loading = false;
      this.refreshing = false;
      this.errorMessage = null;
      this.lastFilters = {};
    },
  },
});