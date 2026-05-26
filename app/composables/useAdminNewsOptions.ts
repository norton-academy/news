import type {
  ApiResponse,
  NewsCategory,
  NewsSource,
  Province,
} from "~/types/news";

export const useAdminNewsOptions = () => {
  const api = useApi();

  const getCategories = async () => {
    const response = await api.get<ApiResponse<{ categories: NewsCategory[] }>>(
      "/public/categories"
    );

    return response.data;
  };

  const getSources = async () => {
    const response = await api.get<ApiResponse<{ sources: NewsSource[] }>>(
      "/public/sources"
    );

    return response.data;
  };

  const getProvinces = async () => {
    const response = await api.get<ApiResponse<{ provinces: Province[] }>>(
      "/public/provinces"
    );

    return response.data;
  };

  return {
    getCategories,
    getSources,
    getProvinces,
  };
};