export const noop = () => { }
export function minifyCode(code) {
  const minifiedCode = code.replace(/\t/g, ' '.repeat(2)).replace(/\s\(0x\w+\)/g, '')
  return minifiedCode.includes('<NSObject:') ? minifiedCode : minifiedCode.replace(/in NSObject:[\s\S]*/g, '')
}

export function getMethodDescription(name) {
  const description = $objc(name).$__methodDescription()
  if (!description) {
    return
  }
  return minifyCode(description.jsValue().toString())
}
