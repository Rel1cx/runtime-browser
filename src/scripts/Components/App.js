import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { TabContainer } from './Tab'
import CodeView from './CodeView'
import Input from './Input'
import store from '../store'
import { minifyCode } from '../helper'

const { width, height } = $device.info.screen

const Home = observer(() => {
  const { width, height } = $('main').frame
  const { code } = store
  const content = useMemo(() => minifyCode(code), [code])
  return (
    <>
      <Input key="input" frame={$rect(4, 4, width - 8, 32)} />
      <CodeView key="codeview" frame={$rect(0, 40, width, height - 40)} hidden={!content} content={content} />
    </>
  )
})

const History = observer(props => {
  return <view frame={$rect(0, 0, width, width)} bgcolor={$color('#333')} />
})

function App() {
  const { selectedIndex } = store
  const frame = $('main').frame
  return (
    <TabContainer frame={frame} selectedIndex={selectedIndex}>
      <Home />
      <History />
    </TabContainer>
  )
}

export default observer(App)
