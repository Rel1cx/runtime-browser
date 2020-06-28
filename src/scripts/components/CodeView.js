import React from 'react'

function CodeView({ frame, content, theme = 'nord', language = 'objectivec', fontSize = 12, fontFamily = 'iosevka', ...props }) {
  const key = $text.SHA1([theme, language, fontSize, fontFamily].join())

  return <code
    key={key}
    frame={frame}
    text={content}
    theme={theme}
    fontSize={fontSize}
    language={language}
    editable={false}
    keys={['']}
    inputAccessoryView={null}
    {...props}
  />
}

export default CodeView
