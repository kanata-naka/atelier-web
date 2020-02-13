const config = require("config")
const functions = require("firebase-functions")
const indexPage = require("./build/serverless/pages/index")
const worksPage = require("./build/serverless/pages/works")

exports.index = functions.https.onRequest((request, response) => {
  request.env = {
    // 環境設定
    API_BASE_URL: config.get("api.baseUrl")
  }
  indexPage.render(request, response)
})

exports.works = functions.https.onRequest((request, response) => {
  request.env = {
    // 環境設定
    API_BASE_URL: config.get("api.baseUrl")
  }
  worksPage.render(request, response)
})
