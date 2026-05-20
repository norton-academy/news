import { defineStore } from 'pinia'
import type { PermissionItem, PermissionPagination } from '~/composables/usePermission'

export interface PermissionFilters {
  search?: string
  module?: string
  guard_name?: string
  page?: number
  per_page?: number
}

interface PermissionApiResponse {
  status: string
  message: string
  data: {
    permissions: PermissionItem[]
    pagination: PermissionPagination
    stats: {
      total_permissions: number
      protected_permissions?: number
    }
  }
}

export const usePermissionManagementStore = defineStore('permission-management', {
  state: () => ({
    permissions: [] as PermissionItem[],

    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as PermissionPagination,

    stats: {
      total_permissions: 0,
      protected_permissions: 0,
    },

    loading: false,
    refreshing: false,
    errorMessage: '',

    lastFilters: {
      search: '',
      module: '',
      guard_name: '',
      page: 1,
      per_page: 10,
    } as Required<PermissionFilters>,
  }),

  getters: {
    hasCachedData: (state) => state.permissions.length > 0,
  },

  actions: {
    normalizeFilters(filters: PermissionFilters = {}) {
      return {
        search: filters.search || '',
        module: filters.module || '',
        guard_name: filters.guard_name || '',
        page: filters.page || 1,
        per_page: filters.per_page || 10,
      }
    },

    applyResponse(response: PermissionApiResponse) {
      this.permissions = response.data.permissions || []
      this.pagination = response.data.pagination || this.pagination
      this.stats = response.data.stats || this.stats
    },

    async fetchPermissions(
      filters: PermissionFilters = {},
      options: {
        force?: boolean
        silent?: boolean
      } = {}
    ) {
      const { getPermissions } = usePermission()
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
        await cachedRequest<PermissionApiResponse>({
          module: 'permissions',
          filters: normalizedFilters,
          ttl: 1000 * 60 * 10, // 10 minutes
          force: options.force,
          request: () => getPermissions(normalizedFilters),
          onCached: (response) => {
            this.applyResponse(response)
          },
          onFresh: (response) => {
            this.applyResponse(response)
          },
        })
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message || error.message || 'Failed to load permissions'
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },

    async fetchAllPermissions(options: { force?: boolean; silent?: boolean } = {}) {
      const { getAllPermissions } = usePermission()
      this.loading = true

      try {
        const list = await getAllPermissions()
        this.permissions = list || []
      } catch (error: any) {
        this.errorMessage = error.message || 'Failed to load permissions'
      } finally {
        this.loading = false
      }
    },

    async refreshPermissions() {
      await this.fetchPermissions(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    clearCache() {
      const appCache = useAppCacheStore()
      appCache.forgetByPrefix('permissions:')
    },

    async invalidateAndRefresh() {
      this.clearCache()

      await this.fetchPermissions(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    addPermissionToCache(permission: PermissionItem) {
      this.permissions.unshift(permission)
      this.stats.total_permissions = (this.stats.total_permissions || 0) + 1
      this.pagination.total = (this.pagination.total || 0) + 1
    },

    updatePermissionInCache(permissionId: number | string, updates: Partial<PermissionItem>) {
      const idx = this.permissions.findIndex((p) => p.id === Number(permissionId))
      if (idx === -1) return

      this.permissions[idx] = { ...this.permissions[idx], ...updates }
    },

    removePermissionFromCache(permissionId: number | string) {
      const idx = this.permissions.findIndex((p) => p.id === Number(permissionId))
      if (idx === -1) return

      this.permissions.splice(idx, 1)
      this.stats.total_permissions = Math.max((this.stats.total_permissions || 1) - 1, 0)
      this.pagination.total = Math.max((this.pagination.total || 1) - 1, 0)
    },

    resetState() {
      this.permissions = []
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      }
      this.stats = {
        total_permissions: 0,
        protected_permissions: 0,
      }
      this.loading = false
      this.refreshing = false
      this.errorMessage = ''
      this.lastFilters = {
        search: '',
        module: '',
        guard_name: '',
        page: 1,
        per_page: 10,
      }
    },
  },
})
