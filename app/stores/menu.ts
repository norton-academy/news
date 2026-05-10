import { defineStore } from 'pinia'
import type { MenuItem } from '~/composables/useMenu'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menus: [] as MenuItem[],
    loading: false,
    initialized: false,
  }),

  actions: {
    async fetchMenus() {
      if (this.loading) return

      this.loading = true

      try {
        const { getMyMenus } = useMenu()
        const response = await getMyMenus()

        this.menus = response.data.menus
        this.initialized = true
      } finally {
        this.loading = false
      }
    },

    clearMenus() {
      this.menus = []
      this.initialized = false
    },
  },
})