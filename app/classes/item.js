const Base = require('../base/base')
const Level = require('../mixins/level')
const Qty = require('../mixins/qty')
const Owner = require('../mixins/owner')
const Weight = require('../mixins/weight')
const Atk = require('../mixins/atk')
const Def = require('../mixins/def')
const Info = require('../mixins/info')
const Icon = require('../mixins/icon')
const Items = require('../mixins/items')

class Item extends mix(Base).with(Qty, Weight, Atk, Def, Level, Items, Icon, Info, Owner) {

  constructor () {
    super(...arguments)
    this.setOptions(...arguments)
  }

  get totalWeight () {
    let weight = 0
    if (this.isContainer) {
      this.forEachItem(item => {
        weight += item.totalWeight
      })
    }
    else {
      weight = this.weightFor(this.qty)
    }
    return weight
  }

  weightFor (qty = 1) { return this.weight * qty }

  get isContainer () { return _.isArray(this.items) }

}

module.exports = Item
