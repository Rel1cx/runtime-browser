import React from 'react'
import { useProxy } from 'valtio'
import CodeView from '../components/CodeView'
import Input from '../components/Input'
import { getMethodDescription } from '../helper'
import { globalState } from '../store'

const Home = props => {
    const { width, height } = props.frame
    const { code, settings, history } = useProxy(globalState)
    const { previewTheme, previewFontSize, previewLineBreakMode } = settings

    const onChange = sender => {
        sender.text = sender.text.trim()
        const name = sender.text
        if (!name) {
            return
        }
        const description = getMethodDescription(name)
        if (!description) {
            return
        }
        sender.blur()
        globalState.code = description
        globalState.history = history.filter(item => item !== sender.text)
        globalState.history.unshift(sender.text)
    }

    return (
        <view {...props}>
            <Input key="input" frame={$rect(4, 4, width - 8, 32)} onChange={onChange} />
            <CodeView
                frame={$rect(0, 40, width, height - 40)}
                hidden={!code}
                content={code}
                theme={previewTheme}
                fontSize={previewFontSize}
                lineBreakMode={previewLineBreakMode}
            />
        </view>
    )
}

export default Home
