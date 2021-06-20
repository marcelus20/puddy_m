/**
 * Validates the argument to be not null.
 * Resolves if the variable isn't null.
 * Rejects if null.
 * @param {*} supposedNotNullArg
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateNotNull(supposedNotNullArg, tuple) {
  return new Promise((resolve, reject) => {
    if (
      supposedNotNullArg == null &&
      typeof supposedNotNullArg != "undefined"
    ) {
      reject(TypeError("The passed argument can't be null."));
    } else {
      filterResolutionParam(tuple, supposedNotNullArg)
        .then(resolve)
        .catch(reject);
    }
  });
}

/**
 * Validates the argument to be not undefined.
 * Resolves if the variable isn't null.
 * Rejects if undefined.
 * @param {*} supposedNotUndefinedArg
 * @param {Array} tuple
 * @returns { Promise }
 */
export function validateNotUndefined(supposedNotUndefinedArg, tuple) {
  return new Promise((resolve, reject) => {
    if (typeof supposedNotUndefinedArg == "undefined") {
      reject(TypeError("The passed argument can't be undefined."));
    } else {
      filterResolutionParam(tuple, supposedNotUndefinedArg)
        .then(resolve)
        .catch(reject);
    }
  });
}

/**
 * Resolves the supposedNumber if it is type of number.
 * If not type of number, then it rejects
 * @param {*} supposedNumber
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateNumber(supposedNumber, tuple) {
  return new Promise((resolve, reject) => {
    validateNotNull(supposedNumber)
      .then((supposedNumber) => {
        if (typeof supposedNumber == "number") {
          filterResolutionParam(tuple, supposedNumber)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new TypeError("The passed argument isn't a number."));
        }
      })
      .catch(reject);
  });
}

/**
 * Resolves the same string if it is type of string.
 * If not type of string, then it rejects
 * @param {*} supposedString
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateString(supposedString, tuple) {
  return new Promise((resolve, reject) => {
    validateNotNull(supposedString)
      .then((supposedString) => {
        if (typeof supposedString == "string") {
          filterResolutionParam(tuple, supposedString)
            .then(resolve)
            .catch(reject);
        } else {
          reject(new TypeError("The passed argument isn't a string."));
        }
      })
      .catch(reject);
  });
}

/**
 * Resolves the trimmed version of the string passed as parameter or throws if the parameter isn't a string.
 * @param {String} stringToTrim
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateTrim(stringToTrim, tuple) {
  return new Promise((resolve, reject) => {
    validateString(stringToTrim)
      .then((stringToTrim) => {
        try {
          // Resolves here.
          filterResolutionParam(tuple, stringToTrim.trim())
            .then(resolve)
            .catch(reject);
        } catch (e) {
          // This block is not ever intended to fire, since the string validation was
          // done in the previous promise, however I'm handling it just in case.
          // If anything goes wrong, reject it.
          reject(e);
        }
      })
      .catch(reject);
  });
}

/**
 * Resolves the arg if it is not undefined.
 * Rejects if it's undefined as it fails the validation check.
 * Resolves true if NOT undefined. Resolves false if it is undefined.
 * @param {*} supposedFunction
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateFunction(supposedFunction, tuple) {
  return new Promise((resolve, reject) => {
    if (typeof supposedFunction != "function") {
      reject(new TypeError("The given parameter isn't a function."));
    } else {
      filterResolutionParam(tuple, supposedFunction)
        .then(resolve)
        .catch(reject);
    }
  });
}

/**
 * If the tuple is passed as parameter, it will get the single value and concat with the array (tuple) and resolve the tuple.
 * If tuple is undefined or not specified, it will resolve only the single value with no array at all.
 * Intended to be used as a Proxy for all the other functions that takes the tuple as the last parameter.
 * The proxy will decide whether to resolve the tuple with the value inside, or only the value.
 * This function never rejects, it always resolves.
 * @param {Array} tuple
 * @param {*} singleValue
 * @returns {Promise}
 */
export function filterResolutionParam(tuple, singleValue) {
  return new Promise((resolve) => {
    if (Array.isArray(tuple)) {
      resolve([...tuple, singleValue]); // Concat the old values from the tuple with the new singleValue.
    } else {
      resolve(singleValue);
    }
  });
}

/**
 *
 * @param {Array} supposedArray
 * @param {Array} tuple
 * @returns {Promise}
 */
export function validateArray(supposedArray, tuple) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(supposedArray)) {
      reject(new TypeError("The given parameter isn't an Array."));
    } else {
      filterResolutionParam(tuple, supposedArray).then(resolve).catch(reject);
    }
  });
}


