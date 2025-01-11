import { ComicType, Restrict } from "@/constants";

export type Nullable<T> = T | null;

export type PaginationState = {
  page: number;
  perPage: number;
  total: number;
};

export type SocialAccount = {
  name: string;
  url: string;
  imageUrl: string;
};

export type Restrict = (typeof Restrict)[keyof typeof Restrict];

export type ComicType = (typeof ComicType)[keyof typeof ComicType];
