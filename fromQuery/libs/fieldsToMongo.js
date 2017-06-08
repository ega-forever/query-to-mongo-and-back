const _ = require('lodash');

module.exports = (fields, options = {})=> {
  return _.chain(fields)
    .split(',')
    .compact()
    .transform((result, field) => {
      result[field.trim()] = !options.omit;
    }, {})
    .value();
};