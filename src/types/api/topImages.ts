import { GetListResponse } from "@/types/api";
import { Nullable } from "..";

export type TopImageGetListResponse = GetListResponse<TopImageGetResponse>;

export type TopImageGetResponse = {
  id: string;
  image: TopImageGetResponse.Image;
  thumbnailImage: TopImageGetResponse.Image;
  description: Nullable<string>;
  order: number;
  createdAt: number;
  updatedAt: number;
};

export namespace TopImageGetResponse {
  export type Image = {
    name: string;
    url: string;
  };
}
