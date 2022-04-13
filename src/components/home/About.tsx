import React, { FC, useCallback } from "react";
import { SITE_DESCRIPTION, TWITTER_USERNAME } from "../../constants";
import {
  AUTHOR_NAME,
  INTRODUCTION,
  SOCIAL_ACCOUNTS,
} from "../../constants/home";
import { SocialAccount } from "../../types";
import { reloadTwitterWidgets } from "../../utils/vendorUtil";
import { SectionHeading } from "../common/elements";

const About: FC = () => {
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

const ProfileImage: FC<{ url: string }> = ({ url }) => {
  return (
    <figure className="profile-image">
      <img className="profile-image__image" alt="プロフィール画像" src={url} />
    </figure>
  );
};

const AuthorName: FC = ({ children }) => {
  return <h3 className="author-name">{children}</h3>;
};

const SocialIcons: FC<{ accounts: SocialAccount[] }> = ({ accounts }) => {
  return (
    <ul className="social-icons">
      {accounts.map((account, index) => (
        <SocialIcon key={index} account={account} />
      ))}
    </ul>
  );
};

const SocialIcon: FC<{ account: SocialAccount }> = ({ account }) => {
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

const Introduction: FC<{ content: string }> = ({ content }) => {
  return (
    <p
      className="introduction"
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
    />
  );
};

const TwitterWidgets: FC<{ id: string }> = ({ id }) => {
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

export default About;
