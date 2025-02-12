import React, { useCallback, ReactNode } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import SectionHeading from "@/components/common/SectionHeading";
import { AUTHOR_NAME, INTRODUCTION, SITE_DESCRIPTION, SOCIAL_ACCOUNTS, TWITTER_USERNAME } from "@/constants";
import { responsiveBoundaryWidth } from "@/styles";
import { SocialAccount } from "@/types";
import { reloadTwitterWidgets } from "@/utils/vendorUtil";

function About() {
  return (
    <section
      id="about"
      css={css`
        text-align: center;

        @media (min-width: ${responsiveBoundaryWidth + 1}px) {
          width: 414px;
          padding: 0 8px;
        }
      `}
    >
      <SectionHeading>ABOUT</SectionHeading>
      <Description content={SITE_DESCRIPTION}></Description>
      <ProfileImage url="/images/profile-image.png" />
      <AuthorName>{AUTHOR_NAME}</AuthorName>
      <SocialIcons accounts={SOCIAL_ACCOUNTS} />
      <Introduction content={INTRODUCTION} />
      <TwitterWidgets id={TWITTER_USERNAME} />
    </section>
  );
}

function Description({ content }: { content: string }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
      css={css`
        padding: 0 12px 24px;
        font-size: 14px;
      `}
    ></p>
  );
}

function ProfileImage({ url }: { url: string }) {
  return (
    <figure
      css={css`
        width: 100px;
        height: 100px;
        margin: 0 auto;
        overflow: hidden;
        border: 1px solid lightgray;
        border-radius: 50%;
      `}
    >
      <Image src={url} width={100} height={100} alt="プロフィール画像" />
    </figure>
  );
}

function AuthorName({ children }: { children: ReactNode }) {
  return (
    <h3
      css={css`
        padding: 24px 0 0;
        font-size: 24px;
        line-height: 24px;
      `}
    >
      {children}
    </h3>
  );
}

function SocialIcons({ accounts }: { accounts: SocialAccount[] }) {
  return (
    <ul
      css={css`
        display: flex;
        justify-content: center;
        padding: 24px 0;
      `}
    >
      {accounts.map((account, index) => (
        <SocialIcon key={index} account={account} />
      ))}
    </ul>
  );
}

function SocialIcon({ account }: { account: SocialAccount }) {
  return (
    <li
      css={css`
        display: flex;
        align-items: center;
        transition: opacity 250ms;

        &:hover {
          opacity: 0.8;
        }

        &:not(:first-child) {
          margin-left: 12px;
        }
      `}
    >
      <a
        href={account.url}
        css={css`
          position: relative;
          display: block;
          width: 24px;
          height: 24px;
        `}
      >
        <Image
          src={account.imageUrl}
          fill
          alt={account.name}
          css={css`
            object-fit: contain;
          `}
        />
      </a>
    </li>
  );
}

function Introduction({ content }: { content: string }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: content.replace(/\n/g, "<br />"),
      }}
      css={css`
        padding: 24px 12px;
        font-size: 12px;
        background-color: #ecf0ff;

        a {
          color: #4c4c4c;
          text-decoration: none;

          :hover {
            text-decoration: underline;
          }
        }
      `}
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
    <div
      ref={elementRef}
      css={css`
        width: 320px;
        margin: 24px auto;
      `}
    >
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
