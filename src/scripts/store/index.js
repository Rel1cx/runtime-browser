import { observable } from 'mobx'

const state = observable({
    activeIndex: 0,
    inputValue: null,
    code: ''
})

export default state