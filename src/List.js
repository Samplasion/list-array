class List extends Array {
  constructor(...args) {
    super(...args)
  }
  
  static fromArr(arr) {
	var list = new List()
	list.pushArr(arr)
	return list
  }
  
  pushArr(arr) {
	arr.forEach(i => this.push(i))
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
}

module.exports = List
