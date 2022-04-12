import React from "react";
import { AppContext, AppProps } from "next/app";
import Head from "next/head";
import { initializeFirebase } from "../common/api";
import RoutingEffect from "../common/components/RoutingEffect";
import { usePageview } from "../common/hooks";
import "../styles/style.scss";

const App = ({
  Component,
  isServer,
  pageProps,
}: AppProps & { isServer: boolean }) => {
  initializeFirebase(isServer);
  usePageview();
  return (
    <React.Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
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
      </Head>
      <div className="page-wrapper">
        <Component {...pageProps} />
      </div>
      <RoutingEffect.Component />
    </React.Fragment>
  );
};

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  const isServer = !!ctx.req;
  if (Component.getInitialProps) {
    initializeFirebase(isServer);
    pageProps = await Component.getInitialProps({ ...ctx });
  }
  return { isServer, pageProps };
};

export default App;
