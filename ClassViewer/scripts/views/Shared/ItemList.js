const { renderCode } = require("../../utils")
const router = require("../../router")
const ItemList = ({ items, layout = $layout.fill }) => ({
  type: "list",
  props: {
    id: "ItemList",
    data: items.map((item) => ({
      label: {
        text: item
      }
    })),
    template: {
      props: {
        bgcolor: $color("clear")
      },
      views: [
        {
          type: "label",
          props: {
            id: "label",
            align: $align.center,
            bgcolor: $color("#fff"),
            textColor: $color("#555"),
            font: $font("iosevka", 18)
          },
          layout: $layout.fill
        }
      ]
    }
  },
  layout,
  events: {
    didSelect: function(sender, indexPath, data) {
      const methods = $objc(data.label.text).$__methodDescription()
      router.switch(0)
      renderCode(methods.rawValue().toString())
    }
  }
})

module.exports = ItemList
