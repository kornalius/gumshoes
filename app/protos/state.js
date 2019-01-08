class State {

  constructor (states = [], rollStates = false) {
    this._states = states
    this._state = _.last(states)
    this.rollStates = rollStates
  }

  get state () { return this._state }
  get states () { return this._states }

  set state (value) { this._state = value }
  set states (value) { this._states = value }

  get hasState () { return this._state !== null }
  get hasStates () { return this._states.length > 0 }

  stateIndex (state = this._state) { return this._states.indexOf(state) }

  validState (state = this._state) { return this._stateIndex(state) !== -1 }

  hasNextState (state = this._state) { return this._stateIndex(state) + 1 <= this._states.length - 1 }

  hasPrevState (state = this._state) { return this._stateIndex(state) - 1 >= 0 }

  prevState () {
    if (this.hasPrevState()) {
      this._state = this._states[this._stateIndex() - 1]
    }
    else if (this.rollStates) {
      this._state = _.last(this._states)
    }
    else {
      this._state = null
      return false
    }
    return true
  }

  nextState () {
    if (this.hasNextState()) {
      this._state = this._states[this._stateIndex() + 1]
    }
    else if (this.rollStates) {
      this._state = _.first(this._states)
    }
    else {
      this._state = null
      return false
    }
    return true
  }

  addState (state) {
    if (_.isArray(state)) {
      _.each(state, s => this.addState(s))
    }
    else if (!this.validState(state)) {
      this._states.push(state)
      this.emit('states.add', state)
    }
    return this
  }

  removeState (state) {
    if (_.isArray(state)) {
      _.each(state, s => this.removeState(s))
    }
    else if (this.validState(state)) {
      _.pull(this._states, state)
      this.emit('states.remove', state)
    }
    return this
  }

  clearStates () {
    this._state = null
    for (let s of this._states) {
      this.emit('states.remove', s)
    }
    this._states = []
    return this
  }

}

window.State = State
