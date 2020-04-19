const config = require("config")
const next = require("next")
const express = require("express")

const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const server = express()
server.use(function (req, res, next) {
  console.log('Current path: ' + req.path)
  // 環境設定
  req.env = {
    ENVIRONMENT: process.env.NODE_ENV,
    BASE_URL: config.get("baseUrl"),
    API_BASE_URL: config.get("api.baseUrl"),
    FIREBASE_API_KEY: config.get("firebase.apiKey"),
    FIREBASE_AUTH_DOMAIN: config.get("firebase.authDomain"),
    FIREBASE_PROJECT_ID: config.get("firebase.projectId"),
    FIREBASE_REGION: config.get("firebase.region"),
    BLOG_BASE_URL: config.get("blog.baseUrl"),
  }
  next()
})

;["works", "gallery"].forEach((page) => {
  server.get(`/${page}/:id`, (req, res) => {
    return app.render(req, res, `/${page}`, { id: req.params.id })
  })
})

server.get('*', (req, res) => {
  return app.getRequestHandler()(req, res)
})

app.prepare().then(() => {
  server.listen(8080, error => {
    if (error) {
      throw error
    }
    console.log("> Ready on http://localhost:8080")
  })
})
