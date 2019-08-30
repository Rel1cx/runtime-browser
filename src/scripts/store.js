import { observable, action, autorun } from 'mobx'

class Store {
  @observable selectedIndex = 0

  @observable code = ''

  @action
  setSelectedIndex(index) {
    this.selectedIndex = index
  }

  @action
  setCode(code) {
    this.code = code
  }
}

export default new Store()
