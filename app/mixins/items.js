module.exports = superclass => class Items extends superclass {

  constructor () {
    super(...arguments)

    this._items = []
  }

  get items () { return this._items }

  forEachItem (cb) {
    for (let item of this._items) {
      if (!cb.call(this, item)) {
        break
      }
    }
    return this
  }

  removeAllItems () {
    return this.removeItem(_.clone(this._items))
  }

  get itemsCount () {
    return this._items.length
  }

  hasItem (item) {
    return _.includes(this._items, item)
  }

  addItem (item) {
    if (_.isArray(item)) {
      for (let i in item) {
        this.addItem(i)
      }
    }
    else {
      this._items.push(item)
      this.emit('item-added', item)
    }
    return this
  }

  removeItem (item) {
    if (_.isArray(item)) {
      for (let i in item) {
        this.removeItem(i)
      }
    }
    else {
      _.remove(this._items, item)
      this.emit('item-removed', item)
    }
    return this
  }

  max (name) {
    let max = 0
    let maxItem
    for (let item of this._items) {
      let value = _.get(item, name, 0)
      if (value > max) {
        max = value
        maxItem = item
      }
    }
    return maxItem
  }

  min (name) {
    let min = Infinity
    let minItem
    for (let item of this._items) {
      let value = _.get(item, name, 0)
      if (value < min) {
        min = value
        minItem = item
      }
    }
    return minItem
  }

  total (name) {
    let total = 0
    for (let item of this._items) {
      total += _.get(item, name, 0)
    }
    return total
  }

}
