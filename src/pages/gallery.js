import { useEffect, useCallback } from "react"
import Head from "next/head"
import Router from "next/router"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import basePage from "../common/hocs/basePage"
import TagsInfo from "../modules/gallery/components/TagsInfo"
import ArtScroll from "../modules/gallery/components/ArtScroll"
import GalleryModal from "../modules/gallery/components/GalleryModal"
import { LIMIT } from "../modules/gallery/models"
import "../styles/gallery.scss"

const Component = ({ item, allTagsInfo, tag, items, fetchedAll }) => {
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
      {allTagsInfo && <TagsInfo tagsInfo={allTagsInfo} />}
      {item && <GalleryModal.Component onClose={onClose} />}
      {items && <ArtScroll tag={tag} items={items} fetchedAll={fetchedAll} />}
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
    // 全てのタグとその件数を取得する
    let allTagsInfo = {}
    try {
      const response = await callFunction({
        dispatch,
        name: "api-arts-getAllTagsInfo",
        data: {},
        globals
      })
      allTagsInfo = response.data
    } catch (error) {
      console.error(error)
    }
    // イラスト一覧（最初の${LIMIT}件）を取得する
    let items = []
    let fetchedAll = false
    try {
      const response = await callFunction({
        dispatch,
        name: "api-arts-get",
        data: {
          limit: LIMIT,
          tag: query.tag
        },
        globals
      })
      items = response.data.result
      fetchedAll = response.data.fetchedAll
    } catch (error) {
      console.error(error)
    }
    return {
      allTagsInfo,
      tag: query.tag,
      items,
      fetchedAll
    }
  }
}

export default basePage(Component)
