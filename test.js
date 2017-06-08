const qm = require('./index');

let query = 'name=john&by=123&s!=1,2,3&age<=21&fields=name,age&sort=name,-age&skip=10&limit=10';

let q = qm.fromQuery(query);

console.log(require('util').inspect(q, null, 3));

let qb_query = qm.toQuery(q.criteria, q.options);

console.log(query === qb_query);
console.log(qb_query);

/*

 { criteria: { name: 'john', age: { '$gt': 21 } },
 options:
 { fields: { name: true, age: true },
 sort: { name: 1, age: -1 },
 skip: 10,
 limit: 10 } }


 */