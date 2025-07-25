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
<big>**2025年9月**</big> 以降のご依頼を受付中です！
※短納期でも対応可能な場合がございますのでご気軽にご相談ください！

## 料金表 (個人様、活動者様向け)
- キャラクター: 1体につき
  - 顔アップ（アイコン）: 10,000円
  - バストアップ: 20,000円
  - 膝上: 28,000円
  - 全身（立ち絵）: 32,000円
- 背景: 10,000円
  ※単色やシンプルな模様であれば無料でお受けいたします。
- 小物・装飾（複雑なもの）: 1個につき 3,000円
- 差分: 1点につき 3,000円
- 商用利用: 10,000円

※全体を通して2回まで無料で修正いたします。3回目以降は1回につき1,000円頂戴いたします。

## お取引の流れ
1. 打ち合わせ
  ご依頼用テンプレートにご記入いただいた内容からお見積りいたします。
2. 大ラフの提出
  2～4案ほど提示いたしますので、どれか1つお選びいただくか、構図はAでポーズはBのような形でお申し付けください。
  ※構図、ポーズ、表情、衣装などを明確にご指定いただいている、または短納期の場合、省略させていただきます。
3. 詳細ラフ（色ラフ）の提出
  構図、ポーズなどの修正はこの時点までにお申し付けください。
  ※ラフ提出後のキャンセルは見積もり料金の50%を頂戴します。
4. 清書の提出
  清書後は着彩、表情などの軽微な修正のみ対応可能です。
6. お支払い
  基本的には銀行振込、PayPay、PayPal（海外の方向け）のいずれかでお願いいたします。
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
※手数料がかかる分直接のご依頼よりも価格を高めに設定しております。ご了承くださいませ。

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
かわいくて心ときめくような美少女キャラのイラストが得意です！
キャラクターの魅力を最大限に引き出す絵作りを意識しております。

## 主な実績
- VTuber様の立ち絵（キャラクターデザイン）を担当させていただきました。
  - cozoru所属 本城小百合様、暁兎苺様、優音様、東雲茜様
  - ライブナウV所属 悪宮ゆずりは様、猫宮とあ様
  - BUBBLE所属 水無月鏡花様
- VTuber様のグッズ、サムネイルなどのイラストを担当させていただきました。
  - みーちゃ様 グッズイラスト
  - 鳳梨パイン様 歌ってみた サムネイルイラスト
  - 詩優レモナ様 1周年記念イラスト
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
- 80名近くが参加するイベントのポスターイラストを担当させていただきました。
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
