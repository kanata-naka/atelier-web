const config = require("config")
const next = require("next")
const express = require("express")

const dev = process.env.NODE_ENV !== "production"
const app = next({dev})
const handle = (req, res) => {
  // 環境設定
  req.env = {
    ENVIRONMENT: process.env.NODE_ENV,
    API_BASE_URL: config.get("api.baseUrl"),
    FIREBASE_API_KEY: config.get("firebase.apiKey"),
    FIREBASE_AUTH_DOMAIN: config.get("firebase.authDomain"),
    FIREBASE_PROJECT_ID: config.get("firebase.projectId"),
    FIREBASE_REGION: config.get("firebase.region")
  }
  return app.getRequestHandler()(req, res)
}

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => {
    console.log('Current path: ' + req.path)
    return handle(req, res)
  })

  server.listen(8080, error => {
    if (error) {
      throw error
    }
    console.log("> Ready on http://localhost:8080")
  })
})
