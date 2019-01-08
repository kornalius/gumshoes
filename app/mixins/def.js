module.exports = superclass => class Def extends superclass {

  constructor () {
    super(...arguments)

    this._def = this.min_def
  }

  get def () { return this._def }
  set def (value) {
    value = _.clamp(value, this.min_def, this.max_def)
    if (this._def !== value) {
      let oldValue = this._def
      this._def = value
      this.emit('def-changed', value, oldValue)
    }
  }

  get min_def () { return 0 }

  get max_def () { return 0 }

}
