const TabView = require("./views/Tab")
const Home = require("./screens/Home")
const History = require("./screens/History")
const Settings = require("./screens/Settings")
const RouterView = async (views) => ({
  type: "view",
  props: {
    id: "routerView"
  },
  views: await Promise.all(views),
  layout(make) {
    make.left.top.right.inset(0)
    make.bottom.inset(40)
  },
  events: {}
})

void (async () => {
  $ui.render({
    props: {
      title: ""
    },
    views: [
      {
        type: "view",
        props: {
          id: "baseView"
        },
        views: await Promise.all([RouterView([Home(), History(), Settings()]), TabView()]),
        layout: $layout.fill,
        events: {}
      }
    ]
  })
})()
