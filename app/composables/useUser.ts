export interface UserItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
}

export interface UserPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface UserStats {
  total_users: number
  active_users: number
  pending_users: number
  inactive_users: number
}

export interface UserListResponse {
  status: string
  message: string
  data: {
    users: UserItem[]
    pagination: UserPagination
    stats: UserStats
  }
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
  status: 'active' | 'inactive' | 'pending'
  role?: string
}

export interface CreateUserResponse {
  status: string
  message: string
  data: {
    user: UserItem
  }
}

export interface UpdateUserPayload {
  name: string
  email: string
  password?: string
  password_confirmation?: string
  status: 'active' | 'inactive' | 'pending'
  role?: string
}

export const useUser = () => {
  const api = useApi()

  const getUsers = async (params?: {
    search?: string
    status?: string
    page?: number
    per_page?: number
  }): Promise<UserListResponse> => {
    try {
      const response = await api.get<UserListResponse>('/users', {
        params,
      })

      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch users',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const getUser = async (id: number | string) => {
    try {
      const response = await api.get(`/users/${id}`)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch user',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const createUser = async (payload: CreateUserPayload): Promise<CreateUserResponse> => {
    try {
      const response = await api.post<CreateUserResponse>('/users', payload)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to create user',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const updateUser = async (
    id: number | string,
    payload: UpdateUserPayload
  ) => {
    try {
      const response = await api.put(`/users/${id}`, payload)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to update user',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const deleteUser = async (id: number | string) => {
    try {
      const response = await api.delete(`/users/${id}`)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to delete user',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }


  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  }
}