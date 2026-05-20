import { defineStore } from 'pinia'
import type {
  ProductItem,
  ProductPagination,
  ProductStats,
} from '~/composables/useProduct'

export interface ProductFilters {
  search?: string
  status?: string
  page?: number
  per_page?: number
}

interface ProductApiResponse {
  success: boolean
  message: string
  data: {
    products: ProductItem[]
    pagination: ProductPagination
    stats: ProductStats
  }
}

export const useProductManagementStore = defineStore('product-management', {
  state: () => ({
    products: [] as ProductItem[],

    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as ProductPagination,

    stats: {
      total_products: 0,
      active_products: 0,
      inactive_products: 0,
      draft_products: 0,
      low_stock_products: 0,
    } as ProductStats,

    loading: false,
    refreshing: false,
    errorMessage: '',

    lastFilters: {
      search: '',
      status: '',
      page: 1,
      per_page: 10,
    } as Required<ProductFilters>,
  }),

  getters: {
    hasCachedData: (state) => state.products.length > 0,
  },

  actions: {
    normalizeFilters(filters: ProductFilters = {}) {
      return {
        search: filters.search || '',
        status: filters.status || '',
        page: filters.page || 1,
        per_page: filters.per_page || 10,
      }
    },

    applyResponse(response: ProductApiResponse) {
      this.products = response.data.products || []
      this.pagination = response.data.pagination || this.pagination
      this.stats = response.data.stats || this.stats
    },

    async fetchProducts(
      filters: ProductFilters = {},
      options: {
        force?: boolean
        silent?: boolean
      } = {}
    ) {
      const { getProducts } = useProduct()
      const { cachedRequest } = useCachedRequest()

      const normalizedFilters = this.normalizeFilters(filters)

      this.lastFilters = normalizedFilters
      this.errorMessage = ''

      if (this.hasCachedData || options.silent) {
        this.refreshing = true
      } else {
        this.loading = true
      }

      try {
        await cachedRequest<ProductApiResponse>({
          module: 'products',
          filters: normalizedFilters,
          ttl: 1000 * 60 * 5,
          force: options.force,
          request: () => getProducts(normalizedFilters),
          onCached: (response) => {
            this.applyResponse(response)
          },
          onFresh: (response) => {
            this.applyResponse(response)
          },
        })
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Failed to load products'
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },

    async refreshProducts() {
      await this.fetchProducts(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    clearCache() {
      const appCache = useAppCacheStore()
      appCache.forgetByPrefix('products:')
    },

    async invalidateAndRefresh() {
      this.clearCache()

      await this.fetchProducts(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    addProductToCache(product: ProductItem) {
      this.products.unshift(product)
      this.stats.total_products = (this.stats.total_products || 0) + 1
      this.pagination.total = (this.pagination.total || 0) + 1
    },

    updateProductInCache(productId: number | string, updates: Partial<ProductItem>) {
      const idx = this.products.findIndex((p) => p.id === Number(productId))
      if (idx === -1) return

      this.products[idx] = { ...this.products[idx], ...updates }
    },

    removeProductFromCache(productId: number | string) {
      const idx = this.products.findIndex((p) => p.id === Number(productId))
      if (idx === -1) return

      this.products.splice(idx, 1)
      this.stats.total_products = Math.max((this.stats.total_products || 1) - 1, 0)
      this.pagination.total = Math.max((this.pagination.total || 1) - 1, 0)
    },

    resetState() {
      this.products = []
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      }
      this.stats = {
        total_products: 0,
        active_products: 0,
        inactive_products: 0,
        draft_products: 0,
        low_stock_products: 0,
      }
      this.loading = false
      this.refreshing = false
      this.errorMessage = ''
      this.lastFilters = {
        search: '',
        status: '',
        page: 1,
        per_page: 10,
      }
    },
  },
})