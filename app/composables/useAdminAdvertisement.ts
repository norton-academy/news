import type { Advertisement, ApiResponse } from "~/types/news";

export interface AdvertisementPayload {
  title: string;
  placement: string;
  image?: string | null;
  link_url?: string | null;
  is_active?: boolean;
  start_date?: string | null;
  end_date?: string | null;
}

export interface AdvertisementFilters {
  search?: string;
  placement?: string;
  page?: number;
  per_page?: number;
}

export interface AdvertisementListResponse {
  advertisements: Advertisement[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const useAdminAdvertisement = () => {
  const api = useApi();

  const getAdvertisements = async (filters: AdvertisementFilters = {}) => {
    const response = await api.get<ApiResponse<AdvertisementListResponse>>(
      "/admin/advertisements",
      {
        params: filters,
      }
    );

    return response.data;
  };

  const createAdvertisement = async (payload: AdvertisementPayload) => {
    const response = await api.post<ApiResponse<{ advertisement: Advertisement }>>(
      "/admin/advertisements",
      payload
    );

    return response.data;
  };

  const updateAdvertisement = async (
    id: number | string,
    payload: Partial<AdvertisementPayload>
  ) => {
    const response = await api.put<ApiResponse<{ advertisement: Advertisement }>>(
      `/admin/advertisements/${id}`,
      payload
    );

    return response.data;
  };

  const deleteAdvertisement = async (id: number | string) => {
    const response = await api.delete<ApiResponse<{}>>(
      `/admin/advertisements/${id}`
    );

    return response.data;
  };

  return {
    getAdvertisements,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement,
  };
};