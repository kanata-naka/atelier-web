import React from "react"
import { Provider } from "react-redux"
import App from "next/app"
import Head from "next/head"
import { initializeFirebase } from "../common/firebase"
import { Globals } from "../common/models"
import { initialize as initializeStore } from "../common/store"
import RoutingEffect from "../common/components/RoutingEffect"

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    const isServer = !!ctx.req
    const store = initializeStore(isServer)
    // グローバル変数を初期化する
    let globals
    if (isServer) {
      globals = {
        env: ctx.req.env
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
        store,
        globals
      })
    }
    return {
      isServer,
      initialState: store.getState(),
      globals,
      pageProps
    }
  }

  constructor(props) {
    super(props)
    const { isServer, initialState, globals } = props
    this.store = initializeStore(isServer, initialState)
    // グローバル変数をマージする
    Object.assign(Globals, globals)
    initializeFirebase(Globals.env)
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={this.store}>
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
        </Head>
        <RoutingEffect.Component />
        <div className="page-wrapper">
          <Component {...pageProps} />
        </div>
      </Provider>
    )
  }
}
