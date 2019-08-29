import React, { useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import store from '../store'
const { width, height } = $device.info.screen

export default observer(function Tab({ data, activeIndex }) {
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
        didSelect(_, { row }) {
          store.setTabActiveIndex(row)
        }
      }}
    />
  )
})

const tabTemplate = {
  views: [
    {
      type: 'image',
      props: {
        id: 'menu_image',
        bgcolor: $color('clear')
      },
      layout: function(make, view) {
        make.centerX.equalTo(view.super)
        make.width.height.equalTo(25)
        make.top.inset(5)
      }
    },
    {
      type: 'label',
      props: {
        id: 'menu_label',
        font: $font('PingFangTC-Semibold', 10),
        textColor: $color('lightGray')
      },
      layout: function(make, view) {
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
      icon: $icon('102', $color('clear'), $size(72, 72)),
      tintColor: $color('tint')
    },
    menu_label: {
      text: 'Home',
      textColor: $color('tint')
    }
  },
  {
    menu_image: {
      icon: $icon('099', $color('clear'), $size(72, 72)),
      tintColor: $color('lightGray')
    },
    menu_label: {
      text: 'History'
    }
  },
  {
    menu_image: {
      icon: $icon('002', $color('clear'), $size(72, 72)),
      tintColor: $color('lightGray')
    },
    menu_label: {
      text: 'Setting'
    }
  }
]

export const TabContainer = ({ tabActiveIndex, children, ...props }) => {
  if (Array.isArray(children)) {
    return children.map((child, index) => (
      <view frame={props.frame} hidden={index !== tabActiveIndex}>
        {child}
      </view>
    ))
  }
  return <view frame={props.frame}>{children}</view>
}
