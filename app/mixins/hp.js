module.exports = superclass => class HP extends superclass {

  constructor () {
    super(...arguments)

    this._hp = this.min_hp
  }

  get hp () { return this._hp }
  set hp (value) {
    value = _.clamp(value, this.min_hp, this.max_hp)
    if (this._hp !== value) {
      let oldValue = this._hp
      this._hp = value
      this.emit('hp-changed', value, oldValue)
      if (this.isDead) {
        this.emit('died')
      }
    }
  }

  get min_hp () { return 0 }

  get max_hp () { return 100 }

  get isAlive () { return this.hp > this.min_hp }

  get isDead () { return this.hp <= this.min_hp }

  kill () {
    this.hp = this.min_hp
  }

}
