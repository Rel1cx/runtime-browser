const getHTML = (code) =>
  `<html><meta name="viewport" content="user-scalable=no" /><link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/agate.min.css'><style>*{margin:0;padding:0;}pre{font-size:18px;}</style><script src='https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js'></script><script>hljs.initHighlightingOnLoad();</script><body class='hljs'><pre><code class='hljs'>${code}</code></pre></body></html>`

function renderCode(text) {
  if (!text) {
    return
  }
  const code = text
    .replace(/[\u00A0-\u9999<>&]/gim, (i) => `&#${i.charCodeAt(0)};`)
    .replace(/\t/g, "  ")
    .replace(/\s\(0x\w+\)/g, "")
    .replace(/(\nin[^\n]+?:)/g, "\n\n$1")
  $("CodeView").html = getHTML(code)
}

async function getInputHistory() {
  const items = (await $cache.getAsync({ key: "history" })) || []
  return items
}

async function setInputHistory(className) {
  const items = await getInputHistory()
  if (items.find((x) => x === className)) {
    return
  }
  const res = await $cache.setAsync({
    key: "history",
    value: [className, ...items]
  })
  console.log(res)
  $("ItemList").data = res
}

module.exports = {
  getHTML,
  renderCode,
  getInputHistory,
  setInputHistory
}
