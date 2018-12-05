module.exports = {
  switch: (index) => {
    const views = $("routerView").views
    views.forEach((i) => (i.hidden = true))
    views[index].hidden = false
    for (let i = 0; i < views.length; i++) {
      $("TabView").cell($indexPath(0, i)).views[0].views[0].tintColor = $color(index === i ? "tint" : "lightGray")
      $("TabView").cell($indexPath(0, i)).views[0].views[1].textColor = $color(index === i ? "tint" : "lightGray")
    }
  }
}
