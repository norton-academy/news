import { defineStore } from 'pinia'
import type { UserItem, UserPagination, UserStats } from '~/composables/useUser'

export interface UserFilters {
  search?: string
  status?: string
  page?: number
  per_page?: number
}

interface UserApiResponse {
  success: boolean
  message: string
  data: {
    users: UserItem[]
    pagination: UserPagination
    stats: UserStats
  }
}

export const useUserManagementStore = defineStore('user-management', {
  state: () => ({
    users: [] as UserItem[],

    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    } as UserPagination,

    stats: {
      total_users: 0,
      active_users: 0,
      pending_users: 0,
      inactive_users: 0,
      verified_users: 0,
      unverified_users: 0,
    } as UserStats,

    loading: false,
    refreshing: false,
    errorMessage: '',

    lastFilters: {
      search: '',
      status: '',
      page: 1,
      per_page: 10,
    } as Required<UserFilters>,
  }),

  getters: {
    hasCachedData: (state) => state.users.length > 0,
  },

  actions: {
    normalizeFilters(filters: UserFilters = {}) {
      return {
        search: filters.search || '',
        status: filters.status || '',
        page: filters.page || 1,
        per_page: filters.per_page || 10,
      }
    },

    applyResponse(response: UserApiResponse) {
      this.users = response.data.users || []
      this.pagination = response.data.pagination || this.pagination
      this.stats = response.data.stats || this.stats
    },

    async fetchUsers(
      filters: UserFilters = {},
      options: {
        force?: boolean
        silent?: boolean
      } = {}
    ) {
      const { getUsers } = useUser()
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
        await cachedRequest<UserApiResponse>({
          module: 'users',
          filters: normalizedFilters,
          ttl: 1000 * 60 * 5, // 5 minutes
          force: options.force,
          request: () => getUsers(normalizedFilters),
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
          'Failed to load users'
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },

    async refreshUsers() {
      await this.fetchUsers(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    clearCache() {
      const appCache = useAppCacheStore()
      appCache.forgetByPrefix('users:')
    },

    async invalidateAndRefresh() {
      this.clearCache()

      await this.fetchUsers(this.lastFilters, {
        force: true,
        silent: true,
      })
    },

    addUserToCache(user: UserItem) {
      this.users.unshift(user)
      this.stats.total_users = (this.stats.total_users || 0) + 1
      this.pagination.total = (this.pagination.total || 0) + 1
    },

    updateUserInCache(userId: number | string, updates: Partial<UserItem>) {
      const idx = this.users.findIndex((u) => u.id === Number(userId))
      if (idx === -1) return

      this.users[idx] = { ...this.users[idx], ...updates }
    },

    removeUserFromCache(userId: number | string) {
      const idx = this.users.findIndex((u) => u.id === Number(userId))
      if (idx === -1) return

      this.users.splice(idx, 1)
      this.stats.total_users = Math.max((this.stats.total_users || 1) - 1, 0)
      this.pagination.total = Math.max((this.pagination.total || 1) - 1, 0)
    },

    resetState() {
      this.users = []
      this.pagination = {
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      }
      this.stats = {
        total_users: 0,
        active_users: 0,
        pending_users: 0,
        inactive_users: 0,
        verified_users: 0,
        unverified_users: 0,
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
