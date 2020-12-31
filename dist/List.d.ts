/**
 * A drop-in array replacement.
 *
 * @export
 * @class List
 * @extends {Array<T>}
 * @template T The elements contained in this List
 */
export declare class List<T extends any> extends Array<T> {
    constructor(...args: T[]);
    /**
     * Generates a new List from the Array-like object/iterable. Follows the
     * semantics of `Array.from`.
     * @param arr The array or List from which to generate this List.
     * @param mapFn An optional mapping function.
     * @param thisArg The argument to use as `this` in the mapping function.
     */
    static from<T>(arr: ArrayLike<T>): List<T>;
    /**
     * Generates a new List from the Array.
     * @param arr The array or List from which to generate this List.
     */
    static fromArray<T>(arr?: T[]): List<T>;
    /**
     * Checks whether `candidate` is a List.
     * @param candidate The object to check
     */
    static isList<T>(candidate: T | {}): candidate is T extends Readonly<List<any>> ? (unknown extends T ? never : Readonly<List<any>>) : List<any>;
    static range(max: number, inclusive?: boolean): List<number>;
    static range(min: number, max: number, inclusive?: boolean): List<number>;
    /**
     * The String tag.
     */
    get [Symbol.toStringTag](): 'List';
    /**
     * The first element of the List, or `undefined` if the length is 0.
     */
    get first(): T | undefined;
    /**
     * The last element of the List, or `undefined` if the length is 0.
     */
    get last(): T | undefined;
    /**
     * Clones this List into an equivalent List.
     */
    clone(): List<T>;
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(...items: Array<ConcatArray<T>>): List<T>;
    /**
     * Returns the elements in even positions.
     */
    even(): List<T>;
    /**
     * Determines whether none the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): boolean;
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): List<T>;
    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flatten<U extends any>(depth?: number): List<U>;
    /**
     * Gets an element at the specified index. If the index is below 0, it
     * returns the element starting from the end.
     * @param index The index of the element to get.
     */
    get(index: number): T | undefined;
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
    set(index: number, value: T): T;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(callbackfn: (value: T, index: number, array: List<T>) => U, thisArg?: any): List<U>;
    /**
     * Determines whether none the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    none(predicate: (value: T, index: number, array: List<T>) => unknown, thisArg?: any): boolean;
    /**
     * Returns the elements in even positions.
     */
    odd(): List<T>;
    /**
     * Concatenates an array.
     * @param array The array to concatenate
     * @deprecated Switch to `List#concat`
     */
    pushArray(array: T[]): this;
    /**
     * Returns one or more random elements from this List.
     * @param count The number of random elements to return (randomized).
     * @param unique Whether the elements should be unique.
     */
    random(count: 1, unique?: boolean): T;
    random(count?: number, unique?: boolean): T[];
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T): T;
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue: T): T;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: List<T>) => U, initialValue: U): U;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T): T;
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: List<T>) => T, initialValue: T): T;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: List<T>) => U, initialValue: U): U;
    /**
     * Shuffles the list using the Durstenfeld algorithm.
     * @param copy Whether to copy the List or shuffle in-place.
     */
    shuffle(copy?: false): this;
    shuffle(copy: true): List<T>;
    /**
     * Returns a section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array. This is exclusive of the element at the index 'end'.
     */
    slice(start?: number, end?: number): List<T>;
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
    /**
     * Returns a JavaScript Array with the elements of this List.
     */
    toArray(): T[];
    /**
     * Returns an Array-like object.
     * Keep in mind that if you set a custom property through
     * `set()`, it'll be lost.
     */
    toObject(): ArrayLike<T>;
    /**
     * Returns the unique elements of this List.
     */
    unique(): List<T>;
}
