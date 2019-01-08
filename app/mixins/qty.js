module.exports = superclass => class Qty extends superclass {

  constructor () {
    super(...arguments)

    this._qty = this.min_qty
  }

  get qty () { return this._qty }
  set qty (value) {
    value = _.clamp(value, this.min_qty, this.max_qty)
    if (this._qty !== value) {
      let oldValue = this._qty
      this._qty = value
      this.emit('qty-changed', value, oldValue)
    }
  }

  get min_qty () { return 1 }

  get max_qty () {
    return this.owner ? 1 : 1
  }

}
