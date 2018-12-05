const ItemList = ({ items, layout = $layout.fill }) => ({
  type: "list",
  props: {
    id: "ItemList",
    data: items,
    font: $font("iosevka-bold")
  },
  layout,
  events: {}
})

module.exports = ItemList
