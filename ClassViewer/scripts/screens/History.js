const { getInputHistory } = require("../utils")
const ItemList = require("../views/Shared/ItemList")

const History = async () => ({
  props: {
    id: "History",
    title: "",
    hidden: true
  },
  views: [
    ItemList({
      items: await getInputHistory(),
      layout: (make) => {
        make.bottom.inset(40)
        make.left.top.right.inset(0)
      }
    })
  ],
  layout: $layout.fill
})

module.exports = History
