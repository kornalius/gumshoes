const { instanceFunction, instanceFunctions } = require('../utils.js')
const ua = require('underscore.array')
const is = require('is_js')

instanceFunctions(Array.prototype, _, [
  'best',
  'chunk',
  'dropWhile',
  'repeat',
  'rest',
  'shuffle',
  'take',
  'takeRight',
  'takeSkipping',
  'takeWhile',
  'without',
  'xor',
])

instanceFunctions(Array.prototype, ua, [
  'dig',
  'rotate',
  'samples',
])

instanceFunctions(Array.prototype, is, [
  ['is.sorted', 'sorted']
])

instanceFunction(Array.prototype, 'cat', function () {
  for (let v of arguments) {
    if (_.isArray(v)) {
      this.dcat(v)
    }
    else {
      this.push(v)
    }
  }
  return this
})

// instanceFunction(Array.prototype, 'q', function (expr) { return q(this, expr) })
