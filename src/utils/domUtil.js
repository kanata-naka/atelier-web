/** URLの正規表現 */
const URL_PATTERN = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

/**
 * メディアクエリを判定する
 */
export const matchesMediaQuery = mediaQuery => {
  if (typeof window === "undefined") {
    return
  }
  return window.matchMedia(mediaQuery).matches
}

/**
 * 改行コードをbrタグに変換する
 */
export const nl2br = content => {
  if (!content) return
  return content.replace(/[\n\r]/g, "<br />")
}

/**
 * URLからリンクを生成する
 */
export const createLinkFromUrl = content => {
  if (!content) return
  return content.replace(
    URL_PATTERN,
    '<a class="link--normal" href="$1">$1</a>'
  )
}

export const createDescriptionHtml = content => {
  if (!content) return
  // 改行コードをbrタグに変換する
  let result = nl2br(content)
  // URLからリンクを生成する
  result = createLinkFromUrl(result)
  return result
}

/**
 * ページの最後までスクロールした際の位置を取得する
 */
export const getOffsetScrolledToBottom = () => {
  if (typeof window === "undefined") {
    return
  }
  // ページ全体の高さを取得する
  // ※ブラウザ間の差異をカバーする
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
  return pageHeight - window.innerHeight
}

/**
 * 現在のスクロール位置を取得する
 */
export const getCurrentScrollTop = () => {
  if (typeof window === "undefined") {
    return
  }
  return window.pageYOffset || document.documentElement.scrollTop
}
