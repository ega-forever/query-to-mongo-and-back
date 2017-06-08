const _ = require('lodash');

module.exports = (key, value) => {

  let types = {
    $exists: () => value.$exists ? key : `!${key}`,
    $in: () => `${key}=${value.$in.join(',')}`,
    $nin: () => `${key}!=${value.$nin.join(',')}`,
    $gt: () => `${key}>${value.$gt}`,
    $gte: () => `${key}>=${value.$gte}`,
    $lt: () => `${key}<${value.$lt}`,
    $lte: () => `${key}<=${value.$lte}`
  };

  return _.chain(types)
    .get(Object.keys(value)[0], () => null)
    .thru(f => f())
    .value();

};