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
※個人様の場合は基本的に [Skeb](https://skeb.jp/@atelier_kanata) にてご依頼いただければ幸いです。

## ご挨拶
イラストレーターの彼方（かなた）なかと申します。
かわいい女の子（いわゆる美少女系）のイラストを得意としております。

## ポートフォリオ
[ホームページ](/gallery)や[pixiv](https://www.pixiv.net/users/204608)、[クロスフォリオ](https://xfolio.jp/portfolio/atelier_kanata/)にてポートフォリオを随時更新しております。

## できること・やりたいこと
※「★」が付いているものはご依頼として制作した（または制作後に公式から採用いただいた）経験・実績がございます。
付いていないものでも、同人等で制作経験がございます。
- ★**イラスト制作**（全年齢、R-18（ソフトなもの））
  - ★サムネイル
  - ★表紙イラスト
  - ★アイコン、ヘッダー
  - ★立ち絵
  - キービジュアル
  - ★シチュエーションイラスト
- キャラクターデザイン
- 漫画制作
  - 作画
  - ★着彩

## 主な実績
### 表紙イラスト
40名近くが参加される合同誌の表紙を担当させていただきました。（「ふぁびこ」名義）
[【依頼】Colorful Pops ReflePure](https://atelier-kanata.jp/works/5fb04ad8-d08c-4cef-b7d2-092d29c5fbe8)
<img src="/images/works/colorful_pops_reflepure.webp" style="width:320px;">
### サムネイル
ASMR動画のサムネイル・動画内イラストを担当させていただきました。
[【依頼】ＡＳＭＲ・バイノーラル「めっちゃ応援してくれる後輩系女子ver.」他](https://atelier-kanata.jp/works/fef64131-3b99-4838-afaf-d76a326f5fd6)
| めっちゃ応援してくれる後輩系女子ver. |  めっちゃ甘やかしてくれる後輩系女子ver. |
| - | - |
| <iframe width="373" height="210" src="https://www.youtube.com/embed/nOCa-Z69mH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> | <iframe width="373" height="210" src="https://www.youtube.com/embed/XuDORiF9QnY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> |

直接のご依頼ではありませんが、ファンアートとして制作後にご本人から採用いただけた例もいくつかございます。
| 大空スバル 様 | 湊あくあ 様 | 風真いろは 様 |
| - | - | - |
| <iframe width="373" height="210" src="https://www.youtube.com/embed/UEUn7frEWLM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> | <iframe width="373" height="210" src="https://www.youtube.com/embed/c-VhJ6g6W7w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> | <iframe width="373" height="210" src="https://www.youtube.com/embed/U6k3ekRP23Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> |
### コミッション
| VTuber 恵比寿にゃん 様 | 陸上部の後輩 |
| - | - |
| <img src="/images/works/ebisunyan.webp" style="width:200px;"> | <img src="/images/works/rikujo.webp" style="width:200px;"> |

※その他（同人イベント出展など）の実績は[こちら](/works)もご覧ください。

## お問い合わせ先
- Twitter: [@atelier_kanata](https://twitter.com/atelier_kanata)
  ※DMからご連絡くださいませ。
- メール: atelier.kanata★gmail.com (お手数ですが★を@に置き換えてください)

**お問い合わせの際は以下の内容を必ずご記載ください。**
- ご依頼の概要
  - 内容、用途、枚数（差分の有無）など
- 予算
- 納期
- 実績としての掲載可否
  ※当ページなどにて掲載させていただけるか

### 注意事項
- DMやメールへは基本的に1、2営業日以内には必ず返信いたします。万が一返信がない場合はお手数ですが再送いただければ幸いです。
- 企業様からのご依頼の場合、基本的に著作権は譲渡いたします。
- 短納期（1ヶ月未満）、清書後の大きな修正（描き直しの発生する作業）については追加料金をいただく場合がございます。

ご検討のほどよろしくお願いいたします！
        `)}
      </section>
      <Footer />
    </div>
  );
}
