/** URLの正規表現 */
const URL_PATTERN = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

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

/**
 * 作品、イラストの説明を表示用に整形する
 */
export const styleDescription = content => {
  if (!content) return
  // 改行コードをbrタグに変換する
  let result = nl2br(content)
  // URLからリンクを生成する
  result = createLinkFromUrl(result)
  return result
}
