export type TagInfoGetResponse = {
  info: TagInfoGetResponse.TagInfo[];
};

export namespace TagInfoGetResponse {
  export type TagInfo = {
    name: string;
    count: number;
  };
}
