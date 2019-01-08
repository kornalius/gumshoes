const Base = require('../base/base')
const HP = require('../mixins/hp')
const Str = require('../mixins/str')
const Level = require('../mixins/level')
const Identity = require('../mixins/identity')
const Icon = require('../mixins/icon')
const Inventory = require('./inventory')

class Person extends mix(Base).with(Str, HP, Level, Icon, Identity) {

  constructor () {
    super(...arguments)

    this._inventory = new Inventory()
    this._inventory._owner = this

    this.setOptions(...arguments)
  }

  get inventory () { return this._inventory }

}

module.exports = Person
