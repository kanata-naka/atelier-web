const withSass = require("@zeit/next-sass")

module.exports = {
  ...withSass(),
  distDir: "dist/functions/build",
  target: 'serverless'
}
