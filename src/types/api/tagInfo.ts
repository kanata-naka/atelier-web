export type TagInfoGetResponse = {
  /** タグ情報 */
  info: TagInfoGetResponse.TagInfo[];
};

export namespace TagInfoGetResponse {
  export type TagInfo = {
    /** タグ名 */
    name: string;
    /** 件数 */
    count: number;
  };
}
