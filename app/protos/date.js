const dm = require('date-math')
const is = require('is_js')
const { instanceFunctions } = require('../utils.js')

instanceFunctions(Date.prototype, dm, [
  'hour',
  'minute',
  'second',
  'day',
  'week',
  'month',
  'year',
])

instanceFunctions(Date.prototype, is, [
  ['is.today', 'today'],
  ['is.yesterday', 'yesterday'],
  ['is.tomorrow', 'tomorrow'],
  ['is.past', 'past'],
  ['is.future', 'future'],
  ['is.day', 'day'],
  ['is.year', 'year'],
  ['is.month', 'month'],
  ['is.leapYear', 'leapYear'],
  ['is.weekend', 'weekend'],
  ['is.weekday', 'weekday'],
  ['is.inRange', 'inDateRange'],
  ['is.lastWeek', 'inLastWeek'],
  ['is.lastMonth', 'inLastMonth'],
  ['is.lastYear', 'inLastYear'],
  ['is.nextWeek', 'inNextWeek'],
  ['is.nextMonth', 'inNextMonth'],
  ['is.nextYear', 'inNextYear'],
  ['is.quarter', 'quarterOfYear'],
  ['is.dlst', 'dayLightSavingTime'],
])
