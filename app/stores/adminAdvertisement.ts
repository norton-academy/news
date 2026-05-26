import { defineStore } from "pinia";
import type { Advertisement } from "~/types/news";
import type {
  AdvertisementFilters,
  AdvertisementPayload,
} from "~/composables/useAdminAdvertisement";

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useAdminAdvertisementStore = defineStore("adminAdvertisement", {
  state: () => ({
    advertisements: [] as Advertisement[],
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
    lastFilters: {} as AdvertisementFilters,
  }),

  getters: {
    hasData: (state) =>
      Array.isArray(state.advertisements) && state.advertisements.length > 0,

    activeAdvertisements: (state) =>
      state.advertisements.filter((item) => item.is_active).length,

    inactiveAdvertisements: (state) =>
      state.advertisements.filter((item) => !item.is_active).length,
  },

  actions: {
    async fetchAdvertisements(filters: AdvertisementFilters = {}) {
      this.loading = true;
      this.errorMessage = null;
      this.lastFilters = filters;

      try {
        const advertisementApi = useAdminAdvertisement();
        const response = await advertisementApi.getAdvertisements(filters);

        this.advertisements = response.data.advertisements;
        this.pagination = response.data.pagination;

        return response.data;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to load advertisements";

        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createAdvertisement(payload: AdvertisementPayload) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const advertisementApi = useAdminAdvertisement();
        const response = await advertisementApi.createAdvertisement(payload);

        await this.invalidateAndRefresh();

        return response.data.advertisement;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to create advertisement";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async updateAdvertisement(
      id: number | string,
      payload: Partial<AdvertisementPayload>
    ) {
      this.saving = true;
      this.errorMessage = null;

      try {
        const advertisementApi = useAdminAdvertisement();
        const response = await advertisementApi.updateAdvertisement(id, payload);

        await this.invalidateAndRefresh();

        return response.data.advertisement;
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to update advertisement";

        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteAdvertisement(id: number | string) {
      this.deleting = true;
      this.errorMessage = null;

      try {
        const advertisementApi = useAdminAdvertisement();
        await advertisementApi.deleteAdvertisement(id);

        await this.invalidateAndRefresh();
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.data?.message ||
          error.message ||
          "Failed to delete advertisement";

        throw error;
      } finally {
        this.deleting = false;
      }
    },

    async invalidateAndRefresh() {
      this.refreshing = true;

      try {
        return await this.fetchAdvertisements(this.lastFilters);
      } finally {
        this.refreshing = false;
      }
    },
  },
});