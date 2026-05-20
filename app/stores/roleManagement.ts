import { defineStore } from 'pinia'
import type { RoleItem, RolePagination } from '~/composables/useRole'

export interface RoleFilters {
  search?: string
  guard_name?: string
  page?: number
  per_page?: number
}

interface RoleApiResponse {
  status: string
  message: string
  data: {
    roles: RoleItem[]
    pagination: RolePagination
    stats: {
      total_roles: number
    }
  }
}

export const useRoleManagementStore = defineStore('role-management', {
  state: () => ({
    roles: [] as RoleItem[],

    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as RolePagination,

    stats: {
      total_roles: 0,
    },

    loading: false,
    refreshing: false,
    errorMessage: '',

    lastFilters: {
      search: '',
      guard_name: '',
      page: 1,
      per_page: 10,
    } as Required<RoleFilters>,
  }),

  getters: {
    hasCachedData: (state) => state.roles.length > 0,
  },

  actions: {
    normalizeFilters(filters: RoleFilters = {}) {
      return {
        search: filters.search || '',
        guard_name: filters.guard_name || '',
        page: filters.page || 1,
        per_page: filters.per_page || 10,
      }
    },

    applyResponse(response: RoleApiResponse) {
      this.roles = response.data.roles || []
      this.pagination = response.data.pagination || this.pagination
      this.stats = response.data.stats || this.stats
    },

    async fetchRoles(
      filters: RoleFilters = {},
      options: {
        force?: boolean
        silent?: boolean
      } = {}
    ) {
      const { getRoles } = useRole()
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
        await cachedRequest<RoleApiResponse>({
          module: 'roles',
          filters: normalizedFilters,
          ttl: 1000 * 60 * 10, // 10 minutes
          force: options.force,
          request: () => getRoles(normalizedFilters),
          onCached: (response) => {
            this.applyResponse(response)
          },
          onFresh: (response) => {
            this.applyResponse(response)
          },
        })
      } catch (error: any) {
        this.errorMessage =
          error.response?.data?.message || error.message || 'Failed to load roles'
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },

    async refreshRoles() {
      await this.fetchRoles(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    clearCache() {
      const appCache = useAppCacheStore()
      appCache.forgetByPrefix('roles:')
    },

    async invalidateAndRefresh() {
      this.clearCache()

      await this.fetchRoles(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    updateRolePermissionsInCache(roleId: number | string, permissions: string[]) {
      const idx = this.roles.findIndex((r) => r.id === Number(roleId))
      if (idx === -1) return

      // update permissions_count
      this.roles[idx].permissions_count = permissions.length

      // set permissions array if available on RoleItem
      try {
        // @ts-ignore - extend role object with permissions array
        this.roles[idx].permissions = permissions.map((name) => ({ name }))
      } catch (e) {
        // ignore
      }
    },
    addRoleToCache(role: RoleItem) {
      // insert at start
      this.roles.unshift(role)
      this.stats.total_roles = (this.stats.total_roles || 0) + 1
      this.pagination.total = (this.pagination.total || 0) + 1
    },

    updateRoleInCache(roleId: number | string, updates: Partial<RoleItem>) {
      const idx = this.roles.findIndex((r) => r.id === Number(roleId))
      if (idx === -1) return

      this.roles[idx] = { ...this.roles[idx], ...updates }
    },

    removeRoleFromCache(roleId: number | string) {
      const idx = this.roles.findIndex((r) => r.id === Number(roleId))
      if (idx === -1) return

      this.roles.splice(idx, 1)
      this.stats.total_roles = Math.max((this.stats.total_roles || 1) - 1, 0)
      this.pagination.total = Math.max((this.pagination.total || 1) - 1, 0)
    },

    resetState() {
      this.roles = []
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      }
      this.stats = {
        total_roles: 0,
      }
      this.loading = false
      this.refreshing = false
      this.errorMessage = ''
      this.lastFilters = {
        search: '',
        guard_name: '',
        page: 1,
        per_page: 10,
      }
    },
  },
})
