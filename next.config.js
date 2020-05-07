const withSass = require("@zeit/next-sass")
const config = require("config")

module.exports = {
  ...withSass(),
  serverRuntimeConfig: {
    ENVIRONMENT: process.env.NODE_ENV,
    BASE_URL: config.get("baseUrl"),
    API_BASE_URL: config.get("api.baseUrl"),
    FIREBASE_API_KEY: config.get("firebase.apiKey"),
    FIREBASE_AUTH_DOMAIN: config.get("firebase.authDomain"),
    FIREBASE_PROJECT_ID: config.get("firebase.projectId"),
    FIREBASE_REGION: config.get("firebase.region"),
    BLOG_URL: config.get("blog.url")
  }
}
