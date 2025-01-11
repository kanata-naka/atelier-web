import { ComicType, Nullable, Restrict } from "@/types";
import { GetListResponse, GetListRequest, GetByIdRequest } from "@/types/api";

export type ComicGetListRequest = GetListRequest & {
  restrict?: Restrict[];
};

export type ComicGetListResponse = GetListResponse<ComicGetResponse>;

export type ComicGetByIdRequest = GetByIdRequest & ComicGetListRequest;

export type ComicGetByEpisodeIdRequest = GetByIdRequest & {
  episodeId: string;
};

export type ComicGetResponse = {
  id: string;
  title: string;
  image: Nullable<ComicGetResponse.Image>;
  description: Nullable<string>;
  type: ComicType;
  completed: boolean;
  episodes: ComicGetResponse.Episode[];
  restrict: Restrict;
  createdAt: number;
  updatedAt: number;
};

export namespace ComicGetResponse {
  export type Image = {
    name: string;
    url: string;
  };

  export type Episode = {
    id: string;
    no: number;
    title: string;
    image: Nullable<Image>;
    description: Nullable<string>;
    pages: Page[];
    restrict: Restrict;
    createdAt: number;
    updatedAt: number;
  };

  export type Page = {
    id: string;
    no: number;
    image: Image;
    createdAt: number;
    updatedAt: number;
  };
}
