import { Restrict } from "@/types";
import { GetListResponse, GetListRequest } from "@/types/api";

export type ArtGetListRequest = GetListRequest & {
  tag?: string;
  restrict?: Restrict[];
  lastId?: string;
};

export type ArtGetListResponse = GetListResponse<ArtGetResponse> & {
  fetchedAll: boolean;
};

export type ArtGetResponse = {
  id: string;
  title: string;
  tags: string[];
  images: ArtGetResponse.Image[];
  description?: string;
  restrict: Restrict;
  createdAt: number;
  updatedAt: number;
};

export namespace ArtGetResponse {
  export type Image = {
    name: string;
    url: string;
    thumbnailUrl: {
      small: string;
      medium: string;
    };
  };
}
