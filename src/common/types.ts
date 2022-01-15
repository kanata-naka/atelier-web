import { RESTRICT_ALL, RESTRICT_LIMITED, RESTRICT_PRIVATE } from "./models";

export type SocialAccount = {
  name: string;
  url: string;
  imageUrl: string;
};

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
};

export type GetByIdData = {
  /** ID */
  id: string;
};

export type Response<T> = {
  /** 取得結果 */
  result: T[];
};

export type Image = {
  /** ストレージ上のパス */
  name: string;
  /** 画像のURL */
  url: string;
  /** サムネイル画像のURL */
  thumbnailUrl?: { small?: string; medium?: string };
};

export type TopImageItem = {
  /** ID */
  id: string;
  /** 画像 */
  image: Image;
  /** サムネイル画像 */
  thumbnailImage: Image;
  /** 説明 */
  description?: string;
  /** 表示順 */
  order: number;
  /** 作成日時 */
  createdAt?: number;
  /** 更新日時 */
  updatedAt?: number;
};

export type BlogGetArticlesData = {
  /** 一度に取得する最大件数 */
  limit?: number;
};

export type ArticleItem = {
  /** URL */
  url: string;
  /** タイトル */
  title: string;
  /** 画像の一覧 */
  topImage?: {
    /** 画像のURL */
    url: string;
  };
  /** 作成日時 */
  createdAt: string;
};

export type TagInfoItem = {
  /** タグ名 */
  name: string;
  /** 件数 */
  count: number;
};

const restrictList = [
  RESTRICT_ALL,
  RESTRICT_LIMITED,
  RESTRICT_PRIVATE,
] as const;

/** 公開範囲 */
export type Restrict = typeof restrictList[number];

export type ArtGetData = {
  /** タグ */
  tag?: string;
  /** 公開範囲 */
  restrict?: Restrict[];
  /** 最後のID（自動スクロールで使用） */
  lastId?: string;
  /** 一度に取得する最大件数 */
  limit?: number;
};

export type ArtGetResponse = Response<ArtItem> & {
  /** 最後まで取得されたか */
  fetchedAll?: boolean;
};

export type ArtItem = {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** タグの一覧 */
  tags?: string[];
  /** 画像の一覧 */
  images: Image[];
  /** 説明 */
  description?: string;
  /** 公開範囲 */
  restrict?: Restrict;
  /** 作成日時 */
  createdAt?: number;
  /** 更新日時 */
  updatedAt?: number;
};

export type WorkGetData = {
  /** 公開範囲 */
  restrict?: Restrict[];
  /** 一度に取得する最大件数 */
  limit?: number;
  /** ソート */
  sort?: {
    /** ソート対象のカラム */
    column: "publishedDate" | "createdAt";
    /** ソートの方向 */
    order: "asc" | "desc";
  };
};

export type WorkItem = {
  /** ID */
  id: string;
  /** タイトル */
  title: string;
  /** 出版日 */
  publishedDate?: number;
  /** 画像の一覧 */
  images?: Image[];
  /** 説明 */
  description?: string;
  /** 公開範囲 */
  restrict?: Restrict;
  /** 作成日時 */
  createdAt?: number;
  /** 更新日時 */
  updatedAt?: number;
};
