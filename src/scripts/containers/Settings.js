import React, { useRef } from 'react'
import { useUpdateEffect } from 'react-jsbox'
import { historyStore, settingsStore } from '../store'
import { previewThemes, initialSettings } from '../constants'
import { noop } from '../helper'

const actions = {
    preview: [
        async sender => {
            const cell = sender.cell($indexPath(0, 0)).get('value')
            const { title } = await $ui.popover({
                sourceView: cell,
                sourceRect: cell.bounds,
                directions: $popoverDirection.up,
                size: $size(220, 400),
                items: previewThemes,
            })
            settingsStore.update(state => {
                state.previewTheme = title
            })
        },
        noop,
        async () => {
            $ui.menu({
                items: ['单词', '字符'],
                handler(_, idx) {
                    settingsStore.update(state => {
                        state.previewLineBreakMode = idx
                    })
                },
            })
        },
    ],
    misc: [
        () =>
            historyStore.update(state => {
                state.history = []
            }),
        () => {
            settingsStore.update(() => initialSettings)
        },
    ],
}

const Settings = props => {
    const settingsRef = useRef()
    const settings = settingsStore.useStore()

    useUpdateEffect(() => {
        settingsRef.current.cell($indexPath(0, 1)).get('value').text = settings.previewFontSize
    }, [settings.previewFontSize])

    return (
        <view {...props}>
            <list
                id="settings"
                ref={settingsRef}
                frame={props.frame}
                showsVerticalIndicator={false}
                template={{
                    props: {
                        accessoryType: 1,
                    },
                    views: [
                        {
                            type: 'label',
                            props: {
                                id: 'setup',
                                textColor: $color('darkGray'),
                            },
                            layout(make, view) {
                                make.centerY.equalTo(view.super)
                                make.left.inset(15)
                            },
                        },
                        {
                            type: 'label',
                            props: {
                                id: 'value',
                                textColor: $color('#333'),
                            },
                            layout(make, view) {
                                make.centerY.equalTo(view.super)
                                make.right.inset(5)
                            },
                        },
                    ],
                }}
                data={[
                    {
                        title: '预览',
                        rows: [
                            {
                                setup: {
                                    text: '主题',
                                },
                                value: {
                                    text: settings.previewTheme,
                                },
                            },
                            {
                                type: 'views',
                                layout: $layout.fill,
                                views: [
                                    {
                                        type: 'label',
                                        props: {
                                            id: 'setup',
                                            text: '字体大小',
                                            textColor: $color('darkGray'),
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.left.inset(15)
                                        },
                                    },
                                    {
                                        type: 'stepper',
                                        props: {
                                            min: 10,
                                            max: 16,
                                            step: 1,
                                            continuous: false,
                                            value: settings.previewFontSize,
                                            tintColor: $color('dark'),
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.right.inset(15)
                                        },
                                        events: {
                                            changed(sender) {
                                                settingsStore.update(state => {
                                                    state.previewFontSize = sender.value
                                                })
                                                $audio.play({
                                                    id: 1104,
                                                })
                                            },
                                        },
                                    },
                                    {
                                        type: 'label',
                                        props: {
                                            id: 'value',
                                            text: settings.previewFontSize,
                                        },
                                        layout(make, view) {
                                            make.centerY.equalTo(view.super)
                                            make.right.equalTo(view.prev.left).offset(-10)
                                        },
                                    },
                                ],
                            },
                            {
                                setup: {
                                    text: '换行模式',
                                },
                                value: {
                                    text: ['单词', '字符'][settings.previewLineBreakMode],
                                },
                            },
                        ],
                    },
                    {
                        title: '通用',
                        rows: [
                            {
                                setup: {
                                    text: '清除缓存',
                                },
                                value: {
                                    text: '',
                                },
                            },
                            {
                                setup: {
                                    text: '恢复默认设置',
                                },
                                value: {
                                    text: '',
                                },
                            },
                        ],
                    },
                ]}
                events={{
                    didSelect(sender, { row, section }) {
                        actions[Object.keys(actions)[section]][row](sender)
                    },
                }}
            />
        </view>
    )
}

export default Settings
