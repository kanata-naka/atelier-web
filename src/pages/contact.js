import React from "react"
import Head from "next/head"
import { SITE_NAME } from "../common/models"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import OgpTags from "../common/components/OgpTags"

const Component = ({ globals: { env } }) => {
  return (
    <div>
      <Head>
        <title>CONTACT - {SITE_NAME}</title>
      </Head>
      <OgpTags
        path="/contact"
        ogType="article"
        title={`CONTACT - ${SITE_NAME}`}
        twitterCard="summary_card"
      />
      <Header blogUrl={env.BLOG_URL} />
      <div className="under-construction">{"UNDER CONSTRUCTION"}</div>
      <Footer />
    </div>
  )
}

export default Component
