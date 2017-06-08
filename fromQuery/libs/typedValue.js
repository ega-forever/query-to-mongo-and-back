const _ = require('lodash');

module.exports = (value)=> {
  try {
    return JSON.parse(value);
  } catch (e) {
  }

  return _.isNaN(new Date(value).valueOf()) ? value : new Date(value);
};