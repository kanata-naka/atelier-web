import React, { useCallback } from "react"
import {
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  SOCIAL_ACCOUNTS,
  TWITTER_USERNAME
} from "../../../common/models"
import { SectionHeading } from "../../../common/components/elements"
import { reloadTwitterWidgets } from "../../../utils/vendorUtil"

export default () => {
  return (
    <section id="about" className="about">
      <SectionHeading>ABOUT</SectionHeading>
      <Description>{SITE_DESCRIPTION}</Description>
      <ProfileImage url="/images/profile-image.png" />
      <AuthorName>{AUTHOR_NAME}</AuthorName>
      <SocialIcons items={SOCIAL_ACCOUNTS} />
      <Introduction>
        版権メインの個人サークル「カナタノアトリエ」、
        <br />
        一次創作オンリーのサークル「old dear place」で活動しています。
      </Introduction>
      <TwitterWidgets id={TWITTER_USERNAME} />
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
      <a href={item.url}>
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
  const elementRef = useCallback(element => {
    if (!element) {
      return
    }
    reloadTwitterWidgets(element)
  }, [])

  return (
    <div className="twitter-widgets" ref={elementRef}>
      <a
        className="twitter-timeline"
        data-lang="ja"
        data-height="500"
        href={`https://twitter.com/${id}?ref_src=twsrc%5Etfw`}>
        {`Tweets by ${id}`}
      </a>
    </div>
  )
}
