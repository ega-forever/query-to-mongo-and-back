const _ = require('lodash'),
  comparatorToQuery = require('./comparatorToQuery');

module.exports = (criteria)=> _.chain(criteria)
  .transform((result, value, key) => {
    if (_.isObject(value)) {
      let res = comparatorToQuery(key, value);
      if (res)
        result.push(res)

    } else {
      result.push(`${key}=${value}`)
    }

    return result;

  }, [])
  .join('&')
  .value();