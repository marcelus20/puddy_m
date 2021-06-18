/**
 * Promise always resolves.
 * Resolves true if arg is a function.
 * Resolves false if arg isn't a function.
 * @param {*} arg
 * @returns
 */
export default async function checkIfArgIsFunction(arg) {
  return Promise.resolve(typeof arg == "function");
}
