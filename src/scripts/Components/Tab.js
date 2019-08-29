import React, { useState, useMemo } from 'react'
const { width, height } = $device.info.screen

export default function Tab() {
    const [active, setActive] = useState(0)

    return (
        <matrix
            id="tabbar"
            frame={$rect(0, 0, width, 50)}
            itemHeight={40}
            columns={3}
            spacing={0}
            scrollEnabled={false}
            selectable={true}
            template={tabTemplate}
            data={tabData}
            events={{
                didSelect: function (_, { row }) {
                    setActive(row)
                }
            }}
        />
    )
}


const tabTemplate = {
    views: [
        {
            type: "image",
            props: {
                id: "menu_image",
                bgcolor: $color("clear")
            },
            layout: function (make, view) {
                make.centerX.equalTo(view.super)
                make.width.height.equalTo(25)
                make.top.inset(5)
            }
        },
        {
            type: "label",
            props: {
                id: "menu_label",
                font: $font("PingFangTC-Semibold", 10),
                textColor: $color("lightGray")
            },
            layout: function (make, view) {
                const preView = view.prev
                make.centerX.equalTo(preView)
                make.top.equalTo(preView.bottom).offset(3)
            }
        }
    ]
}

const tabData = [
    {
        menu_image: {
            icon: $icon("102", $color("clear"), $size(72, 72)),
            tintColor: $color("tint")
        },
        menu_label: {
            text: "Home",
            textColor: $color("tint")
        }
    },
    {
        menu_image: {
            icon: $icon("099", $color("clear"), $size(72, 72)),
            tintColor: $color("lightGray")
        },
        menu_label: {
            text: "History"
        }
    },
    {
        menu_image: {
            icon: $icon("002", $color("clear"), $size(72, 72)),
            tintColor: $color("lightGray")
        },
        menu_label: {
            text: "Setting"
        }
    }
]