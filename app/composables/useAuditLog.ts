export interface AuditLogUser {
  id: number
  name: string
  email: string
}

export interface AuditLogItem {
  id: number
  action: string
  module: string | null
  user: AuditLogUser | null
  auditable_type: string | null
  auditable_id: number | null
  old_values: Record<string, any> | null
  new_values: Record<string, any> | null
  ip_address: string | null
  created_at: string
}

export interface AuditLogPagination {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface AuditLogListResponse {
  status: string
  message: string
  data: {
    logs: AuditLogItem[]
    pagination: AuditLogPagination
  }
}

export interface AuditLogShowResponse {
  status: string
  message: string
  data: {
    log: AuditLogItem
  }
}

export const useAuditLog = () => {
  const api = useApi()

  const getAuditLogs = async (params?: {
    search?: string
    module?: string
    action?: string
    page?: number
    per_page?: number
  }): Promise<AuditLogListResponse> => {
    try {
      const response = await api.get<AuditLogListResponse>('/audit-logs', {
        params,
      })

      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch audit logs',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  const getAuditLog = async (id: number | string): Promise<AuditLogShowResponse> => {
    try {
      const response = await api.get<AuditLogShowResponse>(`/audit-logs/${id}`)
      return response.data
    } catch (error: any) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch audit log',
        errors: error.response?.data?.errors || {},
        status: error.response?.status || 500,
      }
    }
  }

  return {
    getAuditLogs,
    getAuditLog,
  }
}