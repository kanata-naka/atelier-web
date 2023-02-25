import React from "react";
import { css, Global } from "@emotion/react";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { initializeFirebase } from "@/api/firebase";
import RoutingEffect from "@/components/common/RoutingEffect";
import { usePageview } from "@/hooks";
import { siteHeaderHeight } from "@/styles";
import "@/styles/reset.css";

function App({ Component, isServer, pageProps }: AppProps & { isServer: boolean }) {
  initializeFirebase(isServer);
  usePageview();
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      </Head>
      <Global
        styles={css`
          *,
          *:before,
          *:after {
            box-sizing: border-box;
          }

          .no-scroll {
            overflow: hidden;
          }
        `}
      />
      <div
        css={css`
          position: absolute;
          top: ${siteHeaderHeight}px;
          right: 0;
          left: 0;
        `}
      >
        <Component {...pageProps} />
      </div>
      <RoutingEffect />
    </>
  );
}

App.getInitialProps = async function ({ Component, ctx }: AppContext) {
  let pageProps = {};
  const isServer = !!ctx.req;
  if (Component.getInitialProps) {
    initializeFirebase(isServer);
    pageProps = await Component.getInitialProps({ ...ctx });
  }
  return { isServer, pageProps };
};

export default App;
