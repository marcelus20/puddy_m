/*import validateNotNull from "./validateNotNull";
import validateNotUndefined from "./validateNotUndefined";
import validateNumber from "./validateNumber";
import validateString from "./validateString";

const validators = {
  validateNotUndefined,
  validateNotNull,
  validateString,
  validateNumber,
};

export default validators;*/

/**
 * Validates the argument to be not null.
 * Resolves if the variable isn't null.
 * Rejects if null.
 * @param {*} supposedNotNullArg
 */
export function validateNotNull(supposedNotNullArg) {
  return new Promise((resolve, reject) => {
    if (
      supposedNotNullArg == null &&
      typeof supposedNotNullArg != "undefined"
    ) {
      reject(TypeError("The passed argument can't be null."));
    } else {
      resolve(supposedNotNullArg);
    }
  });
}

/**
 * Validates the argument to be not undefined.
 * Resolves if the variable isn't null.
 * Rejects if undefined.
 * @param {*} supposedNotUndefinedArg
 * @returns { Promise }
 */
export function validateNotUndefined(supposedNotUndefinedArg) {
  return new Promise((resolve, reject) => {
    if (typeof supposedNotUndefinedArg == "undefined") {
      reject(TypeError("The passed argument can't be undefined."));
    } else {
      resolve(supposedNotUndefinedArg);
    }
  });
}

/**
 * Resolves the supposedNumber if it is type of number.
 * If not type of number, then it rejects
 * @param {Number?} supposedNumber
 */
export function validateNumber(supposedNumber) {
  return new Promise((resolve, reject) => {
    validateNotNull(supposedNumber)
      .then((supposedNumber) => {
        if (typeof supposedNumber == "number") {
          resolve(supposedNumber);
        } else {
          reject(new TypeError("The passed argument isn't a number."));
        }
      })
      .catch((err) => reject(err));
  });
}

/**
 * Resolves the same string if it is type of string.
 * If not type of string, then it rejects
 * @param {*} supposedString
 */
export function validateString(supposedString) {
  return new Promise((resolve, reject) => {
    validateNotNull(supposedString)
      .then((supposedString) => {
        if (typeof supposedString == "string") {
          resolve(supposedString);
        } else {
          reject(new TypeError("The passed argument isn't a string."));
        }
      })
      .catch((err) => reject(err));
  });
}
