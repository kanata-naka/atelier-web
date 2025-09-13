import { Nullable, Restrict } from "@/types";
import { GetListRequest, GetListResponse } from "@/types/api";

export type WorkGetListRequest = GetListRequest & {
  tag?: string;
  restrict?: Restrict[];
  lastId?: string;
};

export type WorkGetListResponse = GetListResponse<WorkGetResponse> & {
  fetchedAll: boolean;
};

export type WorkGetResponse = {
  id: string;
  title: string;
  tags: string[];
  images: WorkGetResponse.Image[];
  description: Nullable<string>;
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
