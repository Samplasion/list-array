// Borrowed from ES2019 typings
type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
}[Depth extends -1 ? "done" : "recur"];

export default class List<T> extends Array<T> {
    constructor(...args: T[]) {
        super(...args);
    }

    /**
     * Generates a new List from the Array-like object/iterable. Follows the
     * semantics of `Array.from`.
     * @param arr The array or List from which to generate this List.
     * @param mapFn An optional mapping function.
     * @param thisArg The argument to use as `this` in the mapping function.
     */
    static from<T>(arr: ArrayLike<T>): List<T>;
    static from<T, U>(arr: ArrayLike<T>, mapFn?: (v: T, k: number) => U, thisArg?: any): List<U> {
        return List.fromArray(Array.from(arr, mapFn, thisArg));
    }

    /**
     * Generates a new List from the Array.
     * @param arr The array or List from which to generate this List.
     */
    static fromArray<T>(arr: T[] = []) {
        return new List<T>(...arr);
    }

    /**
     * Checks whether `candidate` is a List.
     * @param candidate The object to check
     */
    static isList<T>(candidate: T | {}): candidate is T extends Readonly<List<any>> ? (unknown extends T ? never : Readonly<List<any>>) : List<any> {
        return candidate instanceof List;
    }

    static range(max: number, inclusive?: boolean): List<number>
    static range(min: number, max: number, inclusive?: boolean): List<number>
    static range(a: number, b: number | boolean, inclusive = false): List<number> {
        let min: number, max;
        if (typeof b == "number") {
            min = Math.min(a, b),
            max = Math.max(a, b) + (inclusive ? 1 : 0);
        } else {
            min = Math.min(a, 0),
            max = Math.max(a, 0) + (b ? 1 : 0);
        }

        return List.from({ length: max - min }).map((_, index) => index + min);
    }

    /**
     * The String tag.
     */
    get [Symbol.toStringTag](): 'List' {
        return 'List'
    }

    /**
     * Returns the first element of the List, or `undefined` if the length is 0.
     */
    get first(): T | undefined {
        return this[0];
    }

    /**
     * The last element of the List, or `undefined` if the length is 0.
     */
    get last(): T | undefined {
        return this.get(-1);
    }

    /**
     * Clones this List into an equivalent List.
     */
    clone(): List<T> {
        return List.from([...this]);
    }

    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(...items: Array<ConcatArray<T>>): List<T>;
    concat(...items: Array<T | ConcatArray<T>>): List<T> {
        return List.from(super.concat(...items));
    }
    
    /**
     * Returns the elements in even positions.
     */
    even(): List<T> {
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
    every(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): boolean {
        return super.every(predicate, thisArg);
    }

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): List<T>;
    filter<S extends T>(predicate: (value: T, index: number, array: List<T>) => value is S, thisArg?: any): List<S> {
        return List.from(super.filter(predicate, thisArg));
    }
    
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flatten<U extends any>(depth = 1): List<U> {
        var flattend = new List<U>();
        (function flat(array: List<T>, depth) {
            for (let el of array) {
                if (Array.isArray(el) && depth > 0) {
                    flat(el as unknown as List<any>, depth - 1);
                } else {
                    flattend.push(el as unknown as U);
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
    get(index: number): T | undefined {
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
    set(index: number, value: T) {
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
    map<U>(callbackfn: (value: T, index: number, array: List<T>) => U, thisArg?: any): List<U> {
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
    none(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): boolean {
        return this.every((v, i, a) => !predicate(v, i, a), thisArg);
    }

    /**
     * Returns the elements in even positions.
     */
    odd(): List<T> {
        return List.fromArray(this.filter((_, index) => index % 2 !== 0));
    }

    /**
     * Concatenates an array.
     * @param array The array to concatenate
     * @deprecated Switch to `List#concat`
     */
    pushArray(array: T[]): this {
        this.push(...array);
        return this;
    }

    // Return T[] if there's more than one element returned, otherwise T.
    /**
     * Returns one or more random elements from this List.
     * @param count The number of random elements to return (randomized).
     * @param unique Whether the elements should be unique.
     */
    random(count: 1, unique?: boolean): T;
    random(count?: number, unique?: boolean): T[];
    random(count: number = 1, unique = true): T | T[] {
        const self = this.shuffle(true);
        const length = self.length;
        
        const arr = new List<T>();
        for (let i = 0; i < Math.max(0, Math.min(length, count)); i++) {
            arr.push(self[0]);
            if (unique) {
                self.shift();
            }
            self.shuffle();
        }

        return count == 1 ? arr[0] : arr;
    }

    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: List<T>) => U, initialValue: U): U;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue?: T): T {
        return super.reduce(callbackfn, initialValue);
    }

    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: List<T>) => U, initialValue: U): U;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue?: T): T {
        return super.reduceRight(callbackfn, initialValue);
    }

    /**
     * Shuffles the list using the Durstenfeld algorithm.
     * @param copy Whether to copy the List or shuffle in-place.
     */
    shuffle(copy?: false): this;
    shuffle(copy: true): List<T>;
    shuffle(copy = false): List<T> {
        if (copy) return this.clone().shuffle();

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
    slice(start?: number, end?: number): List<T> {
        return List.from(super.slice(start, end));
    }

    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     */
    splice(start: number, deleteCount?: number): List<T>;
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    splice(start: number, deleteCount: number, ...items: List<T>): List<T>;
    splice(start: number, deleteCount? : number, ...items: List<T>): List<T> {
        return List.from(super.splice(start, deleteCount, ...items));
    }

    /**
     * Returns a JavaScript Array with the elements of this List.
     */
    toArray(): T[] {
        return [...this];
    }

    /**
     * Returns an Array-like object.
     * Keep in mind that if you set a custom property through
     * `set()`, it'll be lost.
     */
    toObject(): ArrayLike<T> {
        return this.reduce<ArrayLike<T>>((prev, cur, index) => {
            return {
                ...prev,
                [index]: cur
            }
        }, { length: this.length });
    }

    /**
     * Returns the unique elements of this List.
     */
    unique(): List<T> {
        return this.filter((v, i, l) => l.indexOf(v) == i);
    }
}