import { useEffect, useCallback } from "react"
import Head from "next/head"
import Router from "next/router"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import ArtScroll from "../modules/gallery/components/ArtScroll"
import GalleryModal from "../modules/gallery/components/GalleryModal"
import { LIMIT } from "../modules/gallery/models"
import "../styles/gallery.scss"

const Component = ({ item, items }) => {
  useEffect(() => {
    if (item) {
      GalleryModal.open(item)
    }
  }, [])

  const onClose = useCallback(() => {
    // history.replaceState('','','/gallery')
    Router.push("/gallery")
  })

  return (
    <div>
      <Head>
        <title>{"GALLERY - カナタノアトリエ"}</title>
      </Head>
      <Header />
      <PageHeading>GALLERY</PageHeading>
      {item && <GalleryModal.Component onClose={onClose} />}
      {items && <ArtScroll items={items} />}
      <Footer />
    </div>
  )
}

Component.getInitialProps = async ({ store: { dispatch }, query, globals }) => {
  if (query.id) {
    const response = await callFunction({
      dispatch,
      name: "api-arts-getById",
      data: {
        id: query.id
      },
      globals
    })
    return {
      id: query.id,
      item: response.data
    }
  } else {
    try {
      const response = await callFunction({
        dispatch,
        name: "api-arts-get",
        data: {
          limit: LIMIT
        },
        globals
      })
      return {
        items: response.data.result
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default basePage(Component, {})
