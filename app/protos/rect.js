const Point = require('./point')

let Rect = class {}

const serialize = function (x = 0, y = 0, w = 0, h = 0) {
  return x instanceof Rect ? { x: x.x, y: x.y, w: x.w, h: x.h } : { x, y, w, h }
}

Rect = class Rect {

  constructor (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  clear () {
    this.x = 0
    this.y = 0
    this.w = 0
    this.h = 0
    return this
  }

  get right () { return this.x + this.w }
  get bottom () { return this.y + this.h }

  get topLeft () { return new Point(this.left, this.top) }
  get topRight () { return new Point(this.right, this.top) }
  get bottomLeft () { return new Point(this.left, this.bottom) }
  get bottomRight () { return new Point(this.right, this.bottom) }

  get center () { return new Point(this.x + this.halfWidth, this.y + this.halfHeight) }
  get centerLeft () { return new Point(this.x, this.y + this.halfHeight) }
  get centerRight () { return new Point(this.x + this.w, this.y + this.halfHeight) }
  get centerTop () { return new Point(this.x + this.halfWidth, this.y) }
  get centerBottom () { return new Point(this.x + this.halfWidth, this.y + this.h) }

  get isEmpty () { return this.x === 0 && this.y === 0 && this.w === 0 && this.h === 0 }

  set right (value) { this.x = value - this.w }
  set bottom (value) { this.y = value - this.h }

  set topLeft (value) { this.left = value.x; this.top = value.y }
  set topRight (value) { this.right = value.x; this.top = value.y }
  set bottomLeft (value) { this.left = value.x; this.bottom = value.y }
  set bottomRight (value) { this.right = value.x; this.bottom = value.y }

  set center (value) { this.x = value.x - this.halfWidth; this.y = value.y - this.halfHeight }

  add (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x += x
    this.y += y
    this.w += w
    this.h += h
    return this
  }

  sub (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x -= x
    this.y -= y
    this.w -= w
    this.h -= h
    return this
  }

  mul (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x *= x
    this.y *= y
    this.w *= w
    this.h *= h
    return this
  }

  div (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x /= x
    this.y /= y
    this.w /= w
    this.h /= h
    return this
  }

  set (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    return this
  }

  inflate (w, h) {
    let c = this.center
    this.x = c.x - Math.floor(w / 2)
    this.y = c.y - Math.floor(h / 2)
    this.w = w
    this.h = h
    return this
  }

  clone () {
    return new Rect(this.x, this.y, this.w, this.h)
  }

  lt (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x < this.x && y < this.y && w < this.w && h < this.h
  }

  gt (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x > this.x && y > this.y && w > this.w && h > this.h
  }

  le (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x <= this.x && y <= this.y && w <= this.w && h <= this.h
  }

  ge (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x >= this.x && y >= this.y && w >= this.w && h >= this.h
  }

  eq (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x === this.x && y === this.y && w === this.w && h === this.h
  }

  ne (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return x !== this.x || y !== this.y || w !== this.w || h !== this.h
  }

  interpolate (v, f) {
    return new Rect((this.x + v.x) * f, (this.y + v.y) * f, (this.w + v.w) * f, (this.h + v.h) * f)
  }

  moveTo (x, y) {
    this.x = x
    this.y = y
    return this
  }

  offset (dx, dy) {
    this.x += dx
    this.y += dy
    return this
  }

  canFit (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))
    return this.w >= w - 1 && this.h >= h - 1
  }

  contains (x, y, w, h) {
    if (x instanceof Rect) {
      return x.x >= this.x && x.right <= this.right && x.y >= this.y && x.bottom <= this.bottom
    }
    else if (_.isNumber(x) && _.isNumber(y) && _.isNumber(w) && _.isNumber(h)) {
      return x >= this.x && y + w <= this.right && y >= this.y && y + h <= this.bottom
    }
    else if (x instanceof Point) {
      return this.x <= x.x && x.x < this.right && this.y <= x.y && x.y < this.bottom
    }
    else if (_.isNumber(x) && _.isNumber(y)) {
      return this.x <= x && x < this.right && this.y <= y && y < this.bottom
    }
    else {
      return false
    }
  }

  union (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))

    let l1 = this.x
    let l2 = x
    let r1 = l1 + this.w
    let r2 = l2 + w
    let t1 = this.y
    let t2 = y
    let b1 = t1 + this.h
    let b2 = t2 + h

    let l = l1 < l2 ? l1 : l2
    let t = t1 < t2 ? t1 : t2
    let r = r1 > r2 ? r1 : r2
    let b = b1 > b2 ? b1 : b2

    return new Rect(l, t, r - l, b - t)
  }

  intersect (x, y, w, h) {
    ({ x, y, w, h } = serialize(x, y, w, h))

    let left
    let right
    let top
    let bottom

    let l1 = this.x
    let l2 = x
    let r1 = this.x + this.w
    let r2 = x + w

    if (l2 >= r1) {
      return new Rect()
    }
    else {
      left = l2 > l1 ? l2 : l1
    }

    if (r2 <= l1) {
      return new Rect()
    }
    else {
      right = r2 > r1 ? r1 : r2
    }

    let t1 = this.y
    let t2 = y
    let b1 = this.y + this.h
    let b2 = y + h

    if (t2 >= b1) {
      return new Rect()
    }
    else {
      top = t2 > t1 ? t2 : t1
    }

    if (b2 <= t1) {
      return new Rect()
    }
    else {
      bottom = b2 > b1 ? b1 : b2
    }

    return new Rect(left, top, right - left, bottom - top)
  }

  intersects (x, y, w, h) {
    return !this.intersect(x, y, w, h).isEmpty
  }

  flip () {
    return new Rect(this.x, this.y, this.h, this.w)
  }

  flattenXAt (x) {
    return new Rect(x, this.y, 0, this.h)
  }

  flattenYAt (y) {
    return new Rect(this.x, y, this.w, 0)
  }

  forEachPoints (cb, context = this) {
    for (let x = this.left, x2 = this.right; x < x2; x++) {
      for (let y = this.top, y2 = this.bottom; y < y2; y++) {
        cb.call(context, x, y)
      }
    }
  }

  toString () {
    return '(x=' + this.x + ', y=' + this.y + ', w=' + this.w + ', h=' + this.h + ')'
  }

  toArray () {
    return [this.x, this.y, this.w, this.h]
  }

}

window.Rect = Rect
