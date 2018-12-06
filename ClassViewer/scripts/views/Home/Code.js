const CodeView = () => ({
  type: "web",
  props: {
    id: "CodeView"
  },
  layout(make, view) {
    make.top.equalTo(view.prev.bottom).offset(5)
    make.left.right.inset(0)
    make.bottom.inset(5)
  }
})

module.exports = CodeView
