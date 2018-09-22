const deprecate = require('deprecate')

class List extends Array {
  constructor(...args) {
    super(...args)
  }
  
  static fromArray(arr) {
    var list = new List()
    list.pushArray(arr)
    return list
  }
  
  pushArray(arr) {
    arr.forEach(i => this.push(i))
    return this;
  }

  random() {
    return this[Math.floor(Math.random()*this.length)]
  }
  
  even() {
    var elems = []
      , count = 0;
    for (var i of this) {
      if (count % 2 == 0) elems.push(i)
      count++
    }
    return List.fromArr(elems)
  }
  
  odd() {
    var elems = []
      , count = 0;
    for (var i of this) {
      if (count % 2 == 1) elems.push(i)
      count++
    }
    return List.fromArr(elems)
  }

  shuffle() {
    for (var i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]]
    }
    return this
  }

  toArray() {
    var arr = []
    for (var i of this) arr.push(i)
    return arr
  }

  clone() {
    return List.fromArr(this.toArray())
  }

  none(cb) {
    return !(this.every(cb))
  }

  first() {
    return this[0]
  }

  last() {
    return this[this.length-1]
  }

  joinWithLast(last = ', ', joiner = ', ') {
    if (this.length == 0) return ''
    if (this.length == 1) return this[0]
    if (this.length == 2) return `${this[0]} ${last} ${this[1]}`
    var arr = new List()
    for (var i = 0; i < this.length - 2; i++) {
      arr.push(this[i])
    }
    return arr.join(joiner) + ` ${last} ${this.last()}`
  }

  joinAnd(jnr = ', ') {
    return this.joinWithLast('and', jnr)
  }

  joinOr(jnr = ', ') {
    return this.joinWithLast('or', jnr)
  }
}

module.exports = List
