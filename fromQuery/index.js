const querystring = require('querystring'),
  queryCriteriaToMongo = require('./libs/queryCriteriaToMongo'),
  queryOptionsToMongo = require('./libs/queryOptionsToMongo'),
  _ = require('lodash');

module.exports = (query, options)=> {
  query = query || {};
  options = options || {};

  if (!options.ignore) {
    options.ignore = []
  } else {
    options.ignore = _.isString(options.ignore) ? [options.ignore] : options.ignore;
  }
  options.ignore = options.ignore.concat(['fields', 'omit', 'sort', 'skip', 'limit']);
  if (!options.parser)
    options.parser = querystring;

  if (_.isString(query))
    query = options.parser.parse(query);

  return {
    criteria: queryCriteriaToMongo(query, options),
    options: queryOptionsToMongo(query, options)
  }
};