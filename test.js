var List = require('./index.js')

var l = List.of('one', 2, 3.01)
var m = l.clone()

console.log(l.remove(i => isNaN(i)))
console.log(l)
console.log(m.drop(i => !isNaN(i)))
console.log(isNaN(3.01))
