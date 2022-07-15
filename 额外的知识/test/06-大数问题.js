const jsonBig = require('json-bigint')({ storeAsString: true })
const str =
  '[{"id": 1302900300041101987}, {"id": 1205340366642205763}, {"id": 7689021398237123422}]'
const arr = jsonBig.parse(str)
console.log(arr)
