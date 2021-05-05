const withSass = require("@zeit/next-sass")
const config = require("config")

module.exports = {
  ...withSass(),
  publicRuntimeConfig: {
    ENVIRONMENT: process.env.NODE_ENV,
    BASE_URL: config.get("baseUrl"),
    FIREBASE_CONFIG: config.get("firebase.config"),
    FIREBASE_REGION: config.get("firebase.region")
  }
}
