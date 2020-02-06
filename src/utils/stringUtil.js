const URL_PATTERN = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi

/**
 * 文中の改行コードをbrタグに変換する
 */
export const nl2br = content => {
  if (!content) {
    return
  }
  return content.replace(/[\n\r]/g, "<br />")
}

/**
 * 文中のURLをリンクに置き換える
 */
export const createLinkFromUrl = content => {
  if (!content) {
    return
  }
  return content.replace(
    URL_PATTERN,
    '<a class="link--normal" href="$1">$1</a>'
  )
}
