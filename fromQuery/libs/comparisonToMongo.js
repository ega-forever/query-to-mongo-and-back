const _ = require('lodash'),
  typedValue = require('./typedValue'),
  typedValues = require('./typedValues');

module.exports = (key, value) => {
  let join = (value === '') ? key : key.concat('=', value);
  let parts = join.match(/^(!?[^><!=:]+)(?:([><]=?|!?=|:.+=)(.+))?$/);
  let op;

  if (!parts)
    return null;

  key = parts[1];
  op = parts[2];

  if (!op && key[0] !== '!') {
    value = {'$exists': true};
  }

  if (!op) {
    return key[0] !== '!' ? {key: key, value: {'$exists': true}} :
      {key: key.substr(1), value: {'$exists': false}};

  } else if (op === '=' || op === '!=') {

    let array = typedValues(parts[3]);
    if (array.length > 1) {
      value = op === '=' ? {'$in': array} : {'$nin': array};
    } else if (op === '!=') {
      value = {'$ne': array[0]};
    } else {
      value = array[0]
    }
    return {key: key, value: value};

  } else if (op[0] === ':' && op[op.length - 1] === '=') {
    let array = _.chain(parts)
      .nth(3)
      .split(',')
      .transform((result, value) => {
        result.push(typedValue(value))
      }, [])
      .tap(arr =>
        arr.length === 1 ? array[0] : array
      )
      .value();
    return _.set({}, `$${op.substr(1, op.length - 2)}`, array);
  } else {
    value = typedValue(parts[3]);
    if (op === '>') value = {'$gt': value};
    else if (op === '>=') value = {'$gte': value};
    else if (op === '<') value = {'$lt': value};
    else if (op === '<=') value = {'$lte': value};
    return {key: key, value: value};
  }
};