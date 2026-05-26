import type { ApiResponse, NewsSource } from "~/types/news";

export interface NewsSourcePayload {
  name: string;
  slug?: string | null;
  logo?: string | null;
  website_url?: string | null;
  rss_url?: string | null;
  is_active?: boolean;
}

export interface NewsSourceFilters {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface NewsSourceListResponse {
  sources: NewsSource[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useAdminNewsSource = () => {
  const api = useApi();

  const getSources = async (filters: NewsSourceFilters = {}) => {
    const response = await api.get<ApiResponse<NewsSourceListResponse>>(
      "/admin/sources",
      {
        params: filters,
      }
    );

    return response.data;
  };

  const createSource = async (payload: NewsSourcePayload) => {
    const response = await api.post<ApiResponse<{ source: NewsSource }>>(
      "/admin/sources",
      payload
    );

    return response.data;
  };

  const updateSource = async (
    id: number | string,
    payload: Partial<NewsSourcePayload>
  ) => {
    const response = await api.put<ApiResponse<{ source: NewsSource }>>(
      `/admin/sources/${id}`,
      payload
    );

    return response.data;
  };

  const deleteSource = async (id: number | string) => {
    const response = await api.delete<ApiResponse<{}>>(
      `/admin/sources/${id}`
    );

    return response.data;
  };

  return {
    getSources,
    createSource,
    updateSource,
    deleteSource,
  };
};