const qm = require('./index');


let qb_query = qm.fromQuery('name=john&age>21&limit=10');

console.log(qb_query);