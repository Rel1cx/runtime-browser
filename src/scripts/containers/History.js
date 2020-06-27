import React from 'react'
import { getMethodDescription } from '../helper'
import { globalStore, historyStore, codeStore } from '../store'

const History = (props) => {
    const { history } = historyStore.useStore()
    const classItems = [...history].sort()
    const data = classItems.map(text => ({
        label: {
            text
        }
    }))

    return <view {...props}>
        <list
            frame={props.frame}
            data={data}
            template={listTemplate}
            events={{
                didSelect: (sender, { row }) => {
                    codeStore.update(state => {
                        state.code = getMethodDescription(classItems[row])
                    })
                    globalStore.update(state => {
                        state.selectedIndex = 0
                    })
                }
            }}
        />
    </view>
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