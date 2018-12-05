const CodeView = () => ({
  type: "web",
  props: {
    id: "CodeView",
    style: "pre{white-space:pre-wrap;white-space:-pre-wrap;word-wrap:break-word;}"
  },
  layout(make, view) {
    const pre = view.prev
    make.top.equalTo(pre.bottom).offset(5)
    make.bottom.left.right.inset(0)
  }
})

module.exports = CodeView
