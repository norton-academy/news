import type { ApiResponse, Article, ArticleDetailData, PublicHomeData } from "~/types/news";

export interface ArticleListParams {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
  province?: string;
  source?: string;
}

export interface ArticleListResponse {
  articles: Article[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export const usePublicNews = () => {
  const api = useApi();

  const getHome = async () => {
    const response = await api.get<ApiResponse<PublicHomeData>>("/public/home");
    return response.data;
  };

  const getArticle = async (slug: string) => {
    const response = await api.get<ApiResponse<ArticleDetailData>>(`/public/articles/${slug}`);
    return response.data;
  };

  const getArticles = async (params: ArticleListParams = {}) => {
    const response = await api.get<ApiResponse<ArticleListResponse>>("/public/articles", {
      params,
    });

    return response.data;
  };

  return {
    getHome,
    getArticle,
    getArticles,
  };
};