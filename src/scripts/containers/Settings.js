import React from 'react'
import { historyStore, settingsStore } from '../store'
import { previewThemes } from '../constants'
import { noop } from '../helper'

const Settings = props => {
    const settings = settingsStore.useStore()

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
        ],
    }

    return (
        <view {...props}>
            <list
                id="settings"
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
                        title: 'Preview',
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
                                                sender.next.text = settingsStore.getState().previewFontSize
                                                $audio.play({
                                                    id: 1104,
                                                })
                                            },
                                        },
                                    },
                                    {
                                        type: 'label',
                                        props: {
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
                        title: 'Misc',
                        rows: [
                            {
                                setup: {
                                    text: '清除缓存',
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
