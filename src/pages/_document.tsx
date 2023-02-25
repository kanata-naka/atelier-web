import React from "react";
import { css } from "@emotion/react";
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cantarell&family=M+PLUS+Rounded+1c&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_FIREBASE_CONFIG_MEASUREMENT_ID}');
            `,
          }}
        />
      </Head>
      <body
        css={css`
          font-family: "Cantarell", "M PLUS Rounded 1c", sans-serif;
          line-height: 1.2em;
        `}
      >
        <Main />
        <NextScript />
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
        <div id="fb-root"></div>
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v6.0"
        ></script>
        <script async src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js" defer></script>
      </body>
    </Html>
  );
}

Document.getInitialProps = async function (ctx: DocumentContext) {
  const initialProps = await NextDocument.getInitialProps(ctx);
  return { ...initialProps };
};

export default Document;
