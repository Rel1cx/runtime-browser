import React, { useMemo } from 'react'
import Home from './containers/Home'
import History from './containers/History'
import Settings from './containers/Settings'
import Tab from './components/Tab'
import { globalStore } from './store'
import { TAB_HEIGHT } from './constants'

function App({ width, height }) {
    const tabFrame = $rect(0, height - TAB_HEIGHT, width, TAB_HEIGHT)
    const contentFrame = $rect(0, 0, width, height - TAB_HEIGHT)
    const selectedIndex = globalStore.useStore(s => s.selectedIndex)

    const screens = useMemo(
        () => [
            <Home frame={contentFrame} />,
            <History frame={contentFrame} />,
            <Settings frame={contentFrame} />
        ],
        [contentFrame]
    )

    return (
        <>
            {screens[selectedIndex]}
            <Tab
                frame={tabFrame}
                tabItems={tabItems}
                selectedIndex={selectedIndex}
                onSelectedIndexChange={idx =>
                    globalStore.update(state => {
                        state.selectedIndex = idx
                    })
                }
            />
        </>
    )
}

const tabItems = [
    { name: 'Home', icon: '102' },
    { name: 'History', icon: '099' },
    { name: 'Settings', icon: '002' }
]

export default App
