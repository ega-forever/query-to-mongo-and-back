const _ = require('lodash'),
  typedValue = require('./typedValue');

module.exports = (arrValue) => {
  let commaSplit = /("[^"]*")|('[^']*')|([^,]+)/g;
  return _.transform(arrValue.match(commaSplit), (result, value) => {
    result.push(typedValue(value))
  }, []);
};