module.exports = superclass => class Parent extends superclass {

  constructor () {
    super(...arguments)

    this._parent = undefined
  }

  get parent () { return this._parent }
  set parent (newParent) {
    if (this._parent !== newParent) {
      this.remove()
      this._parent = newParent
      this.add()
    }
  }

  get hasParent () { return this._parent }

  get parentHasChildren () { return _.isArray(_.get(this, '_parent._children')) }

  add () {
    if (this.parentHasChildren) {
      this._parent.addChild(this)
    }
    return this
  }

  remove () {
    if (this.parentHasChildren) {
      this._parent.removeChild(this)
    }
    return this
  }

}
