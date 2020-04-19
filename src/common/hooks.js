import { useEffect } from "react"

export const useShareButtons = () => {
  // シェアボタンを表示するために外部スクリプトを読み込んでいるが、
  // 動的に遷移した際にそのスクリプトが再実行されず、ボタンが表示されない
  // →DOMの読み込みが完了したタイミングで直接実行する
  useEffect(() => {
    reloadShareButtons()
  }, [])
}

export const reloadShareButtons = () => {
  try {
    // Twitter
    if (typeof twttr !== "undefined") {
      twttr.widgets.load()
      console.log("Reloaded Twitter widgets.")
    }
  } catch (error) {
    console.error(error)
  }
  try {
    // Facebook
    if (typeof FB !== "undefined") {
      FB.XFBML.parse()
      console.log("Reloaded Facebook widgets.")
    }
  } catch (error) {
    console.error(error)
  }
  try {
    // LINE
    if (typeof LineIt !== "undefined") {
      LineIt.loadButton()
      console.log("Reloaded LINE widgets.")
    }
  } catch (error) {
    console.error(error)
  }
}
