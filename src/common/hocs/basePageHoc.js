import React from "react"
import { Provider } from "react-redux"
import Head from "next/head"
import { Globals } from "../models"
import { initialize as initializeStore } from "../store"
import "../../styles/common.scss"

export default (Component, reducer) => {
  const BasePage = ({ initialState, ...props }) => {
    const store = initializeStore(reducer, initialState)
    Object.assign(Globals, props.globals)
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
    const store = initializeStore(reducer)
    // グローバル変数を初期化する
    let globals
    if (context.req) {
      globals = {
        env: context.req.env
      }
    } else {
      globals = { ...Globals }
    }
    // パスを取得する
    const paths = context.req.path.substring(1).split("/")
    let id = paths[1]
    // コンポーネントを初期化する
    const props = Component.getInitialProps
      ? await Component.getInitialProps({ ...context, store, globals, id })
      : {}
    return {
      ...props,
      globals,
      id,
      initialState: store.getState()
    }
  }
  return BasePage
}
