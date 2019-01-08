const Base = require('../base/base')
const Owner = require('../mixins/owner')
const Items = require('../mixins/items')

class Inventory extends mix(Base).with(Items, Owner) {

  constructor () {
    super(...arguments)
    this.setOptions(...arguments)
  }

  canAddItem (item, qty = 1) {
    return this.totalWeight + item.weightFor(qty) <= this.owner.carryWeight
  }

  canRemoveItem (item, qty = 1) {
    return true
  }

  canDropItem (item, qty = 1) {
    return true
  }

  addItem (item, qty = 1) {
    if (_.isArray(item)) {
      for (let i in item) {
        this.addItem(i)
      }
    }
    else if (this.canAddItem(item, qty)) {
      this._items.push({ item, qty })
      item.owner = this.owner
      this.emit('item-added', item)
    }
    return this
  }

  removeItem (item, qty = 1) {
    if (_.isArray(item)) {
      for (let i in item) {
        this.removeItem(i)
      }
    }
    else if (this.canRemoveItem(item, qty)) {
      _.remove(this._items, item)
      item.owner = undefined
      this.emit('item-removed', item)
    }
    return this
  }

  get totalWeight () {
    let total = 0
    for (let item of this._items) {
      total += item.totalWeight
    }
    return total
  }

  giveItem (item, target, qty = 1) {
    if (_.isArray(item)) {
      for (let i of item) {
        this.giveItem(i, target)
      }
    }
    else if (this.canRemoveItem(item, qty) && target.canAddItem(item, qty)) {
      this.removeItem(item, qty)
      target.addItem(item, qty)
    }
    return this
  }

}

module.exports = Inventory
