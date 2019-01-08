module.exports = superclass => class Job extends superclass {

  constructor () {
    super(...arguments)

    this._job = {
      type: 0,
      salary: 0,
      location: undefined,
    }
  }

  get job () { return this._job }
  set job (value) {
    if (this._job !== value) {
      let oldValue = this._job
      this._job = value
      this.emit('job-changed', value, oldValue)
    }
  }

}
