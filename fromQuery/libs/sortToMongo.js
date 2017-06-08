const _ = require('lodash');

module.exports = (sort) => {
  return _.chain(sort)
    .split(',')
    .compact()
    .transform((result, field) => {
      let isNegative = field[0] === '-';
      if (isNegative)
        field = field.substr(1);

      result[field.trim()] = isNegative ? -1 : 1
    }, {})
    .value();
}