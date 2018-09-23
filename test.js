var List = require('./index.js')

var l = List.of('one', 2, 3.01)
console.log(l.even().toObject())
