import { Restrict } from "@/types";
import { GetListRequest, GetListResponse } from "@/types/api";

export type WorkGetListRequest = GetListRequest & {
  restrict?: Restrict[];
  sort?: {
    column?: "publishedDate" | "createdAt";
    order?: "asc" | "desc";
  };
};

export type WorkGetListResponse = GetListResponse<WorkGetResponse>;

export type WorkGetResponse = {
  id: string;
  title: string;
  publishedDate: number;
  images?: WorkGetResponse.Image[];
  description?: string;
  restrict: Restrict;
  createdAt: number;
  updatedAt: number;
};

export namespace WorkGetResponse {
  export type Image = {
    name: string;
    url: string;
    thumbnailUrl: {
      small: string;
    };
  };
}
