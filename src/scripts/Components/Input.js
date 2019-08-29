import React from 'react'
import ReactJSBox from 'react-jsbox'
import state from '../store'
import { observer, useObservable } from 'mobx-react-lite/dist/custom.module'

const { width, height } = $device.info.screen

function Input({ frame }) {
  return (
    <input
      id="input"
      frame={frame}
      type={$kbType.ascii}
      placeholder="输入类名如: UIView"
      events={{
        returned(sender) {
          sender.text = sender.text.trim()
          const className = sender.text
          if (!className) return
          const methods = $objc(className).$__methodDescription()
          if (!methods) {
            $ui.toast($l10n('toast_wrong'))
            sender.ocValue().$selectAll()
            return
          }
          sender.blur()
          state.code = methods.jsValue().toString()
        },
        didBeginEditing(sender) {
          sender.ocValue().invoke('selectAll')
        }
      }}
    />
  )
}

export default observer(Input)
