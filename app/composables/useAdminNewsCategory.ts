import type { ApiResponse, NewsCategory } from "~/types/news";

export interface NewsCategoryPayload {
  name_km: string;
  name_en?: string | null;
  slug?: string | null;
  icon?: string | null;
  sort_order?: number;
  is_active?: boolean;
}

export interface NewsCategoryFilters {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface NewsCategoryListResponse {
  categories: NewsCategory[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useAdminNewsCategory = () => {
  const api = useApi();

  const getCategories = async (filters: NewsCategoryFilters = {}) => {
    const response = await api.get<ApiResponse<NewsCategoryListResponse>>(
      "/admin/categories",
      {
        params: filters,
      }
    );

    return response.data;
  };

  const createCategory = async (payload: NewsCategoryPayload) => {
    const response = await api.post<ApiResponse<{ category: NewsCategory }>>(
      "/admin/categories",
      payload
    );

    return response.data;
  };

  const updateCategory = async (
    id: number | string,
    payload: Partial<NewsCategoryPayload>
  ) => {
    const response = await api.put<ApiResponse<{ category: NewsCategory }>>(
      `/admin/categories/${id}`,
      payload
    );

    return response.data;
  };

  const deleteCategory = async (id: number | string) => {
    const response = await api.delete<ApiResponse<{}>>(
      `/admin/categories/${id}`
    );

    return response.data;
  };

  return {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};