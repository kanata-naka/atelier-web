export default () => {
  return (
    <section id="about" className="about">
      <h2 className="section-heading">ABOUT</h2>
      <p className="description">
        フリーのイラストレーター・漫画家「kanata（かなた）」のホームページです。
        <br />
        あああああああああああああああああああああ
      </p>
      <figure className="profile-image">
        <img
          className="profile-image__image"
          alt="プロフィール画像"
          src="/static/images/profile-image.png"
        />
      </figure>
      <h3 className="author-name">kanata（かなた）</h3>
      <ul className="social-icons">
        <li className="social-icons-item">
          <a
            className="social-icons-item__link"
            href="https://twitter.com/kanata_fabiko">
            <img
              className="social-icons-item__image"
              alt="Twitter"
              src="/static/images/twitter-icon.png"
            />
          </a>
        </li>
      </ul>
      <p className="introduction">
        自己紹介あああああああああああああああああああああああああ
        <br />
        ああああああああああああああああああああああ
      </p>
      <div className="twitter-widgets">
        <a
          className="twitter-timeline"
          data-lang="ja"
          data-height="500"
          href="https://twitter.com/kanata_fabiko?ref_src=twsrc%5Etfw">
          Tweets by kanata_fabiko
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </div>
    </section>
  )
}
