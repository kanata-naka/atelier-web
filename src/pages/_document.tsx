import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
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
        <body>
          <Main />
          <NextScript />
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          />
          <div id="fb-root"></div>
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/ja_JP/sdk.js#xfbml=1&version=v6.0"></script>
          <script
            async
            src="https://d.line-scdn.net/r/web/social-plugin/js/thirdparty/loader.min.js"
            defer></script>
        </body>
      </Html>
    );
  }
}
