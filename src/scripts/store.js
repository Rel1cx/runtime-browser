import { observable, action, autorun } from 'mobx'

class Store {
  @observable tabActiveIndex = 0
  @action.bound
  setTabActiveIndex(index) {
    this.tabActiveIndex = index
  }
  @observable inputValue = null
  @observable code = ''
}

autorun(() => console.log(Store.tabActiveIndex))

export default new Store()
