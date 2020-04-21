/**
 * Twitterのウィジェットを初期化する
 */
export const reloadTwitterWidgets = element => {
  try {
    if (typeof twttr !== "undefined") {
      twttr.widgets.load(element)
      console.log("Reloaded Twitter widgets.")
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * Facebookのウィジェットを初期化する
 */
export const reloadFacebookWidgets = element => {
  try {
    if (typeof FB !== "undefined") {
      FB.XFBML.parse(element)
      console.log("Reloaded Facebook widgets.")
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * LINEのシェアボタンを初期化する
 */
export const reloadLINEItButtons = () => {
  try {
    if (typeof LineIt !== "undefined") {
      LineIt.loadButton()
      console.log("Reloaded LINE widgets.")
    }
  } catch (error) {
    console.error(error)
  }
}
