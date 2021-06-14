/**
 * Validates the argument to be not undefined.
 * Resolves if the variable isn't null.
 * Rejects if undefined.
 * @param {*} supposedNotUndefinedArg
 * @returns { Promise }
 */
export default async function validateNotUndefined(supposedNotUndefinedArg) {
  return new Promise((resolve, reject) => {
    if (typeof supposedNotUndefinedArg == "undefined") {
      reject(TypeError("The passed argument can't be undefined."));
    } else {
      resolve(supposedNotUndefinedArg);
    }
  });
}
