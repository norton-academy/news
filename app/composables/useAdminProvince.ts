import type { ApiResponse, Province } from "~/types/news";

export interface ProvincePayload {
  name_km: string;
  name_en: string;
  slug?: string | null;
  is_active?: boolean;
}

export interface ProvinceFilters {
  search?: string;
  page?: number;
  per_page?: number;
}

export interface ProvinceListResponse {
  provinces: Province[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useAdminProvince = () => {
  const api = useApi();

  const getProvinces = async (filters: ProvinceFilters = {}) => {
    const response = await api.get<ApiResponse<ProvinceListResponse>>(
      "/admin/provinces",
      {
        params: filters,
      }
    );

    return response.data;
  };

  const createProvince = async (payload: ProvincePayload) => {
    const response = await api.post<ApiResponse<{ province: Province }>>(
      "/admin/provinces",
      payload
    );

    return response.data;
  };

  const updateProvince = async (
    id: number | string,
    payload: Partial<ProvincePayload>
  ) => {
    const response = await api.put<ApiResponse<{ province: Province }>>(
      `/admin/provinces/${id}`,
      payload
    );

    return response.data;
  };

  const deleteProvince = async (id: number | string) => {
    const response = await api.delete<ApiResponse<{}>>(
      `/admin/provinces/${id}`
    );

    return response.data;
  };

  return {
    getProvinces,
    createProvince,
    updateProvince,
    deleteProvince,
  };
};