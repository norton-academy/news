export default defineNuxtPlugin(() => {
  const themeStore = useThemeStore()

  themeStore.initTheme()

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', () => {
    if (themeStore.mode === 'system') {
      themeStore.applyTheme()
    }
  })
})