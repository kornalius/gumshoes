module.exports = superclass => class Str extends superclass {

  constructor () {
    super(...arguments)

    this._str = this.min_str
  }

  get str () { return this._str }
  set str (value) {
    value = _.clamp(value, this.min_str, this.max_str)
    if (this._str !== value) {
      let oldValue = this._str
      this._str = value
      this.emit('str-changed', value, oldValue)
    }
  }

  get min_str () { return 1 }

  get max_str () { return 1 }

  get carryWeight () {
    return this.str * 0.5
  }

}
