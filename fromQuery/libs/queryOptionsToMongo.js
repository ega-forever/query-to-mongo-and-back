const _ = require('lodash'),
  fieldsToMongo = require('./fieldsToMongo'),
  sortToMongo = require('./sortToMongo');

module.exports = (query, options) => {
  let hash = {},
    fields = fieldsToMongo(query.fields),
    omitFields = fieldsToMongo(query.omit, {omit: true}),
    sort = sortToMongo(query.sort),
    maxLimit = options.maxLimit || 1000,
    limit = options.maxLimit || 0;

  if (fields)
    hash.fields = fields;
  if (!_.isEmpty(omitFields))
    hash.fields = omitFields;
  if (sort)
    hash.sort = sort;

  if (query.skip)
    hash.skip = Number(query.skip);
  if (query.limit)
    limit = Math.min(Number(query.limit), maxLimit);
  if (limit) {
    hash.limit = limit
  } else if (options.maxLimit) {
    hash.limit = maxLimit
  }

  return hash
};