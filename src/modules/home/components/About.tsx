import React, { FC, useCallback } from "react";
import {
  AUTHOR_NAME,
  SITE_DESCRIPTION,
  INTRODUCTION,
  TWITTER_USERNAME,
  SOCIAL_ACCOUNTS,
} from "../../../common/models";
import { SocialAccount } from "../../../common/types";
import { SectionHeading } from "../../../common/components/elements";
import { reloadTwitterWidgets } from "../../../utils/vendorUtil";

export default () => {
  return (
    <section id="about" className="about">
      <SectionHeading>ABOUT</SectionHeading>
      <Description>{SITE_DESCRIPTION}</Description>
      <ProfileImage url="/images/profile-image.png" />
      <AuthorName>{AUTHOR_NAME}</AuthorName>
      <SocialIcons accounts={SOCIAL_ACCOUNTS} />
      <Introduction content={INTRODUCTION} />
      <TwitterWidgets id={TWITTER_USERNAME} />
    </section>
  );
};

const Description: FC = ({ children }) => {
  return <p className="description">{children}</p>;
};

/**
 * プロフィール画像
 */
const ProfileImage = ({ url }: { url: string }) => {
  return (
    <figure className="profile-image">
      <img className="profile-image__image" alt="プロフィール画像" src={url} />
    </figure>
  );
};

const AuthorName: FC = ({ children }) => {
  return <h3 className="author-name">{children}</h3>;
};

const SocialIcons = ({ accounts }: { accounts: SocialAccount[] }) => {
  return (
    <ul className="social-icons">
      {accounts.map((account, index) => (
        <SocialIcon key={index} account={account} />
      ))}
    </ul>
  );
};

const SocialIcon = ({ account }: { account: SocialAccount }) => {
  return (
    <li className="social-icons-item">
      <a href={account.url}>
        <img
          className="social-icons-item__image"
          alt={account.name}
          src={account.imageUrl}
        />
      </a>
    </li>
  );
};

/**
 * 自己紹介
 */
const Introduction = ({ content }: { content: string }) => {
  return (
    <p
      className="introduction"
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
    />
  );
};

const TwitterWidgets = ({ id }: { id: string }) => {
  const elementRef = useCallback((element: HTMLDivElement) => {
    if (!element) {
      return;
    }
    reloadTwitterWidgets(element);
  }, []);

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
  );
};
