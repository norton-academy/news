export interface RoleItem {
  id: number
  name: string
  guard_name: string
  created_at?: string
}

export interface RolePagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface RoleListResponse {
  status: string
  message: string
  data: {
    roles: RoleItem[]
    pagination: RolePagination
    stats: {
      total_roles: number
    }
  }
}

export interface RolePayload {
  name: string
  guard_name?: string
}

export interface RolePermissionItem {
  id: number
  name: string
  guard_name: string
}

export interface RoleItem {
  id: number
  name: string
  guard_name: string
  permissions_count?: number | null
  permissions?: RolePermissionItem[]
  created_at?: string
}

export interface RoleShowResponse {
  status: string
  message: string
  data: {
    role: RoleItem
  }
}

export interface SyncRolePermissionsPayload {
  permissions: string[]
}

export const useRole = () => {
  const api = useApi()

  const getRoles = async (params?: {
    search?: string
    page?: number
    per_page?: number
  }): Promise<RoleListResponse> => {
    const response = await api.get<RoleListResponse>('/roles', { params })
    return response.data
  }

  const createRole = async (payload: RolePayload) => {
    const response = await api.post('/roles', payload)
    return response.data
  }

  const updateRole = async (id: number | string, payload: RolePayload) => {
    const response = await api.put(`/roles/${id}`, payload)
    return response.data
  }

  const deleteRole = async (id: number | string) => {
    const response = await api.delete(`/roles/${id}`)
    return response.data
  }

  const getRole = async (id: number | string): Promise<RoleShowResponse> => {
  try {
    const response = await api.get<RoleShowResponse>(`/roles/${id}`)
    return response.data
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || 'Failed to fetch role',
      errors: error.response?.data?.errors || {},
      status: error.response?.status || 500,
    }
  }
}

const syncRolePermissions = async (
  id: number | string,
  payload: SyncRolePermissionsPayload
): Promise<RoleShowResponse> => {
  try {
    const response = await api.post<RoleShowResponse>(
      `/roles/${id}/permissions`,
      payload
    )

    return response.data
  } catch (error: any) {
    throw {
      message: error.response?.data?.message || 'Failed to update role permissions',
      errors: error.response?.data?.errors || {},
      status: error.response?.status || 500,
    }
  }
}

  return {
    getRoles,
    getRole,
    syncRolePermissions,
    createRole,
    updateRole,
    deleteRole,
    
  }
}