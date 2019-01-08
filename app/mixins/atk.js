module.exports = superclass => class Atk extends superclass {

  constructor () {
    super(...arguments)

    this._atk = this.min_atk
  }

  get atk () { return this._atk }
  set atk (value) {
    value = _.clamp(value, this.min_atk, this.max_atk)
    if (this._atk !== value) {
      let oldValue = this._atk
      this._atk = value
      this.emit('atk-changed', value, oldValue)
    }
  }

  get min_atk () { return 0 }

  get max_atk () { return 0 }

}
