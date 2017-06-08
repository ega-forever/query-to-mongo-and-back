const transformCriteria = require('./libs/transformCriteria'),
  transformOptions = require('./libs/transformOptions');


module.exports = (criteria, options) => {

  return [transformCriteria(criteria), transformOptions(options)].join('&');

};