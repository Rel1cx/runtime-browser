import React from 'react'

export default function Tab({
    tabItems,
    selectedIndex,
    onSelectedIndexChange = () => {},
    ...rest
}) {
    const tabData = tabItems.map(({ name, icon }, index) => {
        const tintColor = $color(selectedIndex === index ? 'tint' : 'lightGray')
        return {
            item_icon: {
                icon: $icon(icon, $color('clear'), $size(72, 72)),
                tintColor
            },
            item_name: {
                text: name,
                textColor: tintColor
            }
        }
    })

    return (
        <matrix
            id="tab"
            itemHeight={40}
            columns={tabItems.length}
            spacing={0}
            scrollEnabled={false}
            selectable={true}
            template={tabTemplate}
            data={tabData}
            events={{
                didSelect(_, { row }) {
                    onSelectedIndexChange(row)
                }
            }}
            {...rest}
        />
    )
}

const tabTemplate = {
    views: [
        {
            type: 'image',
            props: {
                id: 'item_icon',
                bgcolor: $color('clear')
            },
            layout(make, view) {
                make.centerX.equalTo(view.super)
                make.width.height.equalTo(25)
                make.top.inset(5)
            }
        },
        {
            type: 'label',
            props: {
                id: 'item_name',
                font: $font(10),
                textColor: $color('lightGray')
            },
            layout(make, view) {
                const preView = view.prev
                make.centerX.equalTo(preView)
                make.top.equalTo(preView.bottom).offset(3)
            }
        }
    ]
}
