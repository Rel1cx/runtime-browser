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
            // bgcolor: $color("clear"),
            textColor: $color("#595959"),
            align: $align.center,
            font: $font("iosevka", 16)
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
      renderCode(methods.rawValue().toString())
      router.switch(0)
    }
  }
})

module.exports = ItemList
