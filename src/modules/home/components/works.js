export default ({ items }) => {
  return (
    <section className="gallery works">
      <h2 className="section-heading">WORKS</h2>
      <div className="gallery-container">
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <div key={index} className="gallery-item">
              <div
                className="gallery-item-background"
                style={{
                  backgroundImage: `url(${
                    item.images && item.images.length
                      ? item.images[0].url
                      : "/images/no-image.png"
                  })`
                }}></div>
              <a className="gallery-item__link" href={"/works"}>
                <div className="gallery-item-foreground--more">
                  <div className="gallery-more">{"more ＞"}</div>
                </div>
              </a>
            </div>
          ) : (
            <div key={index} className="gallery-item">
              <div
                className="gallery-item-background"
                style={{
                  backgroundImage: `url(${
                    item.images && item.images.length
                      ? item.images[0].url
                      : "/images/no-image.png"
                  })`
                }}></div>
              <a className="gallery-item__link" href={`/works/${item.id}`}>
                <div className="gallery-item-foreground">
                  <h3 className="gallery-item-title">{item.title}</h3>
                </div>
              </a>
            </div>
          )
        )}
      </div>
    </section>
  )
}
