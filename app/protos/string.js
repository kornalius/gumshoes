const Scanner = require('str-scan')
const { parse } = require('levn')
const { format } = require('string-kit')
const underscore_string = require('underscore.string')
const is = require('is_js')
const { instanceFunctions, instanceFunction } = require('../utils.js')


instanceFunction(String.prototype, 'parse', parse)

instanceFunction(String.prototype, 'format', format)

instanceFunction(String.prototype, 'scan', function () { return new Scanner(this) })

let oldReplace = String.prototype.replace
instanceFunction(String.prototype, 'replace', function (find, replace, ignorecase) {
  return oldReplace.call(this, find, replace, ignorecase ? 'i' : '')
}, true)

instanceFunction(String.prototype, 'splice', function (start = 0, count = this.length, str = '') {
  return this.slice(0, start) + str + this.slice(start + count)
})

instanceFunctions(String.prototype, underscore_string.exports(), [
  'chop',
  'classify',
  'clean',
  'count',
  'lastIndexOf',
  'levenshtein',
  'replaceAll',
  'sprintf',
  'surround',
  'swapCase',
  'uncamelcase',
  'uncapitalize',
  'undasherize',
  'unsurround',
  'upper',
  'lower',
])

instanceFunctions(String.prototype, is, [
  ['is.space', 'space'],
  ['is.url', 'url'],
  ['is.email', 'email'],
  ['is.creditCard', 'creditCard'],
  ['is.alphaNum', 'alphaNumeric'],
  ['is.time', 'timeString'],
  ['is.date', 'dateString'],
  ['is.zipCode', 'usZipCode'],
  ['is.postalCode', 'caPostalCode'],
  ['is.ukPostCode', 'ukPostCode'],
  ['is.phone', 'nanpPhone'],
  ['is.euPhone', 'eppPhone'],
  ['is.sSN', 'socialSecurityNumber'],
  ['is.char', 'char'],
  ['is.affirmative', 'affirmative'],
  ['is.hex', 'hexadecimal'],
  ['is.hexColor', 'hexColor'],
  ['is.ip', 'ip'],
  ['is.ipv4', 'ipv4'],
  ['is.ipv6', 'ipv6'],
  ['is.upper', 'upperCase'],
  ['is.lower', 'lowerCase'],
  ['is.capitalized])', 'capitalized'],
])
