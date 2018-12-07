module.exports = {
  switch: (index) => {
    const views = $("routerView").views
    views.forEach((i) => (i.hidden = true))
    views[index].hidden = false
    views.forEach((_, idx) => {
      $("TabView").cell($indexPath(0, idx)).views[0].views[0].tintColor = $color(idx === index ? "tint" : "lightGray")
      $("TabView").cell($indexPath(0, idx)).views[0].views[1].textColor = $color(idx === index ? "tint" : "lightGray")
    })
  }
}
