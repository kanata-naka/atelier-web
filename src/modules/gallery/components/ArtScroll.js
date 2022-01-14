import { useState, useEffect } from "react";
import Link from "next/link";
import { callFunction } from "../../../common/firebase";
import { useScroll } from "../../../common/hooks";
import { RESTRICT_ALL, RESTRICT_LIMITED } from "../../../common/models";
import GalleryModal from "./GalleryModal";
import { LIMIT } from "../models";

export default ({
  tag,
  items: initinalItems,
  fetchedAll: initialFetchedAll,
}) => {
  const [items, setItems] = useState([...initinalItems]);
  const [fetchedAll, setFetchedAll] = useState(initialFetchedAll);

  // 無限スクロールを使用する
  const [loading, setLoading] = useScroll(
    async () => {
      try {
        // 次の${LIMIT}件を取得する
        const response = await callFunction("arts-get", {
          lastId: items[items.length - 1].id,
          limit: LIMIT,
          tag: tag,
          restrict: [RESTRICT_ALL, RESTRICT_LIMITED],
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
        {loading && <img className="loading-image" src="/images/loading.svg" />}
      </div>
      <GalleryModal.Component />
    </section>
  );
};

const ArtScrollItem = ({ item }) => {
  return (
    <div className="art-scroll-item">
      <Link href={`/gallery?id=${item.id}`} as={`/gallery/${item.id}`}>
        <a
          className="art-scroll-item__link"
          onClick={(e) => {
            e.preventDefault();
            // モーダルを開く
            GalleryModal.open(item);
          }}
        >
          <ArtScrollItemBackground image={item.images[0]} />
        </a>
      </Link>
    </div>
  );
};

const ArtScrollItemBackground = ({ image }) => {
  return (
    <div
      className="art-scroll-item-background"
      style={{
        backgroundImage: `url(${image.thumbnailUrl.medium})`,
      }}
    ></div>
  );
};
