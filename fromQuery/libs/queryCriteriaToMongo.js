const _ = require('lodash'),
  comparisonToMongo = require('./comparisonToMongo');

let queryCriteriaToMongo = (query, options = {})=> {
  let hash = {};

  Object.keys(query)
    .forEach(key => {
      if (_.has(query, key) && (!options.ignore || !options.ignore.includes(key))) {
        let p = _.isObject(query[key]) ?
          {
            key: key,
            value: queryCriteriaToMongo(query[key])
          } : comparisonToMongo(key, query[key]);
        hash[p.key] = p.value;
      }
    });
  return hash
};

module.exports = queryCriteriaToMongo;