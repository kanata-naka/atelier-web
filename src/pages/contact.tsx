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

          h2 {
            margin: 36px -24px;
            padding: 12px 24px;
            font-size: 24px;
            font-weight: bold;
            line-height: 24px;
            color: #0f165a;
            background-color: #eff0ff;
          }

          hr {
            margin: 36px -24px;
          }
        `}
      >
        {renderMarkdown(`
現在 <big>**2025年5月**</big> 以降着手のご依頼を受付中です！

## お取引の流れ
1. 打ち合わせ
  ご依頼用テンプレートにご記入いただいた内容からお見積りいたします。
2. 大ラフの提出
  2～4案ほど提示いたしますので、どれか1つお選びいただくか、構図はAでポーズはBのような形でお申し付けください。
  ※構図、ポーズ、表情、衣装などを明確にご指定いただいている、または短納期の場合、省略させていただきます。
3. 詳細ラフ（色ラフ）の提出
  構図、ポーズなどの修正はラフの時点でお申し付けください。
  ※ラフ提出後のキャンセルは見積もり料金の50%を頂戴します。
4. 清書の提出
  清書後は着彩、表情などの軽微な修正のみ対応可能です。
6. お支払い
  基本的には銀行振込またはPayPal（主に海外の方向け）でお願いいたします。
  その他の方法をご希望の場合はご相談ください。
5. 納品🎉

## お問い合わせ先
- Twitter: [@atelier_kanata](https://twitter.com/atelier_kanata)
  ※DMからご連絡くださいませ。
- メール: <a href="mailto:atelier.kanata@gmail.com">atelier.kanata@gmail.com</a>

コミッションサイトからのご依頼もお受けしております。
- Skeb: https://skeb.jp/@atelier_kanata
- pixivリクエスト: https://www.pixiv.net/users/204608/request
- ココナラ: https://coconala.com/users/4660403
- SKIMA: https://skima.jp/profile?id=416766

**ご依頼の際はお手数ですが以下の内容をご記入いただければ幸いです。**
~~~~
■ ご依頼用テンプレート
【用途】
【サイズ】
  縦・横の長さなど
【キャラクターの人数】
【背景・小物の有無】
【差分の有無】
【詳細】
  キャラクターの描写範囲（バストアップ、膝上、全身など）、頭身、表情、服装、ポーズ、シチュエーションなど
  背景・小物、差分をご希望の場合はその詳細もお願いします
  参考画像や写真などございましたら併せてご提示ください
【ご予算】
  未定の場合はご記入いただいた内容からお見積もりいたします
【ご希望の納期】
【納品形式】
  ファイル形式（PSDの場合はレイヤーの分け方も）、解像度など
【実績の公開可否】本ページやSNS、ホームページ等で実績として掲載して問題ないか
  お披露目後の公開などのご希望がございましたらその旨もご記載ください
【活動名・URL（任意）】実績公開可の場合、同時に宣伝させていただきます
~~~~

※DMやメールへは基本的に1、2営業日以内には必ず返信いたします。万が一返信がない場合はお手数ですが再送いただければ幸いです。

お取引にあたっては迅速で丁寧なやり取りを心がけております。
ご質問・ご相談などございましたらお気軽にお問い合わせくださいませ！
ご希望に添えるよう誠心誠意努めますので、何卒よろしくお願いいたします。

----

## ご挨拶
イラストレーターのかなたなかと申します。
かわいくてときめくような美少女キャラのイラストが得意です！
キャラクターの魅力を最大限に引き出す絵作りを意識しております。

## 主な実績
- VTuber様の立ち絵、グッズ、サムネイル、SDキャラなどのイラストを担当させていただきました。
  - cozoru所属 本城小百合様 立ち絵
  - ライブナウV所属 悪宮ゆずりは様 立ち絵
  - みーちゃ様 グッズ、サムネイルイラスト
  - 鳳梨パイン様 サムネイルイラスト
  - 詩優レモナ様 バースデーイラスト
    etc.
- 大手企業VTuber様の配信のサムネイルにも度々ファンアートを採用いただいております。※直接のご依頼ではございません<br />
  <iframe src="https://www.youtube.com/embed/UEUn7frEWLM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <!-- <iframe src="https://www.youtube.com/embed/c-VhJ6g6W7w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
  <iframe src="https://www.youtube.com/embed/U6k3ekRP23Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe src="https://www.youtube.com/embed/AmJbAWcwZTo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe src="https://www.youtube.com/embed/_40VsbvFKuk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe src="https://www.youtube.com/embed/QUbBJhhrU60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
  <iframe src="https://www.youtube.com/embed/0RG5AxPcRCQ?si=fp7dMudcvkUCw5b-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
- 企業案件としてゲームのキャラクターデザイン、立ち絵、CG（差分あり）を担当させていただきました。（別名義）
- 40名近くが参加する合同誌の表紙を担当させていただきました。
- 漫画の表紙や本文の着彩、アシスタントの経験もございます。
  - くじらじーお様 <a href="https://manga.nicovideo.jp/comic/63373">異世界最高峰のギルドリーダー</a>
    etc.
- ※その他（同人イベント出展など）の実績は[こちら](/works)もご覧ください。

## その他
- これまで公開、納品しました全ての作品におきまして「生成AI」は一切使用しておりません。
  必要に応じて未統合のPSDやCLIPファイルなど制作過程を証明できる形式での提出、納品が可能です。
- 背景等で素材を利用する場合も、権利関係や商用利用の可否などを確認した上で採用しております。
        `)}
      </section>
      <Footer />
    </div>
  );
}
