import { useEffect, useCallback } from "react"
import Head from "next/head"
import Router from "next/router"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import TagInfo from "../modules/gallery/components/TagInfo"
import ArtScroll from "../modules/gallery/components/ArtScroll"
import GalleryModal from "../modules/gallery/components/GalleryModal"
import { LIMIT } from "../modules/gallery/models"

const Component = ({ item, tagInfo, tag, items, fetchedAll }) => {
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
      {tagInfo && <TagInfo tagInfo={tagInfo} />}
      {item && <GalleryModal.Component onClose={onClose} />}
      {items && <ArtScroll tag={tag} items={items} fetchedAll={fetchedAll} />}
      <Footer />
    </div>
  )
}

Component.getInitialProps = async ({ query, globals }) => {
  if (query.id) {
    const response = await callFunction({
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
    let tagInfo = {}
    try {
      const response = await callFunction({
        name: "api-tagInfo-get",
        data: { category: "arts" },
        globals
      })
      tagInfo = response.data.info
    } catch (error) {
      console.error(error)
    }
    // イラスト一覧（最初の${LIMIT}件）を取得する
    let items = []
    let fetchedAll = false
    try {
      const response = await callFunction({
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
      tagInfo,
      tag: query.tag,
      items,
      fetchedAll
    }
  }
}

export default Component
