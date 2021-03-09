import React from 'react'
import { getMethodDescription } from '../helper'
import { globalStore, historyStore, codeStore } from '../store'

const History = props => {
    const { history } = historyStore.useStore()
    const data = history.map(text => ({
        name: {
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
                        const name = data.name.text
                        codeStore.update(state => {
                            state.code = getMethodDescription(name)
                        })
                        globalStore.update(state => {
                            state.selectedIndex = 0
                        })
                        historyStore.update(draft => {
                            draft.history = draft.history.filter(item => item !== name)
                            draft.history.unshift(name)
                        })
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
                id: 'name',
                align: $align.center,
                font: $font('JetBrains Mono', 16)
            },
            layout: $layout.fill
        }
    ]
}

export default History
