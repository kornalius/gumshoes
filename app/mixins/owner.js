module.exports = superclass => class Owner extends superclass {

  constructor () {
    super(...arguments)

    this._owner = undefined
  }

  get owner () { return this._owner }
  set owner (value) {
    if (this._owner !== value) {
      let oldValue = this._owner
      this._owner = value
      this.emit('owner-changed', value, oldValue)
    }
  }

  get hasOwner () { return !_.isUndefined(this._owner) }

}
