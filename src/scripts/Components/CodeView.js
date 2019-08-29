import React from 'react'
import { observer } from 'mobx-react-lite/dist/custom.module'
import { pupa } from '../helper'

const { width } = $device.info.screen

const HLTemplate = $file.read('assets/highlight.html').string

function CodeView({ frame, content, ...props }) {
  const html = pupa(HLTemplate, { code: content })
  return <web frame={frame} html={html} {...props} />
}

export default observer(CodeView)
