import { defineStore } from "pinia";
import type { Article } from "~/types/news";
import type { AdminArticleFilters, ArticlePayload } from "~/composables/useAdminArticle";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useAdminArticleStore = defineStore("adminArticle", {
  state: () => ({
    articles: [] as Article[],
    selectedArticle: null as Article | null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as Pagination,
    loading: false,
    saving: false,
    deleting: false,
    errorMessage: null as string | null,
    lastFilters: {} as AdminArticleFilters,
  }),

  actions: {
    async fetchArticles(filters: AdminArticleFilters = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const articleApi = useAdminArticle();
        const response = await articleApi.getArticles(filters);

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

    async fetchArticle(id: number | string) {
      this.loading = true;
      this.errorMessage = null;

      try {
        const articleApi = useAdminArticle();
        const response = await articleApi.getArticle(id);

        this.selectedArticle = response.data.article;

        return response.data.article;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load article";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createArticle(payload: ArticlePayload) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const articleApi = useAdminArticle();
        const response = await articleApi.createArticle(payload);

        await this.fetchArticles(this.lastFilters);

        return response.data.article;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to create article";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async updateArticle(id: number | string, payload: Partial<ArticlePayload>) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const articleApi = useAdminArticle();
        const response = await articleApi.updateArticle(id, payload);

        await this.fetchArticles(this.lastFilters);

        return response.data.article;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to update article";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteArticle(id: number | string) {
      this.deleting = true;
      this.errorMessage = null;

      try {
        const articleApi = useAdminArticle();
        await articleApi.deleteArticle(id);

        await this.fetchArticles(this.lastFilters);
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to delete article";

        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async publishArticle(id: number | string) {
      const articleApi = useAdminArticle();
      await articleApi.publishArticle(id);
      await this.fetchArticles(this.lastFilters);
    },

    async unpublishArticle(id: number | string) {
      const articleApi = useAdminArticle();
      await articleApi.unpublishArticle(id);
      await this.fetchArticles(this.lastFilters);
    },

    async toggleFeatured(id: number | string) {
      const articleApi = useAdminArticle();
      await articleApi.toggleFeatured(id);
      await this.fetchArticles(this.lastFilters);
    },

    async toggleBreaking(id: number | string) {
      const articleApi = useAdminArticle();
      await articleApi.toggleBreaking(id);
      await this.fetchArticles(this.lastFilters);
    },

    resetState() {
      this.articles = [];
      this.selectedArticle = null;
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      };
      this.loading = false;
      this.saving = false;
      this.deleting = false;
      this.errorMessage = null;
      this.lastFilters = {};
    },
  },
});