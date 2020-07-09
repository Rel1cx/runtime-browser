import React from 'react'
import { render } from 'react-jsbox'
import App from './App'

$ui.render({
    props: {
        title: 'runtime browser'
    },
    views: [
        {
            type: 'view',
            props: {
                id: 'root'
            },
            layout(make, view) {
                make.edges.equalTo(view.super.safeArea)
            },
            events: {
                layoutSubviews(view) {
                    const { width, height } = view.frame
                    render(<App width={width} height={height} />, view)
                }
            }
        }
    ]
})
