
class Event {

  constructor (target, name, data, bubbles = true) {
    this.__eventObject = true
    this.timeStamp = performance.now()
    this.target = target
    this.type = name
    this.detail = data
    this.bubbles = bubbles
    this.stopped = false
    this.stoppedImmediate = false
    this.defaultPrevented = false
  }

  stop () {
    this.stopped = true
  }

  stopImmediate () {
    this.stoppedImmediate = true
  }

  stopPropagation () {
    this.stopped = true
  }

  stopImmediatePropagation () {
    this.stoppedImmediate = true
  }

  cancelBubble () {
    this.bubbles = false
  }

  preventDefault () {
    this.defaultPrevented = true
  }
}


let EventsManager = Mixin(superclass => class EventsManager extends superclass {

  _isElementEvent (name) {
    return this.addEventListener && !_.isUndefined(this['on' + name])
  }

  on (name, fn, options = {}) {
    if (this._isElementEvent(name)) {
      this.addEventListener(name, fn, options)
      return this
    }

    this._listeners = this._listeners || {}
    this._listeners[name] = this._listeners[name] || []
    this._listeners[name].push({ fn, order: options.order || 0 })
    this._listeners[name] = _.sortBy(this._listeners[name], 'order')
    return this
  }

  once (name, fn, options = {}) {
    if (this._isElementEvent(name)) {
      this.addEventListener(name, fn, _.extend({}, options, { once: true }))
      return this
    }

    this._listeners = this._listeners || {}

    let that = this
    let onceHandlerWrapper = () => {
      fn.apply(that.off(name, onceHandlerWrapper), arguments)
    }
    onceHandlerWrapper._originalHandler = fn

    return this.on(name, onceHandlerWrapper)
  }

  off (name, fn) {
    if (this._isElementEvent(name)) {
      this.removeEventListener(name, fn)
      return this
    }

    this._listeners = this._listeners || {}

    if (!this._listeners[name]) {
      return this
    }

    let list = this._listeners[name]
    let i = fn ? list.length : 0

    while (i-- > 0) {
      if (list[i].fn === fn || list[i]._originalHandler === fn) {
        list.splice(i, 1)
      }
    }

    if (_.isEmpty(list)) {
      delete this._listeners[name]
    }

    return this
  }

  emit (name, data) {
    if (this._isElementEvent(name)) {
      let e = new CustomEvent(name, { detail: data })
      return this.dispatchEvent(e)
    }

    this._listeners = this._listeners || {}

    let origEventData

    if (!data || data.__eventObject !== true) {
      if (data && data.data && data.type) {
        origEventData = data
        data = data.data
      }
      data = new Event(this, name, data)
    }

    if (this._listeners[name]) {
      let listeners = _.clone(this._listeners[name])
      for (let l of listeners) {
        l.fn.call(this, data)
        if (data.stoppedImmediate) {
          return this
        }
      }
      if (data.stopped) {
        if (origEventData) {
          origEventData.stopped = true
          data.cancelBubble()
        }
        return this
      }
    }

    if (data.bubbles && this.parent && this.parent.emit) {
      this.parent.emit(name, data)
    }

    return this.defaultPrevented
  }

})

class Emitter extends mix(Object).with(EventsManager) {}

module.exports = {
  Event,
  EventsManager,
  Emitter,
}

window.Emitter = Emitter
window.Event = Event
window.EventManager = EventsManager
