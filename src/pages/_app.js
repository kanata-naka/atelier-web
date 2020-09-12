import App from "next/app"
import Head from "next/head"
import getConfig from "next/config"
import { initializeFirebase } from "../common/firebase"
import { Globals } from "../common/models"
import RoutingEffect from "../common/components/RoutingEffect"
import "../styles/style.scss"

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req
    // グローバル変数を初期化する
    let globals
    if (isServer) {
      globals = {
        env: getConfig().serverRuntimeConfig
      }
    } else {
      globals = Object.assign({}, Globals)
    }
    initializeFirebase(globals.env)
    // ページを初期化する
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...ctx,
        isServer,
        globals
      })
    }
    return {
      isServer,
      globals,
      pageProps
    }
  }

  constructor(props) {
    super(props)
    const { globals } = props
    // グローバル変数をマージする
    Object.assign(Globals, globals)
    initializeFirebase(Globals.env)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <div>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
      </div>
    )
  }
}
