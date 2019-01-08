const math = require('mathjs')
const { instanceFunction, instanceFunctions } = require('../utils.js')

Math.PI2 = Math.PI * 2

instanceFunction(Math, 'round', function (value, places, increment) {
  increment = increment || 1e-20
  let factor = 10 / (10 * (increment || 10))
  return Number((Math.ceil(factor * Number(value)) / factor).toFixed(places))
})

instanceFunction(Math, 'sign', function (value) {
  if (value > 0) {
    return 1
  }
  else if (value < 0) {
    return -1
  }
  else {
    return 0
  }
})

instanceFunction(Math, 'roundCeil', function (value, places) {
  let powed = Math.pow(10, places)
  return Math.ceil(value * powed) / powed
})

instanceFunction(Math, 'wrap', function (value, min, max) {
  if (min > max) {
    let ref = [max, min]
    min = ref[0]
    max = ref[1]
  }
  if (value < min) {
    return min
  }
  else if (value > max) {
    return max
  }
  else {
    return value
  }
})

instanceFunction(Math, 'loop', function (value, min, max) {
  if (min === max) {
    return min
  }
  else {
    if (min > max) {
      let ref = [max, min]
      min = ref[0]
      max = ref[1]
    }
    let vol = max - min
    let val = value - max
    while (val < 0) {
      val += vol
    }
    return val % vol + min
  }
})

instanceFunction(Math, 'add', function () {
  let num = 0
  for (let v of arguments) {
    num += v
  }
  return num
})

instanceFunction(Math, 'sub', function () {
  let num = 0
  let first = true
  for (let v of arguments) {
    if (first) {
      num = v
    }
    else {
      num -= v
    }
  }
  return num
})

instanceFunction(Math, 'mul', function () {
  let num = 1
  for (let v of arguments) {
    num *= v
  }
  return num
})

instanceFunction(Math, 'div', function () {
  let num = 0
  let first = true
  for (let v of arguments) {
    if (first) {
      num = v
    }
    else {
      num /= v
    }
  }
  return num
})

instanceFunction(Math, 'maxAdd', function (value, amount, max) { return Math.min(value + amount, max) })

instanceFunction(Math, 'minSub', function (value, amount, min) { return Math.max(value - amount, min) })

instanceFunction(Math, 'radToDeg', function (value) { return value * 57.29577951308232 })

instanceFunction(Math, 'degToRad', function (value) { return value * 0.017453292519943295 })

instanceFunction(Math, 'angleBetween', function (x1, y1, x2, y2) { return Math.atan2(y2 - y1, x2 - x1) })

instanceFunction(Math, 'angleBetweenY', function (x1, y1, x2, y2) { return Math.atan2(x2 - x1, y2 - y1) })

instanceFunction(Math, 'angleBetweenPoints', function (point1, point2) { return Math.atan2(point2.y - point1.y, point2.x - point1.x) })

instanceFunction(Math, 'angleBetweenPointsY', function (point1, point2) { return Math.atan2(point2.x - point1.x, point2.y - point1.y) })

instanceFunction(Math, 'reverseAngle', function (angleRad) { return this.normalizeAngle(angleRad + Math.PI, true) })

instanceFunction(Math, 'normalizeAngle', function (angleRad) {
  angleRad %= Math.PI2
  return angleRad >= 0 ? angleRad : angleRad + Math.PI2
})

instanceFunction(Math, 'clockwise', function (from, to, range) {
  while (to > from) {
    to -= range
  }
  while (to < from) {
    to += range
  }
  return to - from
})

instanceFunction(Math, 'nearer', function (from, to, range) {
  let c = Math.clockwise(from, to, range)
  return c >= range * 0.5 ? c - range : c
})

instanceFunction(Math, 'avg', function () { return Math.add.apply(Math, arguments) / arguments.length })

instanceFunction(Math, 'between', function (from, to, ratio) { return from + (to - from) * ratio })

instanceFunction(Math, 'linear', function (p0, p1, t) { return (p1 - p0) * t + p0 })

instanceFunction(Math, 'fuzzyEqual', function (a, b, epsilon = 0.0001) { return Math.abs(a - b) < epsilon })

instanceFunction(Math, 'fuzzyLessThan', function (a, b, epsilon = 0.0001) { return a < b + epsilon })

instanceFunction(Math, 'fuzzyGreaterThan', function (a, b, epsilon = 0.0001) { return a > b - epsilon })

instanceFunction(Math, 'fuzzyCeil', function (val, epsilon = 0.0001) { return Math.ceil(val - epsilon) })

instanceFunction(Math, 'fuzzyFloor', function (val, epsilon = 0.0001) { return Math.floor(val + epsilon) })

instanceFunction(Math, 'shear', function (val) { return val % 1 })

let oldMathRandom = Math.random
instanceFunction(Math, 'random', function () {
  let nums = arguments
  if (nums.length === 0) {
    return oldMathRandom()
  }
  else if (nums.length === 1) {
    return Math.floor(oldMathRandom() * nums[0])
  }
  else {
    return Math.floor(oldMathRandom() * (nums[1] - nums[0] + 1) + nums[0])
  }
}, true)

instanceFunction(Math, 'linearInterpolation', function (v, k) {
  let m = v.length - 1
  let f = m * k
  let i = Math.floor(f)
  if (k < 0) {
    return this.linear(v[0], v[1], f)
  }
  if (k > 1) {
    return this.linear(v[m], v[m - 1], m - f)
  }
  return this.linear(v[i], v[i + 1 > m ? m : i + 1], f - i)
})

instanceFunction(Math, 'bezierInterpolation', function (v, k) {
  let b = 0
  let n = v.length - 1
  for (let i = 0; i <= n; i++) {
    b += Math.pow(1 - k, n - i) * Math.pow(k, i) * v[i] * this.bernstein(n, i)
  }
  return b
})

instanceFunction(Math, 'factorial', function (value) {
  if (value === 0) {
    return 1
  }
  let res = value
  while (--value) {
    res *= value
  }
  return res
})

instanceFunction(Math, 'difference', function (a, b) { return Math.abs(a - b) })

instanceFunction(Math, 'distance', function (x1, y1, x2, y2) {
  let dx = x1 - x2
  let dy = y1 - y2
  return Math.sqrt(dx * dx + dy * dy)
})

instanceFunction(Math, 'distanceSq', function (x1, y1, x2, y2) {
  let dx = x1 - x2
  let dy = y1 - y2
  return dx * dx + dy * dy
})

instanceFunction(Math, 'distancePow', function (x1, y1, x2, y2, pow = 2) { return Math.sqrt(Math.pow(x2 - x1, pow) + Math.pow(y2 - y1, pow)) })

instanceFunction(Math, 'clamp', function (v, min, max) {
  if (v < min) {
    return min
  }
  else if (max < v) {
    return max
  }
  else {
    return v
  }
})

instanceFunction(Math, 'clampBottom', function (x, a) { return x < a ? a : x })

instanceFunction(Math, 'within', function (a, b, tolerance) { return (Math.abs(a - b) <= tolerance) })

instanceFunction(Math, 'mapLinear', function (x, a1, a2, b1, b2) { return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 ) })

instanceFunction(Math, 'smoothstep', function (x, min, max) {
  x = Math.max(0, Math.min(1, (x - min) / (max - min)))
  return x * x * (3 - 2 * x)
})

instanceFunction(Math, 'smootherstep', function (x, min, max) {
  x = Math.max(0, Math.min(1, (x - min) / (max - min)))
  return x * x * x * (x * (x * 6 - 15) + 10)
})

instanceFunction(Math, 'percent', function (a, b, base = 0) {
  if (a > b || base > b) {
    return 1
  }
  else if (a < base || base > a) {
    return 0
  }
  else {
    return (a - base) / b
  }
})

instanceFunctions(Math, math, [
  'E',
  'i',
  'Infinity',
  'LN2',
  'LN10',
  'LOG2E',
  'LOG10E',
  'phi',
  'pi',
  'SQRT1_2',
  'SQRT2',
  'lsolve',
  'lup',
  'lusolve',
  'slu',
  'usolve',
  'cbrt',
  'cube',
  'dotDivide',
  'dotMultiply',
  'dotPow',
  'fix',
  'gcd',
  'hypot',
  'lcm',
  'mod',
  'norm',
  'nthRoot',
  'unaryMinus',
  'unaryPlus',
  'xgcd',
  'bitAnd',
  'bitNot',
  'bitOr',
  'bitXor',
  'leftShift',
  'rightArithShift',
  'rightLogShift',
  'bellNumbers',
  'catalan',
  'composition',
  'stirlingS2',
  'mean',
  'median',
  'mode',
  'prod',
  'std',
  'combinations',
  'factorial',
  'gamma',
  'multinomial',
  'permutations',
  'distance',
  'intersect',
  'and',
  'or',
  'xor',
  'not',
  'unit',
  'to',
])
