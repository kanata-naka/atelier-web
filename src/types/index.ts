import { Restrict } from "@/constants";

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
