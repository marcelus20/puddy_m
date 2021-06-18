/**
 * Promise will always resolve.
 * Resolves true if NOT undefined. Resolves false if it is undefined.
 * @param {*} arg
 * @returns
 */
export default async function checkIfNotUndefined(arg) {
  return Promise.resolve(typeof arg != "undefined");
}
