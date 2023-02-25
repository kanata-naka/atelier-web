import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import Link from "next/link";
import { callFunction } from "@/api/firebase";
import ArtModal from "@/components/gallery/ArtModal";
import { Restrict } from "@/constants";
import { useScroll } from "@/hooks";
import { frameBorderColor, loadingImageKeyframes, responsiveBoundaryWidth } from "@/styles";
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
    <section>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          padding: 0 8px;
        `}
      >
        {items.map((item, index) => (
          <ArtScrollItem key={index} item={item} />
        ))}
      </div>
      <div
        css={css`
          width: 100%;
          height: 80px;
          padding: 24px 0;
        `}
      >
        {loading && (
          <Image
            src="/images/loading.svg"
            width={32}
            height={32}
            alt="Loading..."
            css={css`
              display: block;
              margin: 0 auto;
              animation: ${loadingImageKeyframes} 2s linear infinite;
            `}
          />
        )}
      </div>
      <ArtModal.Component />
    </section>
  );
}

function ArtScrollItem({ item }: { item: ArtGetResponse }) {
  return (
    <div
      className="art-scroll-item"
      css={css`
        position: relative;
        flex: 0 1 calc(50% - 10px);
        height: auto;
        margin: 4px;
        overflow: hidden;
        border: 1px solid ${frameBorderColor};
        transition: opacity 250ms;

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          flex: 0 1 calc(33.3% - 10px);
        }

        &:before {
          display: block;
          padding-top: 100%;
          content: "";
        }

        &:hover {
          opacity: 0.8;
        }
      `}
    >
      <Link
        href={`/gallery?id=${item.id}`}
        as={`/gallery/${item.id}`}
        onClick={(event) => {
          event.preventDefault();
          ArtModal.open(item);
        }}
        css={css`
          display: block;
        `}
      >
        <Image
          src={item.images[0].thumbnailUrl.medium}
          fill
          alt={item.title}
          css={css`
            object-fit: contain;
          `}
        />
      </Link>
    </div>
  );
}

export default ArtScroll;
