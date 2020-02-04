import GalleryModal from "../../gallery/components/GalleryModal"

export default ({ items }) => {
  return (
    <section className="gallery">
      <h2 className="section-heading">GALLERY</h2>
      <div className="gallery-container">
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <div key={index} className="gallery-item">
              <div
                className="gallery-item-background"
                style={{
                  backgroundImage: `url(${item.images[0].url})`
                }}></div>
              <a className="gallery-item__link" href={"/gallery"}>
                <div className="gallery-item-foreground--more">
                  <div className="gallery-more">more ＞</div>
                </div>
              </a>
            </div>
          ) : (
            <div key={index} className="gallery-item">
              <div
                className="gallery-item-background"
                style={{
                  backgroundImage: `url(${item.images[0].url})`
                }}></div>
              <a
                className="gallery-item__link"
                href={`/gallery/${item.id}`}
                onClick={e => {
                  e.preventDefault()
                  // モーダルを開く
                  GalleryModal.open(item)
                }}></a>
            </div>
          )
        )}
      </div>
      <GalleryModal.Component />
    </section>
  )
}
