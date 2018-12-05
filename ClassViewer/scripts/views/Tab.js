const router = require("../router")
const TabView = async () => ({
  type: "matrix",
  props: {
    id: "TabView",
    itemHeight: 40,
    columns: 3,
    spacing: 0,
    scrollEnabled: false,
    selectable: false,
    template: {
      views: [
        {
          type: "image",
          props: {
            id: "menu_image",
            bgcolor: $color("clear")
          },
          layout: function(make, view) {
            make.centerX.equalTo(view.super)
            make.width.height.equalTo(25)
            make.top.inset(5)
          }
        },
        {
          type: "label",
          props: {
            id: "menu_label",
            hidden: $app.env !== $env.app,
            font: $font("PingFangTC-Semibold", 10),
            textColor: $color("lightGray")
          },
          layout: function(make, view) {
            const preView = view.prev
            make.centerX.equalTo(preView)
            make.top.equalTo(preView.bottom).offset(3)
          }
        }
      ]
    },
    data: [
      {
        menu_image: {
          icon: $icon("067", $color("clear"), $size(72, 72)),
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
          text: $l10n("History")
        }
      },
      {
        menu_image: {
          icon: $icon("002", $color("clear"), $size(72, 72)),
          tintColor: $color("lightGray")
        },
        menu_label: {
          text: $l10n("Setting")
        }
      }
    ]
  },
  layout: function(make, view) {
    const sup = view.super

    if ($app.env !== $env.app) {
      make.height.equalTo(40)
    } else {
      make.height.equalTo(50)
    }

    if ($device.isIphoneX) {
      make.bottom.equalTo(sup.safeAreaBottom)
    } else {
      make.bottom.equalTo(0)
    }

    make.left.right.inset(0)
  },
  events: {
    didSelect: function(indexPath) {
      router.switch(indexPath.row)
    }
  }
})

module.exports = TabView
