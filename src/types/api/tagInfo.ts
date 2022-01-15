export type TagInfoGetResponse = {
  /** タグ情報 */
  info: TagInfoItem[];
};

export type TagInfoItem = {
  /** タグ名 */
  name: string;
  /** 件数 */
  count: number;
};
