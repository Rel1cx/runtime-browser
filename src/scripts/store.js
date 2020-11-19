import { proxy, subscribe } from 'valtio'
import { initialSettings } from './constants'

export const globalState = proxy({
    code: '',
    selectedIndex: 0,
    settings: $cache.get('settings') || initialSettings,
    history: $cache.get('history') || []
})

subscribe(globalState.settings, () => {
    $cache.set('settings', globalState.settings)
})

subscribe(globalState.history, () => {
    $cache.set('history', globalState.history)
})
