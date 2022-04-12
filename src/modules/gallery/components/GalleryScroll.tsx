import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import { callFunction } from "../../../common/api";
import { useScroll } from "../../../common/hooks";
import { Restrict } from "../../../types";
import {
  ArtGetListRequest,
  ArtGetListResponse,
  ArtGetResponse,
} from "../../../types/api/arts";
import GalleryModal from "./GalleryModal";

const GalleryScroll: FC<{
  tag?: string;
  items: ArtGetResponse[];
  fetchedAll: boolean;
  fetchLimit: number;
}> = ({
  tag,
  items: initinalItems,
  fetchedAll: initialFetchedAll,
  fetchLimit,
}) => {
  const [items, setItems] = useState([...initinalItems]);
  const [fetchedAll, setFetchedAll] = useState(initialFetchedAll);

  // 無限スクロールを使用する
  const [loading, setLoading] = useScroll(
    async () => {
      try {
        // 次の${LIMIT}件を取得する
        const response = await callFunction<
          ArtGetListRequest,
          ArtGetListResponse
        >("arts-get", {
          lastId: items[items.length - 1].id,
          limit: fetchLimit,
          tag: tag,
          restrict: [Restrict.ALL, Restrict.LIMITED],
        });
        setItems([...items, ...response.data.result]);
        setFetchedAll(response.data.fetchedAll!);
      } catch (error) {
        console.error(error);
      }
    },
    100,
    fetchedAll,
    [items]
  );

  useEffect(() => {
    // 同じページ間の遷移（例：タグのリンクを押下した）場合、ComponentやStateはリセットされない模様。
    // →データをリセットする
    setItems(initinalItems);
    setLoading(false);
    setFetchedAll(initialFetchedAll);
  }, [initinalItems]);

  return (
    <section className="art-scroll">
      <div className="art-scroll-container">
        {items.map((item, index) => (
          <GalleryScrollItem key={index} item={item} />
        ))}
      </div>
      <div className="loading">
        {loading && <img className="loading-image" src="/images/loading.svg" />}
      </div>
      <GalleryModal.Component />
    </section>
  );
};

const GalleryScrollItem: FC<{ item: ArtGetResponse }> = ({ item }) => {
  return (
    <div className="art-scroll-item">
      <Link href={`/gallery?id=${item.id}`} as={`/gallery/${item.id}`}>
        <a
          className="art-scroll-item__link"
          onClick={(event) => {
            event.preventDefault();
            // モーダルを開く
            GalleryModal.open(item);
          }}>
          <GalleryScrollItemBackground image={item.images[0]} />
        </a>
      </Link>
    </div>
  );
};

const GalleryScrollItemBackground: FC<{
  image: ArtGetResponse.Image;
}> = ({ image }) => {
  return (
    <div
      className="art-scroll-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl.medium})`,
      }}></div>
  );
};

export default GalleryScroll;
