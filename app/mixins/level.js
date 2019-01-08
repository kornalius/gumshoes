const levels = 40
const xp_for_first_level = 1000
const xp_for_last_level = 1000000

const B = Math.log(xp_for_last_level / xp_for_first_level) / (levels - 1)
const A = xp_for_first_level / (Math.exp(B) - 1.0)

module.exports = superclass => class Level extends superclass {

  constructor () {
    super(...arguments)

    this._lvl = this.min_lvl
    this._xp = this.min_xp
  }

  get min_lvl () { return 1 }

  get max_lvl () { return levels }

  get lvl () { return this._lvl }
  set lvl (value) {
    value = _.clamp(value, this.min_lvl, this.max_lvl)
    if (this._lvl !== value) {
      let oldValue = this._lvl
      this._lvl = value
      this.emit('lvl-changed', value, oldValue)
    }
  }

  get xp () { return this._xp }
  set xp (value) {
    value = _.clamp(value, this.min_xp, this.max_xp)
    if (this._xp !== value) {
      let oldValue = this._xp
      this._xp = value
      this.emit('xp-changed', value, oldValue)
      if (this.shouldLevelUp) {
        this.levelUp()
      }
    }
  }

  get min_xp () { return 0 }

  get max_xp () { return this.levelXP(levels) }

  get shouldLevelUp () { return this.isAlive && this.xp >= this.levelXP(this.lvl + 1) }

  levelXP (lvl) {
    let x = Math.round(A * Math.exp(B * lvl))
    let y = 10 ** Math.round(Math.log(x) / Math.log(10) - 2.2)
    return Math.round(x / y) * y
  }

  levelUp () {
    let nxp = this.levelXP(this.lvl + 1)
    this.lvl++
    this.xp = this.xp - nxp
    this.emit('level-up')
  }

}
