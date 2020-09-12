import React from "react"
import Head from "next/head"
import { Globals, SITE_NAME } from "../common/models"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import OgpTags from "../common/components/OgpTags"

const Component = () => {
  return null
}

Component.getInitialProps = async ({ globals: { env }, res }) => {
  if (res) {
    // TODO noteにリダイレクトする
    res.writeHead(302, { Location: env.BLOG_URL })
    res.end()
  }
}

export default Component
