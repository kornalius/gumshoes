module.exports = superclass => class Lockable extends superclass {

  constructor () {
    super(...arguments)

    this._locked = false
  }

  get locked () { return this._locked }
  set locked (value) {
    if (this._locked !== value) {
      if (this.canLock && value || this.canUnlock && !value) {
        this._locked = value
        this.emit(value ? 'locked' : 'unlocked')
      }
    }
  }

  get canLock () { return true }

  get canUnlock () { return true }

  get isLocked () { return this.locked }

  get isUnlocked () { return !this.locked }

  lock () {
    this.locked = true
  }

  unlock () {
    this.locked = false
  }

  toggleLock () {
    this.locked = !this.locked
  }

}
