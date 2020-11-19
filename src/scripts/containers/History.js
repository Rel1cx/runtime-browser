import React from 'react'
import { useProxy } from 'valtio'
import { globalState } from '../store'
import { getMethodDescription } from '../helper'

const History = props => {
    const { history } = useProxy(globalState)
    const data = history.map(text => ({
        label: {
            text
        }
    }))

    return (
        <view {...props}>
            <list
                frame={props.frame}
                data={data}
                template={listTemplate}
                events={{
                    didSelect(sender, _, data) {
                        globalState.code = getMethodDescription(data.label.text)
                        globalState.selectedIndex = 0
                    }
                }}
            />
        </view>
    )
}

const listTemplate = {
    views: [
        {
            type: 'label',
            props: {
                align: $align.center,
                font: $font('JetBrains Mono', 16)
            },
            layout: $layout.fill
        }
    ]
}

export default History
