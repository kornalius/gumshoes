module.exports = superclass => class Icon extends superclass {

  constructor () {
    super(...arguments)

    this._icon = {
      name: undefined,
      color: '#000',
      size: 1,
      angle: 0,
    }
  }

  get iconName () { return this._icon.name }
  get iconColor () { return this._icon.color }
  get iconSize () { return this._icon.size }
  get iconAngle () { return this._icon.angle }

}
