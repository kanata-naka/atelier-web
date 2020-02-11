const URL_PATTERN = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

export const decorateText = content => {
  if (!content) return
  let result = nl2br(content)
  result = createLinkFromUrl(result)
  return result
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
