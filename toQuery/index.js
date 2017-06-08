const transformCriteria = require('./libs/transformCriteria'),
  transformOptions = require('./libs/transformOptions'),
  _ = require('lodash');

module.exports = (criteria, options) =>
  _.chain([
    transformCriteria(criteria),
    transformOptions(options)
  ])
    .compact()
    .join('&')
    .value();