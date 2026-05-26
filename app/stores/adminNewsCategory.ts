import { defineStore } from "pinia";
import type { NewsCategory } from "~/types/news";
import type {
  NewsCategoryFilters,
  NewsCategoryPayload,
} from "~/composables/useAdminNewsCategory";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useAdminNewsCategoryStore = defineStore("adminNewsCategory", {
  state: () => ({
    categories: [] as NewsCategory[],
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
    lastFilters: {} as NewsCategoryFilters,
  }),

  getters: {
    hasData: (state) =>
      Array.isArray(state.categories) && state.categories.length > 0,

    activeCategories: (state) =>
      state.categories.filter((item) => item.is_active).length,

    inactiveCategories: (state) =>
      state.categories.filter((item) => !item.is_active).length,
  },

  actions: {
    async fetchCategories(filters: NewsCategoryFilters = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const categoryApi = useAdminNewsCategory();
        const response = await categoryApi.getCategories(filters);

        this.categories = response.data.categories;
        this.pagination = response.data.pagination;

        return response.data;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load categories";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(payload: NewsCategoryPayload) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const categoryApi = useAdminNewsCategory();
        const response = await categoryApi.createCategory(payload);

        await this.invalidateAndRefresh();

        return response.data.category;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to create category";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async updateCategory(id: number | string, payload: Partial<NewsCategoryPayload>) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const categoryApi = useAdminNewsCategory();
        const response = await categoryApi.updateCategory(id, payload);

        await this.invalidateAndRefresh();

        return response.data.category;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to update category";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteCategory(id: number | string) {
      this.deleting = true;
      this.errorMessage = null;

      try {
        const categoryApi = useAdminNewsCategory();
        await categoryApi.deleteCategory(id);

        await this.invalidateAndRefresh();
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to delete category";

        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async invalidateAndRefresh() {
      this.refreshing = true;

      try {
        return await this.fetchCategories(this.lastFilters);
      } finally {
        this.refreshing = false;
      }
    },
  },
});