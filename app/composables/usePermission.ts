export interface PermissionItem {
  id: number
  name: string
  guard_name: string
  created_at?: string
}

export interface PermissionPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface PermissionListResponse {
  status: string
  message: string
  data: {
    permissions: PermissionItem[]
    pagination: PermissionPagination
    stats: {
      total_permissions: number
    }
  }
}

export interface PermissionPayload {
  name: string
  guard_name?: string
}

export const usePermission = () => {
  const api = useApi()

  const getPermissions = async (params?: {
    search?: string
    page?: number
    per_page?: number
  }): Promise<PermissionListResponse> => {
    try {
      const response = await api.get<PermissionListResponse>('/permissions', {
        params,
      })

      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch permissions',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const createPermission = async (payload: PermissionPayload) => {
    try {
      const response = await api.post('/permissions', payload)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to create permission',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const updatePermission = async (
    id: number | string,
    payload: PermissionPayload
  ) => {
    try {
      const response = await api.put(`/permissions/${id}`, payload)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to update permission',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const deletePermission = async (id: number | string) => {
    try {
      const response = await api.delete(`/permissions/${id}`)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to delete permission',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const getAllPermissions = async (): Promise<PermissionItem[]> => {
    try {
      const response = await api.get<PermissionListResponse>('/permissions', {
        params: {
          per_page: 1000,
        },
      })

      return response.data.data.permissions
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch all permissions',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  return {
    getPermissions,
    getAllPermissions,
    createPermission,
    updatePermission,
    deletePermission,
  }
}