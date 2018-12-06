const InputView = require("../views/Home/Input")
const CodeView = require("../views/Home/Code")

const HomeScreen = async () => ({
  props: {
    type: "view",
    id: "Home",
    title: "Class Viewer"
  },
  views: [InputView(), CodeView()],
  layout: $layout.fill,
  events: {
    appeared() {
      $("InputView").focus()
    }
  }
})

module.exports = HomeScreen
