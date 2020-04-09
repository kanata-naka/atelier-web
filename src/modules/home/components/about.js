import { SectionHeading } from "../../../common/components/elements"

export default () => {
  return (
    <section id="about" className="about">
      <SectionHeading>ABOUT</SectionHeading>
      <Description>
        フリーのイラストレーター・漫画家「彼方ノナメ」のホームページです。
        <br />
        あああああああああああああああああああああ
      </Description>
      <ProfileImage url="/images/profile-image.png" />
      <AuthorName>kanata（かなた）</AuthorName>
      <SocialIcons
        items={[
          {
            name: "Twitter",
            url: "https://twitter.com/kanata_x2",
            imageUrl: "/images/twitter-icon.png"
          },
          {
            name: "pixiv",
            url: "https://www.pixiv.net/users/204608",
            imageUrl: "/images/pixiv-icon.png"
          },
          {
            name: "YouTube",
            url: "https://www.youtube.com/channel/UCVeHzl5wDqmJLszg_eG7tCw",
            imageUrl: "/images/youtube-icon.png"
          }
        ]}
      />
      <Introduction>
        自己紹介あああああああああああああああああああああああああ
        <br />
        ああああああああああああああああああああああ
      </Introduction>
      <TwitterWidgets id="kanata_x2" />
    </section>
  )
}

const Description = ({ children }) => {
  return <p className="description">{children}</p>
}

/**
 * プロフィール画像
 */
const ProfileImage = ({ url }) => {
  return (
    <figure className="profile-image">
      <img className="profile-image__image" alt="プロフィール画像" src={url} />
    </figure>
  )
}

const AuthorName = ({ children }) => {
  return <h3 className="author-name">{children}</h3>
}

const SocialIcons = ({ items }) => {
  return (
    <ul className="social-icons">
      {items.map((item, index) => (
        <SocialIcon key={index} item={item} />
      ))}
    </ul>
  )
}

const SocialIcon = ({ item }) => {
  return (
    <li className="social-icons-item">
      <a className="social-icons-item__link" href={item.url}>
        <img
          className="social-icons-item__image"
          alt={item.name}
          src={item.imageUrl}
        />
      </a>
    </li>
  )
}

/**
 * 自己紹介
 */
const Introduction = ({ children }) => {
  return <p className="introduction">{children}</p>
}

const TwitterWidgets = ({ id }) => {
  return (
    <div className="twitter-widgets">
      <a
        className="twitter-timeline"
        data-lang="ja"
        data-height="500"
        href={`https://twitter.com/${id}?ref_src=twsrc%5Etfw`}>
        {`Tweets by ${id}`}
      </a>
      <script
        async
        src="https://platform.twitter.com/widgets.js"
        charSet="utf-8"
      />
    </div>
  )
}
