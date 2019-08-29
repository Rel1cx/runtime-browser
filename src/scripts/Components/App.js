import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import state from '../store'
import Input from './Input'
import CodeView from './CodeView'
import { minifyCode } from '../helper'

const { width, height } = $device.info.screen
function App() {
    const { code } = state
    const content = useMemo(() => minifyCode(code), [code])
    return (
        <view frame={$('main').frame}>
            <Input frame={$rect(4, 4, width - 8, 32)} />
            <CodeView frame={$rect(0, 40, width, $('main').frame.height)} content={content} />
        </view>
    )
}

export default observer(App)