# query-to-mongo-and-back
Node.js package to convert query parameters into a [mongo](https://www.mongodb.org) query criteria and options and back.
Inspired by [query-to-mongo](https://github.com/pbatey/query-to-mongo) npm module.

This module is an extended version of query-to-mongo, which provides an ability of bi-direction convertation between query
and mongo requests.


## API
### queryToMongo.toQuery(query, options)
Convert the mongo request to a rest one:
```javascript
const queryToMongo = require('query-to-mongo-and-back')
let query = queryToMongo.toQuery(
  {name: 'john', age: { '$gt': 21 }},
  { limit: 10 }
)
console.log(query) //name=john&age>21&limit=10
```

### queryToMongo.fromQuery(query, options)
Convert the mongo request to a rest one:
```javascript
const queryToMongo = require('query-to-mongo-and-back')
let query = queryToMongo.toQuery('name=john&age>21&limit=10')
console.log(query)
/*
{ criteria: { name: 'john', age: { '$gt': 21 } },
  options: { fields: {}, sort: {}, limit: 10 } }
*/


```

#### options:
* **fields** fields, which you wish to select
* **sort** sort criteria
* **limit** limit of fetched results
* **skip** offset
#### returns:
* **criteria** Mongo query criteria.
* **options** Mongo query options.
