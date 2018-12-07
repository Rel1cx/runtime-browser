const Settings = async () => ({
  type: "markdown",
  props: {
    content: "> Hello, *World!*"
  },
  layout: $layout.fill
})
module.exports = Settings
