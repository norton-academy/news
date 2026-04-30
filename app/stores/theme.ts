import { defineStore } from 'pinia'

export type ThemeMode = 'light' | 'dark' | 'system'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    mode: 'system' as ThemeMode,
  }),

  getters: {
    isDark: (state): boolean => {
      if (!import.meta.client) return false

      if (state.mode === 'dark') return true
      if (state.mode === 'light') return false

      return window.matchMedia('(prefers-color-scheme: dark)').matches
    },
  },

  actions: {
    initTheme() {
      if (!import.meta.client) return

      const saved = localStorage.getItem('theme_mode') as ThemeMode | null

      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        this.mode = saved
      }

      this.applyTheme()
    },

    setTheme(mode: ThemeMode) {
      this.mode = mode

      if (import.meta.client) {
        localStorage.setItem('theme_mode', mode)
      }

      this.applyTheme()
    },

    toggleTheme() {
      this.setTheme(this.isDark ? 'light' : 'dark')
    },

    applyTheme() {
      if (!import.meta.client) return

      const html = document.documentElement

      const dark =
        this.mode === 'dark' ||
        (
          this.mode === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        )

      html.classList.remove('light', 'dark')
      html.classList.add(dark ? 'dark' : 'light')

      html.style.colorScheme = dark ? 'dark' : 'light'
    },
  },
})