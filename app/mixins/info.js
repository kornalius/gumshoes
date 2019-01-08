module.exports = superclass => class Info extends superclass {

  constructor () {
    super(...arguments)

    this._name = ''
    this._desc = ''
  }

  get name () { return this._name }
  set name (value) {
    if (this._name !== value) {
      let oldValue = this._name
      this._name = value
      this.emit('name-changed', value, oldValue)
    }
  }

  get desc () { return this._desc }
  set desc (value) {
    if (this._desc !== value) {
      let oldValue = this._desc
      this._desc = value
      this.emit('desc-changed', value, oldValue)
    }
  }

}
