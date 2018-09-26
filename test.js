var List = require('./index.js')

var l = List.of('one', 2, 3.01)
var m = l.clone()

console.log(l.remove(i => isNaN(i)))
console.log(l)
console.log(m.drop(i => !isNaN(i)))
console.log(l.toString())
var n = List.of(1, List.of(2, List.of(3, [4])))
console.log(n, n.flatten())
console.log(n.reject(i => isNaN(i)), n.flatten().reject(i => isNaN(i)))
