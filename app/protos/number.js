const { instanceFunctions } = require('../utils.js')
const math = require('mathjs')
const is = require('is_js')

instanceFunctions(Number.prototype, Math, [
  'radToDeg',
  'degToRad',
  'sign',
  'roundCeil',
  'loop',
  'add',
  'sub',
  'mul',
  'div',
])

instanceFunctions(Number.prototype, is, [
  ['is.even', 'even'],
  ['is.odd', 'odd'],
  ['is.positive', 'positive'],
  ['is.negative', 'negative'],
  ['is.decimal', 'decimal'],
  ['is.integer', 'integer'],
  ['is.nan', 'nan'],
  ['is.finite', 'finite'],
  ['is.infinite', 'infinite'],
])

instanceFunctions(Number.prototype, math, [
  'cbrt',
  'cube',
  'nthRoot',
])
