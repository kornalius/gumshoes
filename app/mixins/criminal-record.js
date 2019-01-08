const _THEFT = 0
const _ROBERY = 1
const _VANDALISM = 2
const _ASSAULT = 3
const _MURDER = 4
const _RAPE = 5
const _KIDNAPPING = 6
const _FORGERY = 7
const _DRUG_POSSESION = 8
const _FIREARM_POSSESION = 9
const _PUBLIC_ORDER = 10
const _DUI = 11

const _FINE = 0
const _JAIL = 1
const _COMMUNITY = 2
const _PROBATION = 3

module.exports = superclass => class CriminalRecord extends superclass {

  constructor () {
    super(...arguments)

    this._crimes = [
      {
        code: _THEFT,
        sentence: {
          type: _FINE,
          judge: undefined,
          sentence_date: undefined,
          location: undefined,
          amount: 0,
          years: 0,
        }
      }
    ]
  }

  get crimes () { return this._crimes }

  dangerous_crime (code) {
    return _.includes([_ASSAULT, _MURDER, _RAPE, _KIDNAPPING], code)
  }

}
