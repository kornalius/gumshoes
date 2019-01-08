module.exports = superclass => class Openable extends superclass {

  constructor () {
    super(...arguments)

    this._opened = false
  }

  get opened () { return this._opened }
  set opened (value) {
    if (this._opened !== value) {
      if (this.canOpen && value || this.canClose && !value) {
        this._opened = value
        this.emit(value ? 'opened' : 'closed')
      }
    }
  }

  get canOpen () { return !this.locked }

  get canClose () { return true }

  get isOpened () { return this.opened }

  get isClosed () { return !this.opened }

  open () {
    this.opened = true
  }

  close () {
    this.opened = false
  }

  toggleOpen () {
    this.opened = !this.opened
  }

}
