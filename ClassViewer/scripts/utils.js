const getHTML = (code) => {
  if (!/^<NSObject: 0x\w+>/.test(code)) {
    code = code.replace(/in NSObject:[\s\S]*/gm, "in NSObject:\n...")
  }
  const entity = code
    .replace(/[\u00A0-\u9999<>&]/gim, (i) => `&#${i.charCodeAt(0)};`)
    .replace(/\t/g, "  ")
    .replace(/\s\(0x\w+\)/g, "")
    .replace(/(\nin[^\n]+?:)/g, "\n\n$1")
  return `<html><meta name="viewport" content="user-scalable=no"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/tomorrow.min.css"><style>*{margin:0;padding:0}code,pre{white-space:-pre-wrap;white-space:pre-wrap;word-wrap:break-word;font-size:18px;font-family:menlo!important;line-height:24px}</style><script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script><script>hljs.initHighlightingOnLoad()</script><body class="hljs"><pre><code class="hljs">${entity}</code></pre></body></html>`
}
function renderCode(text) {
  if (!text) {
    return
  }
  $("CodeView").html = getHTML(text)
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
  const newData = [className, ...items]
  $cache.setAsync({
    key: "history",
    value: newData
  })
  $("ItemList").data = newData.map((item) => ({
    label: {
      text: item
    }
  }))
}

module.exports = {
  getHTML,
  renderCode,
  getInputHistory,
  setInputHistory
}
