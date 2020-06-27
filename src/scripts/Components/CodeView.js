import React from 'react'
import { pupa } from '../lib/pupa'

const HLTemplate = $file.read('assets/highlight.html').string

function CodeView({ frame, content, theme = 'agate', fontSize = 12, fontFamily = 'menlo', ...props }) {
  const html = pupa(HLTemplate, { code: content, theme, fontSize, fontFamily })
  return <web frame={frame} html={html} {...props} />
}

export default CodeView
