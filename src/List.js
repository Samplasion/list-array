class List extends Array {
  constructor(...args) {
    super(...args)
    console.log(typeof this)
  }
  
  static fromArr(arr) {
	var list = new List(arr.length)
	arr.forEach(i => list.push(i))
	return list
  }
  
  pushArr(arr) {
	arr.forEach(i => this.push(i))
  }

  random() {
    return this[Math.floor(Math.random()*this.length)]
  }
}

module.exports = List
