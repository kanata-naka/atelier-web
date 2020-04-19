import Document, { Html, Head, Main, NextScript } from "next/document"

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
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
    )
  }
}
