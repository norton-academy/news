export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (payload: { email: string; password: string }) => {
    return await authStore.login(payload)
  }

  const register = async (payload: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    return await authStore.register(payload)
  }

  const logout = async () => {
    return await authStore.logout()
  }

  const logoutAll = async () => {
    return await authStore.logoutAll()
  }

  const fetchUser = async () => {
    return await authStore.fetchUser()
  }

  return {
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    loading: computed(() => authStore.loading),
    login,
    register,
    logout,
    logoutAll,
    fetchUser,
  }
}