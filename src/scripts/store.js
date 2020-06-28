import { createStore } from 'use-simple-store'

const initialSettings = {
    commonFontSize: 16,
    previewFontSize: 12,
    previewTheme: 'arduino-light',
    historySort: 0,
    ignoreMethodsInheritedFromNSObject: true,
}

export const globalStore = createStore({
    selectedIndex: 0,
})

export const settingsStore = createStore($cache.get('settings') || initialSettings)

export const codeStore = createStore({
    code: '',
})

export const historyStore = createStore({
    history: $cache.get('history') || [],
})

settingsStore.subscribe(state => {
    $cache.set('settings', state)
})

historyStore.subscribe(state => {
    $cache.set('history', state.history)
})
