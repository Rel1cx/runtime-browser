import React, { useRef } from 'react'
import ReactJSBox from 'react-jsbox'

import App from './Components/App'
import Tab from './Components/Tab'
const { width, height } = $device.info.screen

async function renderRootContainer() {
  return new Promise((resolve, reject) => {
    $ui.render({
      props: {
        title: 'Class Viewer',
        debugging: true
      },
      views: [
        {
          type: 'view',
          props: {
            id: 'root'
          },
          views: [
            {
              type: 'view',
              props: {
                id: 'main'
              },
              layout(make, view) {
                make.left.top.right.inset(0)
                make.bottom.inset(50)
              }
            },
            {
              type: 'view',
              props: {
                id: 'tab'
              },
              layout(make, view) {
                make.left.bottom.right.inset(0)
                make.height.equalTo(50)
              },
            },
          ],
          layout(make, view) {
            make.edges.equalTo(view.super.safeArea)
          },
          events: {
            layoutSubviews(view) {
              resolve(view)
            }
          }
        }
      ]
    })
  })
}

void async function () {
  const rootView = await renderRootContainer()
  ReactJSBox.render(<App />, rootView.get('main'))
  ReactJSBox.render(<Tab />, rootView.get('tab'))
}()