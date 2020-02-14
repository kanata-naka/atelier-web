import React from "react"
import { Provider } from "react-redux"
import Head from "next/head"
import { initializeApi } from "../api"
import { Globals } from "../models"
import { initialize as initializeStore } from "../store"
import "../../styles/common.scss"

export default (Component, reducer) => {
  const BasePage = ({ initialState, isServer, globals, ...props }) => {
    const store = initializeStore(reducer, isServer, initialState)
    Object.assign(Globals, globals)
    return (
      <Provider store={store}>
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
          </Head>
          <div className="page-wrapper">
            <Component {...props} />
          </div>
        </div>
      </Provider>
    )
  }
  BasePage.getInitialProps = async context => {
    const isServer = !!context.req
    const store = initializeStore(reducer, isServer)
    // グローバル変数を初期化する
    let globals
    if (isServer) {
      globals = {
        env: context.req.env
      }
    } else {
      globals = Object.assign({}, Globals)
    }
    initializeApi(globals.env)
    // ページを初期化する
    const props = Component.getInitialProps
      ? await Component.getInitialProps({
          ...context,
          store,
          isServer,
          globals
        })
      : {}
    return {
      ...props,
      initialState: store.getState(),
      isServer,
      globals
    }
  }
  return BasePage
}
