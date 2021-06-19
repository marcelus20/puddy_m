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

/**
 * Resolves the trimmed version of the string passed as parameter or throws if the parameter isn't a string.
 * @param {String} stringToTrim
 */
export function validateTrim(stringToTrim) {
  return new Promise((resolve, reject) => {
    validateString(stringToTrim)
      .then((stringToTrim) => {
        try {
          // Resolves here.
          resolve(stringToTrim.trim());
        } catch (e) {
          // This block is not ever intended to fire, since the string validation was
          // done in the previous promise, however I'm handling it just in case.
          // If anything goes wrong, reject it.
          reject(e);
        }
      })
      .catch((e) => reject(e));
  });
}

/**
 * Resolves the arg if it is not undefined. 
 * Rejects if it's undefined as it fails the validation check. 
 * Resolves true if NOT undefined. Resolves false if it is undefined.
 * @param {*} supposedFunction
 * @returns {Promise}
 */
export function validateFunction(supposedFunction){
  return new Promise((resolve, reject)=>{
    if(typeof supposedFunction != "function"){
      reject(new TypeError("The given parameter isn't a function."))
    }else{
      resolve(supposedFunction)
    }
  })
}
