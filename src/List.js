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
	return List.fromArr(this.filter(i => this.indexOf(i) % 2 == 0))
  }
  
  odd() {
	return List.fromArr(this.filter(i => this.indexOf(i) % 2 != 0))
  }
}

module.exports = List
