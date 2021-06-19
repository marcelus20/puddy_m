/**
 * Promise will always resolve.
 * Resolves true if NOT undefined. Resolves false if it is undefined.
 * @param {*} arg
 * @returns
 */
export function checkIfNotUndefined(arg) {
  return Promise.resolve(typeof arg != "undefined");
}

/**
 * Promise always resolves.
 * Resolves true if arg is a function.
 * Resolves false if arg isn't a function.
 * @param {*} arg
 * @returns
 */
export function checkIfArgIsFunction(arg) {
  return Promise.resolve(typeof arg == "function");
}
