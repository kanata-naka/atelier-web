const path = require("path")
const config = require("config")
const next = require("next")
const express = require("express")
const functions = require("firebase-functions")

const dev = process.env.NODE_ENV !== "production"
const app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/build` }
})
const server = express()
server.use(function(req, res, next) {
  // 環境設定
  req.env = {
    ENVIRONMENT: process.env.NODE_ENV,
    API_BASE_URL: config.get("api.baseUrl"),
    FIREBASE_API_KEY: config.get("firebase.apiKey"),
    FIREBASE_AUTH_DOMAIN: config.get("firebase.authDomain"),
    FIREBASE_PROJECT_ID: config.get("firebase.projectId"),
    FIREBASE_REGION: config.get("firebase.region")
  }
  next()
})
;["works", "gallery"].forEach(page => {
  server.get(`/${page}/:id`, (req, res) => {
    return app.render(req, res, `/${page}`, { id: req.params.id })
  })
})

server.get("*", (req, res) => {
  return app.getRequestHandler()(req, res)
})

exports.app = functions.https.onRequest((req, res) => {
  // Log the page.js file that is being requested.
  console.log("File: " + req.originalUrl)

  return app.prepare().then(() => {
    server(req, res)
  })
})
