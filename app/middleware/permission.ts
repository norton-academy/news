export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const menuStore = useMenuStore()

  if (!authStore.initialized) {
    authStore.initAuth()
  }

  if (!authStore.user && authStore.token) {
    try {
      await authStore.fetchUser()
    } catch {
      return navigateTo('/login')
    }
  }

})