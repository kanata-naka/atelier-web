import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { callFunction } from "@/api/firebase";
import ArtModal from "@/components/gallery/ArtModal";
import { Restrict } from "@/constants";
import { useScroll } from "@/hooks";
import { ArtGetListRequest, ArtGetListResponse, ArtGetResponse } from "@/types/api/arts";

function ArtScroll({
  tag,
  items: initinalItems,
  fetchedAll: initialFetchedAll,
  fetchLimit,
}: {
  tag?: string;
  items: ArtGetResponse[];
  fetchedAll: boolean;
  fetchLimit: number;
}) {
  const [items, setItems] = useState([...initinalItems]);
  const [fetchedAll, setFetchedAll] = useState(initialFetchedAll);

  const [loading, setLoading] = useScroll(
    async () => {
      try {
        const response = await callFunction<ArtGetListRequest, ArtGetListResponse>("arts-get", {
          lastId: items[items.length - 1].id,
          limit: fetchLimit,
          tag: tag,
          restrict: [Restrict.ALL, Restrict.LIMITED],
        });
        setItems([...items, ...response.data.result]);
        setFetchedAll(response.data.fetchedAll);
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
          <ArtScrollItem key={index} item={item} />
        ))}
      </div>
      <div className="loading">
        {loading && (
          <Image className="loading-image" src="/images/loading.svg" width={32} height={32} alt="Loading..." />
        )}
      </div>
      <ArtModal.Component />
    </section>
  );
}

function ArtScrollItem({ item }: { item: ArtGetResponse }) {
  return (
    <div className="art-scroll-item">
      <Link
        className="art-scroll-item__link"
        href={`/gallery?id=${item.id}`}
        as={`/gallery/${item.id}`}
        onClick={(event) => {
          event.preventDefault();
          ArtModal.open(item);
        }}
      >
        <ArtScrollItemBackground image={item.images[0]} />
      </Link>
    </div>
  );
}

function ArtScrollItemBackground({ image }: { image: ArtGetResponse.Image }) {
  return (
    <div
      className="art-scroll-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl.medium})`,
      }}
    ></div>
  );
}

export default ArtScroll;
