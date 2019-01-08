
class Base extends window.Emitter {

  setOptions (options) {
    for (let name in options) {
      this[name] = options[name]
    }
  }

}

module.exports = Base
