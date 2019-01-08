
module.exports = superclass => class Weight extends superclass {

  constructor () {
    super(...arguments)

    this._weight = this.min_weight
  }

  get weight () { return this._weight }
  set weight (value) {
    if (this._weight !== value) {
      let oldValue = this._weight
      this._weight = value
      this.emit('weight-changed', value, oldValue)
    }
  }

  get min_weight () { return 0.1 }

}
