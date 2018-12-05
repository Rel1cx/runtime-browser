const { renderCode } = require("../../utils")
const { setInputHistory } = require("../../utils")
const InputView = () => ({
  type: "input",
  props: {
    id: "InputView",
    type: $kbType.ascii,
    placeholder: $l10n("input")
  },
  layout(make) {
    make.height.equalTo(30)
    make.left.top.right.inset(5)
  },
  events: {
    returned(sender) {
      const className = sender.text
      if (!className) {
        return
      }
      const methods = $objc(className).$__methodDescription()
      if (methods === false) {
        $ui.toast($l10n("toast_wrong"))
        sender.runtimeValue().$selectAll()
      } else {
        sender.blur()
        renderCode(methods.rawValue().toString())
        setInputHistory(className)
      }
    },
    didBeginEditing(sender) {
      sender.runtimeValue().invoke("selectAll")
    }
  }
})

module.exports = InputView
