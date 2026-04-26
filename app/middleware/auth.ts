export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    authStore.initAuth()
  }

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})