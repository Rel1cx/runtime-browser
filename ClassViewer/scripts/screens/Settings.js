const Settings = async () => ({
  type: "text",
  props: {
    id: "Text",
    hidden: true,
    text: "Hello, World!\n\nThis is a demo for Text View in JSBox extension!\n\nCurrently we don't support attributed string in iOS.\n\nYou can try html! Looks pretty cool."
  },
  layout: $layout.fill
})
module.exports = Settings
