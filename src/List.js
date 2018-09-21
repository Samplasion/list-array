class List extends Array {
  constructor(...args) {
    super(...args)
    console.log(typeof this)
  }

  random() {
    return this[Math.floor(Math.random()*this.length)]
  }
}

module.exports = List
