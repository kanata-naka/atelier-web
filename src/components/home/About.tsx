import React, { useCallback, ReactNode } from "react";
import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import { AUTHOR_NAME, INTRODUCTION, SITE_DESCRIPTION, SOCIAL_ACCOUNTS, TWITTER_USERNAME } from "@/constants";
import { SocialAccount } from "@/types";
import { reloadTwitterWidgets } from "@/utils/vendorUtil";

function About() {
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
}

function Description({ children }: { children: ReactNode }) {
  return <p className="description">{children}</p>;
}

function ProfileImage({ url }: { url: string }) {
  return (
    <figure className="profile-image">
      <Image className="profile-image__image" src={url} width={100} height={100} alt="プロフィール画像" />
    </figure>
  );
}

function AuthorName({ children }: { children: ReactNode }) {
  return <h3 className="author-name">{children}</h3>;
}

function SocialIcons({ accounts }: { accounts: SocialAccount[] }) {
  return (
    <ul className="social-icons">
      {accounts.map((account, index) => (
        <SocialIcon key={index} account={account} />
      ))}
    </ul>
  );
}

function SocialIcon({ account }: { account: SocialAccount }) {
  return (
    <li className="social-icons-item">
      <a href={account.url}>
        <Image className="social-icons-item__image" src={account.imageUrl} fill alt={account.name} />
      </a>
    </li>
  );
}

function Introduction({ content }: { content: string }) {
  return (
    <p
      className="introduction"
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
    />
  );
}

function TwitterWidgets({ id }: { id: string }) {
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
        href={`https://twitter.com/${id}?ref_src=twsrc%5Etfw`}
      >
        {`Tweets by ${id}`}
      </a>
    </div>
  );
}

export default About;
