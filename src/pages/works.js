import { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { callFunction } from "../common/firebase"
import { PageHeading } from "../common/components/elements"
import Header from "../common/components/Header"
import Footer from "../common/components/Footer"
import Pagination from "../common/components/Pagination"
import { createPagination, getItemsByPage } from "../common/models"
import WorkList from "../modules/works/components/WorkList"
import {
  PER_PAGE,
  PAGE_NUMBER_DISPLAY_MAX_RANGE
} from "../modules/works/models"

const Component = ({ id, items }) => {
  const [itemsByPage, setItemsByPage] = useState([...items])
  const [pagination, setPagination] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (id) {
      setItemsByPage([...items])
      setPagination(null)
    } else {
      const page = +router.query.page || 1
      setItemsByPage(getItemsByPage(items, page, PER_PAGE))
      setPagination(createPagination(page, PER_PAGE, items.length))
    }
    scrollTo(0, 0)
  }, [id, items, router.query.page])

  return (
    <div>
      <Head>
        <title>{"WORKS - カナタノアトリエ"}</title>
      </Head>
      <Header />
      <PageHeading>WORKS</PageHeading>
      <WorkList items={itemsByPage} />
      {pagination && (
        <Pagination
          pagination={pagination}
          maxRange={PAGE_NUMBER_DISPLAY_MAX_RANGE}
        />
      )}
      <Footer />
    </div>
  )
}

Component.getInitialProps = async ({ query, globals }) => {
  if (query.id) {
    const response = await callFunction({
      name: "api-works-getById",
      data: {
        id: query.id
      },
      globals
    })
    return {
      id: query.id,
      items: [response.data]
    }
  } else {
    try {
      // 全件取得する
      // ※shallow routingで再読み込みを行わずにページングを実現するため
      const response = await callFunction({
        name: "api-works-get",
        data: {},
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

export default Component
