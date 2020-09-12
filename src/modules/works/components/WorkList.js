import { useState, useEffect } from "react";
import { Globals } from "../../../common/models";
import ShareButtons from "../../../common/components/ShareButtons";
import { formatDateFromUnixTimestamp } from "../../../utils/dateUtil";
import { renderMarkdown } from "../../../utils/domUtil";

export default ({ items }) => {
  return (
    <section className="work-list">
      {items.map((item, index) => (
        <WorkListItem key={index} item={item} />
      ))}
    </section>
  );
};

const WorkListItem = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item]);

  return (
    <article id={item.id} className="work-list-item">
      <WorkListItemTitle>{item.title}</WorkListItemTitle>
      <WorkListItemPublishedDate timestamp={item.publishedDate} />
      <div className="work-list-item-row">
        <div className="work-list-item-row__left-column">
          <WorkListItemDescription>
            {renderMarkdown(item.description)}
          </WorkListItemDescription>
          <ShareButtons
            url={`${Globals.env.BASE_URL}/works/${item.id}`}
            title={item.title}
            classPrefix="work-list-item-"
          />
        </div>
        {item.images && !!item.images.length && (
          <div className="work-list-item-row__right-column">
            <DiffList
              images={item.images}
              currentImageIndex={currentImageIndex}
              onSelect={index => setCurrentImageIndex(index)}
            />
            <WorkListItemImage image={item.images[currentImageIndex]} />
          </div>
        )}
      </div>
    </article>
  );
};

const WorkListItemTitle = ({ children }) => {
  return <h3 className="work-list-item-title">{children}</h3>;
};

const WorkListItemPublishedDate = ({ timestamp }) => {
  return (
    <div className="work-list-item-published-date">
      <i className="far fa-clock"></i>
      &nbsp;
      {formatDateFromUnixTimestamp(timestamp)}
    </div>
  );
};

const WorkListItemDescription = ({ children }) => {
  return <p className="work-list-item-description">{children}</p>;
};

const WorkListItemImage = ({ image }) => {
  return <img className="work-list-item-image" src={image.url} />;
};

const DiffList = ({ images, currentImageIndex, onSelect }) => {
  if (images.length < 2) {
    // 画像が2つ以上なければ表示しない
    return null;
  }
  return (
    <ul className="diff-list">
      {images.map((image, index) => (
        <DiffListItem
          key={index}
          image={image}
          isActive={index === currentImageIndex}
          onClick={e => {
            e.preventDefault();
            onSelect(index);
          }}
        />
      ))}
    </ul>
  );
};

const DiffListItem = ({ image, isActive, onClick }) => {
  return (
    <li
      className={`diff-list-item ${isActive ? "active" : ""}`}
      style={{
        backgroundImage: `url(${image.thumbnailUrl.small})`
      }}>
      <a
        className="diff-list-item__link"
        href={image.url}
        onClick={onClick}></a>
    </li>
  );
};
