import React from "react";
import { css } from "@emotion/react";
import Head from "next/head";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import OgpTags from "@/components/common/OgpTags";
import PageHeading from "@/components/common/PageHeading";
import { SITE_NAME } from "@/constants";
import { renderMarkdown } from "@/utils/domUtil";

export default function Page() {
  return (
    <div>
      <Head>
        <title>CONTACT - {SITE_NAME}</title>
      </Head>
      <OgpTags
        url={`${process.env.NEXT_PUBLIC_BASE_URL}/contact`}
        ogType="article"
        title={`CONTACT - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header />
      <PageHeading>CONTACT</PageHeading>
      <section
        css={css`
          max-width: 980px;
          margin: 0 auto;
          padding: 24px;
          word-wrap: break-word;
        `}
      >
        {renderMarkdown(`
${new Date().getMonth() + 3}月以降の個人様、企業様からのご依頼お待ちしております！
※個人様の場合は [Skeb](https://skeb.jp/@atelier_kanata) からもご依頼いただけます。

## できること・やりたいこと
※「★」が付いているものはご依頼として制作した（または制作後に公式から採用いただいた）実績がございます。
付いていないものでも、同人等で制作経験がございます。
※基本的な作風などは [GALLERY](/gallery) 内の作品をご確認くださいませ。
- ★イラスト制作
  - ★全年齢
    - ★サムネイル
    - ★表紙イラスト
    - キービジュアル
    - ★アイコン、ヘッダー
    - ★立ち絵
  - ★R-18（ソフトなもの）
- キャラクターデザイン
- 漫画制作
  - 作画
  - ★着彩

## 主な実績
### 表紙イラスト
| Colorful Pops ReflePure |
| - |
| <img src="/images/works/colorful_pops_reflepure.webp" style="width:320px;"> |
### サムネイル
※直接のご依頼ではなく、ファンアートとして制作後に公式から採用いただけたものとなります。
| 大空スバル 様 | 風真いろは 様 |
| - | - |
| <iframe width="373" height="210" src="https://www.youtube.com/embed/UEUn7frEWLM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> | <iframe width="373" height="210" src="https://www.youtube.com/embed/U6k3ekRP23Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> |
### コミッション
| VTuber 恵比寿にゃん 様 | 陸上部の後輩 |
| - | - |
| <img src="/images/works/ebisunyan.webp" style="width:200px;"> | <img src="/images/works/rikujo.webp" style="width:200px;"> |

[クロスフォリオ](https://xfolio.jp/portfolio/atelier_kanata/free/81488)でもポートフォリオを随時更新しております。
※その他（同人イベント出展など）の実績は [WORKS](/works) をご覧くださいませ。
## 参考価格表（イラスト）
- 顔のみ（アイコンなど）: 5,000円～
- 全身（立ち絵など）: 10,000円～
- シチュエーションイラストなど: 15,000円～
  ※背景の有無、作画量、枚数、リテイク回数等によって変わります。

## お問い合わせ
ご検討いただきありがとうございます！
お問い合わせの際は以下の内容をご記載くださいませ。
- ご依頼の概要
  - 内容、用途、枚数（差分の有無）など
- ご希望の納期
- ご希望の予算

### 連絡先
- Twitter: [@atelier_kanata](https://twitter.com/atelier_kanata)
  ※DMからご連絡くださいませ。
- メール: atelier.kanata★gmail.com (お手数ですが★を@に置き換えてください)
        `)}
      </section>
      <Footer />
    </div>
  );
}
