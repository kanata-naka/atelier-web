const config = require("config")
const functions = require("firebase-functions")

const handle = (page) => {
  return functions.https.onRequest((request, response) => {
    // 環境設定
    request.env = {
      ENVIRONMENT: process.env.NODE_ENV,
      API_BASE_URL: config.get("api.baseUrl"),
      FIREBASE_API_KEY: config.get("firebase.apiKey"),
      FIREBASE_AUTH_DOMAIN: config.get("firebase.authDomain"),
      FIREBASE_PROJECT_ID: config.get("firebase.projectId"),
      FIREBASE_REGION: config.get("firebase.region")
    }
    page.render(request, response)
  })
}

// /
exports.index = handle(require("./build/serverless/pages/index"))
// /blog/**
// exports.blog = handle(require("./build/serverless/pages/blog"))
// /works
exports.works = handle(require("./build/serverless/pages/works"))
// /gallery/**
// exports.gallery = handle(require("./build/serverless/pages/gallery"))
