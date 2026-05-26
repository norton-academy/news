import { defineStore } from "pinia";
import type { Province } from "~/types/news";
import type {
  ProvinceFilters,
  ProvincePayload,
} from "~/composables/useAdminProvince";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useAdminProvinceStore = defineStore("adminProvince", {
  state: () => ({
    provinces: [] as Province[],
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
    lastFilters: {} as ProvinceFilters,
  }),

  getters: {
    hasData: (state) =>
      Array.isArray(state.provinces) && state.provinces.length > 0,

    activeProvinces: (state) =>
      state.provinces.filter((item) => item.is_active).length,

    inactiveProvinces: (state) =>
      state.provinces.filter((item) => !item.is_active).length,
  },

  actions: {
    async fetchProvinces(filters: ProvinceFilters = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const provinceApi = useAdminProvince();
        const response = await provinceApi.getProvinces(filters);

        this.provinces = response.data.provinces;
        this.pagination = response.data.pagination;

        return response.data;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load provinces";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createProvince(payload: ProvincePayload) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const provinceApi = useAdminProvince();
        const response = await provinceApi.createProvince(payload);

        await this.invalidateAndRefresh();

        return response.data.province;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to create province";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async updateProvince(id: number | string, payload: Partial<ProvincePayload>) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const provinceApi = useAdminProvince();
        const response = await provinceApi.updateProvince(id, payload);

        await this.invalidateAndRefresh();

        return response.data.province;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to update province";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteProvince(id: number | string) {
      this.deleting = true;
      this.errorMessage = null;

      try {
        const provinceApi = useAdminProvince();
        await provinceApi.deleteProvince(id);

        await this.invalidateAndRefresh();
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to delete province";

        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async invalidateAndRefresh() {
      this.refreshing = true;

      try {
        return await this.fetchProvinces(this.lastFilters);
      } finally {
        this.refreshing = false;
      }
    },
  },
});