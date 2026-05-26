import type { Article, ApiResponse } from "~/types/news";

export interface AdminArticleFilters {
  page?: number;
  per_page?: number;
  search?: string;
  status?: "published" | "draft" | "";
  category_id?: number | string;
  source_id?: number | string;
}

export interface AdminArticleListResponse {
  articles: Article[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ArticlePayload {
  source_id?: number | null;
  category_id?: number | null;
  province_id?: number | null;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content?: string | null;
  ai_summary?: string | null;
  hero_image?: string | null;
  photo_credit?: string | null;
  original_url?: string | null;
  is_featured?: boolean;
  is_breaking?: boolean;
  is_published?: boolean;
  published_at?: string | null;
}

export const useAdminArticle = () => {
  const api = useApi();

  const getArticles = async (filters: AdminArticleFilters = {}) => {
    const response = await api.get<ApiResponse<AdminArticleListResponse>>(
      "/admin/articles",
      {
        params: filters,
      }
    );

    return response.data;
  };

  const getArticle = async (id: number | string) => {
    const response = await api.get<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}`
    );

    return response.data;
  };

  const createArticle = async (payload: ArticlePayload) => {
    const response = await api.post<ApiResponse<{ article: Article }>>(
      "/admin/articles",
      payload
    );

    return response.data;
  };

  const updateArticle = async (id: number | string, payload: Partial<ArticlePayload>) => {
    const response = await api.put<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}`,
      payload
    );

    return response.data;
  };

  const deleteArticle = async (id: number | string) => {
    const response = await api.delete<ApiResponse<{}>>(`/admin/articles/${id}`);

    return response.data;
  };

  const publishArticle = async (id: number | string) => {
    const response = await api.post<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}/publish`
    );

    return response.data;
  };

  const unpublishArticle = async (id: number | string) => {
    const response = await api.post<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}/unpublish`
    );

    return response.data;
  };

  const toggleFeatured = async (id: number | string) => {
    const response = await api.post<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}/toggle-featured`
    );

    return response.data;
  };

  const toggleBreaking = async (id: number | string) => {
    const response = await api.post<ApiResponse<{ article: Article }>>(
      `/admin/articles/${id}/toggle-breaking`
    );

    return response.data;
  };

  return {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    publishArticle,
    unpublishArticle,
    toggleFeatured,
    toggleBreaking,
  };
};