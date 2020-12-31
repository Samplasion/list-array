"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
/**
 * A drop-in array replacement.
 *
 * @export
 * @class List
 * @extends {Array<T>}
 * @template T The elements contained in this List
 */
class List extends Array {
    constructor(...args) {
        super(...args);
    }
    static from(arr, mapFn, thisArg) {
        return List.fromArray(Array.from(arr, mapFn, thisArg));
    }
    /**
     * Generates a new List from the Array.
     * @param arr The array or List from which to generate this List.
     */
    static fromArray(arr = []) {
        return new List(...arr);
    }
    /**
     * Checks whether `candidate` is a List.
     * @param candidate The object to check
     */
    static isList(candidate) {
        return candidate instanceof List;
    }
    static range(a, b, inclusive = false) {
        let min, max;
        if (typeof b == "number") {
            min = Math.min(a, b),
                max = Math.max(a, b) + (inclusive ? 1 : 0);
        }
        else {
            min = Math.min(a, 0),
                max = Math.max(a, 0) + (b ? 1 : 0);
        }
        return List.from({ length: max - min }).map((_, index) => index + min);
    }
    /**
     * The String tag.
     */
    get [Symbol.toStringTag]() {
        return 'List';
    }
    /**
     * The first element of the List, or `undefined` if the length is 0.
     */
    get first() {
        return this[0];
    }
    /**
     * The last element of the List, or `undefined` if the length is 0.
     */
    get last() {
        return this.get(-1);
    }
    /**
     * Clones this List into an equivalent List.
     */
    clone() {
        return List.from([...this]);
    }
    concat(...items) {
        return List.from(super.concat(...items));
    }
    /**
     * Returns the elements in even positions.
     */
    even() {
        return List.fromArray(this.filter((_, index) => index % 2 === 0));
    }
    /**
     * Determines whether none the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(predicate, thisArg) {
        return super.every(predicate, thisArg);
    }
    filter(predicate, thisArg) {
        return List.from(super.filter(predicate, thisArg));
    }
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flatten(depth = 1) {
        var flattend = new List();
        (function flat(array, depth) {
            for (let el of array) {
                if (Array.isArray(el) && depth > 0) {
                    flat(el, depth - 1);
                }
                else {
                    flattend.push(el);
                }
            }
        })(this, Math.floor(depth) || 1);
        return flattend;
    }
    /**
     * Gets an element at the specified index. If the index is below 0, it
     * returns the element starting from the end.
     * @param index The index of the element to get.
     */
    get(index) {
        if (typeof index !== "number")
            throw new TypeError("The index must be a number");
        if (index < 0)
            index += this.length;
        return this[index];
    }
    /**
     * Sets an element at the specified index. If the index is below 0, it
     * returns the element starting from the end.
     * If you want to set a specific negative index, it's better to
     * use subscript notation (`array[index] = value;`).
     * If the index is out of bounds, (that is, if `Math.abs(index)` is outside
     * the range 0-`this.length`) the element won't be recognized
     * by the looping methods (`forEach`, `map`, `reduce` etc.)
     * @param index The index of the element to set.
     */
    set(index, value) {
        if (typeof index !== "number")
            throw new TypeError("The index must be a number");
        if (index < 0)
            index += this.length;
        return this[index] = value;
    }
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map(callbackfn, thisArg) {
        return List.from(super.map(callbackfn, thisArg));
    }
    /**
     * Determines whether none the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    none(predicate, thisArg) {
        return this.every((v, i, a) => !predicate(v, i, a), thisArg);
    }
    /**
     * Returns the elements in even positions.
     */
    odd() {
        return List.fromArray(this.filter((_, index) => index % 2 !== 0));
    }
    /**
     * Concatenates an array.
     * @param array The array to concatenate
     * @deprecated Switch to `List#concat`
     */
    pushArray(array) {
        this.push(...array);
        return this;
    }
    random(count = 1, unique = true) {
        const self = this.shuffle(true);
        const length = self.length;
        const arr = new List();
        for (let i = 0; i < Math.max(0, Math.min(length, count)); i++) {
            arr.push(self[0]);
            if (unique) {
                self.shift();
            }
            self.shuffle();
        }
        return count == 1 ? arr[0] : arr;
    }
    reduce(callbackfn, initialValue) {
        return super.reduce(callbackfn, initialValue);
    }
    reduceRight(callbackfn, initialValue) {
        return super.reduceRight(callbackfn, initialValue);
    }
    shuffle(copy = false) {
        if (copy)
            return this.clone().shuffle();
        for (let i = this.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this[i], this[j]] = [this[j], this[i]];
        }
        return this;
    }
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    slice(start, end) {
        return List.from(super.slice(start, end));
    }
    splice(start, deleteCount, ...items) {
        return List.from(super.splice(start, deleteCount, ...items));
    }
    /**
     * Returns a JavaScript Array with the elements of this List.
     */
    toArray() {
        return [...this];
    }
    /**
     * Returns an Array-like object.
     * Keep in mind that if you set a custom property through
     * `set()`, it'll be lost.
     */
    toObject() {
        return this.reduce((prev, cur, index) => {
            return Object.assign(Object.assign({}, prev), { [index]: cur });
        }, { length: this.length });
    }
    /**
     * Returns the unique elements of this List.
     */
    unique() {
        return this.filter((v, i, l) => l.indexOf(v) == i);
    }
}
exports.List = List;
