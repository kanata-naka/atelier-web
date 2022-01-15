const config = require("config")
const path = require('path')

module.exports = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  publicRuntimeConfig: {
    ENVIRONMENT: process.env.NODE_ENV,
    BASE_URL: config.get("baseUrl"),
    FIREBASE_CONFIG: config.get("firebase.config"),
    FIREBASE_REGION: config.get("firebase.region")
  }
}
