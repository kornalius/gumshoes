module.exports = superclass => class Identity extends superclass {

  constructor () {
    super(...arguments)

    this._firstname = undefined
    this._lastname = undefined
    this._age = 0
    this._residence = undefined
  }

  get name () {
    return this._firstname + ' ' + this._lastname
  }

}
