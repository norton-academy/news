export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

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

  const requiredPermission = to.meta.permission as string | undefined

  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    // Prevent infinite redirect by checking if we're already attempting to redirect to the same route
    if (to.path !== '/dashboard') {
      return navigateTo('/')
    }
  }
})