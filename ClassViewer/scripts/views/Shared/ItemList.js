const ItemList = ({ items, layout = $layout.fill }) => ({
  type: "list",
  props: {
    id: "ItemList",
    data: items
  },
  layout,
  events: {}
})

module.exports = ItemList
