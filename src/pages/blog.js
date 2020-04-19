import React from "react"
import Head from "next/head"
import { SITE_NAME } from "../common/models"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import OgpTags from "../common/components/OgpTags"

const Component = () => {
  return (
    <div>
      <Head>
        <title>BLOG - {SITE_NAME}</title>
      </Head>
      <OgpTags
        path="/blog"
        ogType="blog"
        title={`BLOG - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header blogUrl={env.BLOG_URL} />
      <div className="under-construction">{"UNDER CONSTRUCTION"}</div>
      <Footer />
    </div>
  )
}

Component.getInitialProps = async ({ globals: { env }, res }) => {
  if (res) {
    // TODO noteにリダイレクトする
    res.writeHead(302, { Location: env.BLOG_URL })
    res.end()
  }
}

export default Component
