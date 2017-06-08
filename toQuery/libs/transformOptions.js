const _ = require('lodash');

module.exports = (options)=> _.chain(options)
  .transform((result, value, key) => {

    if (key === 'fields') {
      let fields = _.chain(value).keys().join().value();
      result.push(`${key}=${fields}`);
    }

    if (key === 'sort') {
      let sort = _.chain(value)
        .map((value, key)=> value === 1 ? key : `-${key}`)
        .join()
        .value();
      result.push(`${key}=${sort}`);
    }

    if(key === 'skip' || key === 'limit'){
      result.push(`${key}=${value}`);
    }

    return result;

  }, [])
  .join('&')
  .value();