import React from "react";
import { css } from "@emotion/react";
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import Script from "next/script";

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
        {/* Google Tag Manager */}
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_CONTAINER_ID}');
        `}
        </Script>
      </Head>
      <body
        css={css`
          font-family: "Cantarell", "M PLUS Rounded 1c", sans-serif;
          line-height: 1.2em;
        `}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_CONTAINER_ID}`}
            height="0"
            width="0"
            className=" hidden"
          ></iframe>
        </noscript>
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
