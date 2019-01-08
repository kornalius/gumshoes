const proto = Polymer.Element.prototype

_.extend(proto, {

  get $el () {
    if (!this._$el) {
      this._$el = $(this)
    }
    return this._$el
  },

  async: function (fn, delay) { Polymer.Async.timeOut.after(delay).run(fn) },

  fire: function (name, detail) {
    // console.log(this, name, detail)
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail }))
  },

  setStyles: function (styles) {
    for (let name in styles) {
      this.style[name] = styles[name]
    }
  },

})

const getOwnPropertyDescriptorDeep = function (proto, name) {
  let desc = Object.getOwnPropertyDescriptor(proto, name)
  let p = Object.getPrototypeOf(proto)
  if (!desc && p) {
    desc = getOwnPropertyDescriptorDeep(p, name)
  }
  return desc
}

// mixin jQuery functions
for (let name in $.fn) {
  if (!getOwnPropertyDescriptorDeep(proto, name)) {
    proto[name] = (function (name) {
      return function () {
        return this.$el[name](...arguments)
      }
    })(name)
  }
}
