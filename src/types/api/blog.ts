import { GetListResponse } from "@/types/api";

export type BlogGetArticleListResponse = GetListResponse<BlogGetArticleListResponse.Article>;

export namespace BlogGetArticleListResponse {
  export type Article = {
    url: string;
    title: string;
    topImage?: {
      url: string;
    };
    createdAt: string;
  };
}
