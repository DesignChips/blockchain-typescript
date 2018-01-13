/**
 * Simple JS equivalent of the Python set() constructor (without the methods)
 * @requires shim: Array.prototype.indexOf
 * @param {array} arr The array to turn into a set
 * @example
 * var mySet = set(['red', 'yellow', 'black', 'yellow']);
 * mySet.length; // 3
 * JSON.stringify(mySet); // ["red","yellow","black"]
 * @see For a fuller version, see {@link https://npmjs.org/package/set}
 */
export const set = (arr: string[]) => {
  return arr.reduce((a: string[], val: string) => {
    if (a.indexOf(val) === -1) {
      a.push(val);
    }
    return a;
  }, []);
};
