import { defineStore } from "pinia";
import type { NewsSource } from "~/types/news";
import type {
  NewsSourceFilters,
  NewsSourcePayload,
} from "~/composables/useAdminNewsSource";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useAdminNewsSourceStore = defineStore("adminNewsSource", {
  state: () => ({
    sources: [] as NewsSource[],
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as Pagination,
    loading: false,
    refreshing: false,
    saving: false,
    deleting: false,
    errorMessage: null as string | null,
    lastFilters: {} as NewsSourceFilters,
  }),

  getters: {
    hasData: (state) =>
      Array.isArray(state.sources) && state.sources.length > 0,

    activeSources: (state) =>
      state.sources.filter((item) => item.is_active).length,

    inactiveSources: (state) =>
      state.sources.filter((item) => !item.is_active).length,
  },

  actions: {
    async fetchSources(filters: NewsSourceFilters = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const sourceApi = useAdminNewsSource();
        const response = await sourceApi.getSources(filters);

        this.sources = response.data.sources;
        this.pagination = response.data.pagination;

        return response.data;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load sources";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createSource(payload: NewsSourcePayload) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const sourceApi = useAdminNewsSource();
        const response = await sourceApi.createSource(payload);

        await this.invalidateAndRefresh();

        return response.data.source;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to create source";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async updateSource(id: number | string, payload: Partial<NewsSourcePayload>) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const sourceApi = useAdminNewsSource();
        const response = await sourceApi.updateSource(id, payload);

        await this.invalidateAndRefresh();

        return response.data.source;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to update source";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteSource(id: number | string) {
      this.deleting = true;
      this.errorMessage = null;

      try {
        const sourceApi = useAdminNewsSource();
        await sourceApi.deleteSource(id);

        await this.invalidateAndRefresh();
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to delete source";

        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async invalidateAndRefresh() {
      this.refreshing = true;

      try {
        return await this.fetchSources(this.lastFilters);
      } finally {
        this.refreshing = false;
      }
    },
  },
});