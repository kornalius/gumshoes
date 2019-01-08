module.exports = superclass => class Children extends superclass {

  constructor () {
    super(...arguments)

    this._children = []
  }

  get children () { return this._children }

  forEachChild (cb) {
    for (let child of this._children) {
      if (!cb.call(this, child)) {
        break
      }
    }
    return this
  }

  removeAllChildren () {
    return this.removeChild(_.clone(this._children))
  }

  get childrenCount () {
    return this._children.length
  }

  hasChild (value) {
    return _.includes(this._children, value)
  }

  addChild (value) {
    if (_.isArray(value)) {
      for (let child in value) {
        this.addChild(child)
      }
    }
    else {
      this._children.push(value)
      this.emit('child-added', value)
    }
    return this
  }

  removeChild (value) {
    if (_.isArray(value)) {
      for (let child in value) {
        this.removeChild(child)
      }
    }
    else {
      _.remove(this._children, value)
      this.emit('child-removed', value)
    }
    return this
  }

}
