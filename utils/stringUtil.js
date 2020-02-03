/**
 * 改行コードをbrタグに変換する
 */
export const nl2br = (str) => {
  if (!str) return
  return str.replace(/[\n\r]/g, "<br />")
}
