import {
  ConditionalByNameError,
  EmailValidationError,
  AllArgsValidationError,
  IntegerValidationError,
  IntegerValidationErrorFromValue,
  IntegerValidationErrorToValue,
  NotUndefinedValidationError,
  ObjectValidationError,
  ObjectWithExistingKeyValidationError,
  ObjectWithKeysValidationError,
  StringLengthGreaterThanError,
  StringValidationError,
  AllArgsNoArgsValidationError,
  FunctionValidationError,
  StringLengthLowerThanError,
  StringLengthLowerEqualError,
  StringLengthGreaterEqualError,
  PositiveIntegersError,
  NegativeIntegersError,
} from "../models/errors";
import {
  filterResolutionParam,
  validateArray,
  validateBoolean,
  validateFunction,
  validateNotInstance,
  validateNotNull,
  validateNotUndefined,
  validateNumber,
  validateString,
  validateType,
} from "./validators";

import regeneratorRuntime from "regenerator-runtime";
import {
  PrimitiveTypes,
  PrimitiveTypesForValidateAllArgsFunction,
} from "../enums";

/**
 * This module is to keep only complex functions.
 * Definition of complex functions in this context is functions that uses one or more more functions in its
 * scope aside from the most basic functions.
 *
 * Definition of "most basic functions" are functions that must be used in all functions in this lib.
 * They are the "validateType" and "filterResolutionParam" functions
 *
 * For example: validateObject is complex because it utilises validateNotInstance and validateNotNull aside from
 * the most basic functions.
 *
 * Complex validators are to be kept in this module.
 */

/**
 * Resolves if supposedObject param is an object and not an array or rejects if any other type.
 * If tuple is specified, it will resolve an array concating the supposedBoolean value.
 * @param {*} supposedObject
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateObject = async (supposedObject, tuple) =>
  new Promise((resolve, reject) => {
    validateType(PrimitiveTypes.OBJECT, supposedObject)
      .then((supposedObject) => validateNotInstance(Array, supposedObject))
      .then(validateNotNull)
      .then((obj) => filterResolutionParam(tuple, obj))
      .then(resolve)
      .catch(() => reject(new ObjectValidationError()));
  });

/**
 *
 * @param {object} object
 * @param {Array} tuple
 * @param  {...String} desiredKeys
 */
export const validateObjectWithKeys = async (object, tuple, ...desiredKeys) =>
  new Promise((resolve, reject) => {
    validateObject(object)
      .then(() => Promise.all(desiredKeys.map(validateString)))
      .then((desiredKeys) =>
        Promise.all(
          desiredKeys.map((desiredKey) =>
            validateNotUndefined(object[desiredKey])
          )
        )
      )
      .then(() => filterResolutionParam(tuple, object))
      .then(resolve)
      .catch((e) => {
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("StringValidationError")
            ._then(new StringValidationError())
            .defaultsTo(new ObjectWithKeysValidationError())
            .decide()
        );
      });
  });

/**
 * Resolves the object if the key exists in the object eg: {name:"Foo"}, the "name" key exists in the object.
 * Rejects if an error occurs or if the object does't have the passed key.
 * @param {String} key
 * @param {Object} object
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateObjectWithExistingKey = async (key, object, tuple) =>
  new Promise((resolve, reject) => {
    validateString(key, [])
      .then((tuple) => validateObject(object, tuple))
      .then((tuple) => validateNotUndefined(object[key]))
      .then(() => filterResolutionParam(tuple, object))
      .then(resolve)
      .catch((e) =>
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("NotUndefinedValidationError")
            ._then(new ObjectWithExistingKeyValidationError())
            .defaultsTo(e)
            .decide()
        )
      );
  });

/**
 * Resolves the trimmed version of the string passed as parameter or throws if the parameter isn't a string.
 * @param {String} stringToTrim
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateTrim = async (stringToTrim, tuple) =>
  new Promise((resolve, reject) => {
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

/**
 * Resolvles the integer number if number is a true integer.
 * Rejects if number, but not integer or not a number at all.
 * @param {*} supposedInteger
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateInteger = async (supposedInteger, tuple) =>
  new Promise((resolve, reject) => {
    validateNumber(supposedInteger)
      .then((number) => [number, Number.isInteger(number)])
      .then(([number, isInteger]) =>
        isInteger
          ? filterResolutionParam(tuple, number)
          : reject(new IntegerValidationError())
      )
      .then(resolve)
      .catch(reject);
  });

/**
 * This method validates the integer that is lower or equal the limit parameter.
 * @param {Number} supposedInteger
 * @param {Array} tuple
 * @param {Number} limit
 * @returns
 */
export const validateIntegerFrom = async (supposedInteger, tuple, from) =>
  new Promise((resolve, reject) => {
    validateAllArgsInteger(supposedInteger, from)
      .then(([integer, from]) => {
        if (integer >= from) {
          filterResolutionParam(tuple, integer).then(resolve);
        } else {
          reject(new IntegerValidationErrorFromValue());
        }
      })
      .catch(reject);
  });

/**
 * This method validates the integer that is greater or equal the limit parameter.
 * @param {Number} supposedInteger
 * @param {Array} tuple
 * @param {Number} limit
 * @returns
 */
export const validateIntegerUntilLimit = async (
  supposedInteger,
  tuple,
  limit
) =>
  new Promise((resolve, reject) => {
    validateAllArgsInteger(supposedInteger, limit)
      .then(([integer, limit]) => {
        if (integer <= limit) {
          filterResolutionParam(tuple, integer).then(resolve);
        } else {
          reject(new IntegerValidationErrorToValue());
        }
      })
      .catch(reject);
  });

/**
 * Resolves the string if it's a valid email format. Eg: foo@bar.com
 * Rejects if an error occur or string doesn't pass email validation check.
 * Regular expression used in this function:
 *   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
 *
 * @param {*} supposedStringEmailFormat
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateEmail = async (supposedStringEmailFormat, tuple) =>
  new Promise((resolve, reject) => {
    validateString(supposedStringEmailFormat)
      .then(validateTrim)
      .then((trimmedString) => {
        if (
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedString)
        ) {
          filterResolutionParam(tuple, trimmedString).then(resolve);
        } else {
          reject(new EmailValidationError());
        }
      })
      .catch(reject);
  });

/**
 * Validates string if it's length is greater than the value specified in the len param.
 * Resolves if string is valid.
 * Rejects if not valid or if an error occurs.
 * Equality lenghts would fall under rejection (use validateStringLengthGreaterEqual instead).
 * @param {String} str
 * @param {Number} len
 * @param {Array} tuple
 * @returns
 */
export const validateStringLengthGreaterThan = async (str, len, tuple) =>
  new Promise((resolve, reject) => {
    validateString(str, [])
      .then((tuple) => validatePositiveIntegersIncludingZero(len, tuple))
      .then(([str, len]) => {
        if (str.length > len) {
          filterResolutionParam(tuple, str).then(resolve);
        } else {
          reject(new StringLengthGreaterThanError(str, len));
        }
      })
      .catch(reject);
  });

/**
 * Validates string if it's length is greater or equals the value specified in the len param.
 * Resolves if string is valid.
 * Rejects if not valid or if an error occurs.
 * Equality lenghts would fall under resolution.
 * @param {String} str
 * @param {Number} len
 * @param {Array} tuple
 * @returns
 */
export const validateStringLengthGreaterEqual = async (str, len, tuple) =>
  new Promise((resolve, reject) => {
    validateString(str, [])
      .then((tuple) => validatePositiveIntegersIncludingZero(len, tuple))
      .then(([str, len]) => {
        if (str.length >= len) {
          filterResolutionParam(tuple, str).then(resolve);
        } else {
          reject(new StringLengthGreaterEqualError(str, len));
        }
      })
      .catch(reject);
  });

/**
 * Validates string if it's length is lower than the value specified in the len param.
 * Resolves if string is valid.
 * Rejects if not valid or if an error occurs.
 * Equality lenghts would fall under rejection (use validateStringLengthLowerEqual instead)
 * @param {String} str
 * @param {Number} len
 * @param {Array} tuple
 * @returns
 */
export const validateStringLengthLowerThan = async (str, len, tuple) =>
  new Promise((resolve, reject) => {
    validateString(str, [])
      .then((tuple) => validatePositiveIntegersIncludingZero(len, tuple))
      .then(([str, len]) => {
        if (str.length < len) {
          filterResolutionParam(tuple, str).then(resolve);
        } else {
          reject(new StringLengthLowerThanError(str, len));
        }
      })
      .catch(reject);
  });

/**
 * Validates string if it's length is lower or equals the value specified in the len param.
 * Resolves if string is valid.
 * Rejects if not valid or if an error occurs.
 * Equality lenghts would fall under resolution.
 * @param {String} str
 * @param {Number} len
 * @param {Array} tuple
 * @returns
 */
export const validateStringLengthLowerEqual = async (str, len, tuple) =>
  new Promise((resolve, reject) => {
    validateString(str, [])
      .then((tuple) => validatePositiveIntegersIncludingZero(len, tuple))
      .then(([str, len]) => {
        if (str.length <= len) {
          filterResolutionParam(tuple, str).then(resolve);
        } else {
          reject(new StringLengthLowerEqualError(str, len));
        }
      })
      .catch(reject);
  });

/**
 * Validates the integer number if it's positive or 0
 * resolves integer if valid.
 * Rejects if an error occur or integer is below 0
 * @param {Number} supposedPositiveIncludingZeroInteger
 * @param {Array} tuple
 * @returns
 */
export const validatePositiveIntegersIncludingZero = async (
  supposedPositiveIncludingZeroInteger,
  tuple
) =>
  new Promise((resolve, reject) => {
    validateIntegerFrom(supposedPositiveIncludingZeroInteger, tuple, 0)
      .then(() =>
        filterResolutionParam(tuple, supposedPositiveIncludingZeroInteger)
      )
      .then(resolve)
      .catch(reject);
  });

/**
 * Validates the integer number if it's negative or 0
 * resolves integer if valid.
 * Rejects if an error occur or integer is above 0
 * @param {Number} supposedPositiveIncludingZeroInteger
 * @param {Array} tuple
 * @returns
 */
export const validateNegativeIntegersIncludingZero = async (
  supposedPositiveIncludingZeroInteger,
  tuple
) =>
  new Promise((resolve, reject) => {
    validateIntegerUntilLimit(supposedPositiveIncludingZeroInteger, tuple, 1)
      .then(() =>
        filterResolutionParam(tuple, supposedPositiveIncludingZeroInteger)
      )
      .then(resolve)
      .catch(reject);
  });

/**
 * Validates the integer number if it's positive, not including 0
 * resolves integer if valid.
 * Rejects if an error occur or integer is below 0
 * @param {*} supposedPositiveInteger 
 * @param {*} tuple 
 * @returns 
 */
export const validatePositiveIntegers = async (
  supposedPositiveInteger,
  tuple
) =>
  new Promise((resolve, reject) => {
    validateIntegerFrom(supposedPositiveInteger, tuple, 1)
      .then(() => filterResolutionParam(tuple, supposedPositiveInteger))
      .then(resolve)
      .catch((e) =>
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("IntegerValidationErrorFromValue")
            ._then(new PositiveIntegersError())
            .defaultsTo(e)
            .decide()
        )
      );
  });

/**
 * Validates the integer number if it's negative, not including 0
 * resolves integer if valid.
 * Rejects if an error occur or integer is above 0
 * @param {*} supposedPositiveInteger 
 * @param {*} tuple 
 * @returns 
 */
export const validateNegativeIntegers = async (
  supposedPositiveInteger,
  tuple
) =>
  new Promise((resolve, reject) => {
    validateIntegerUntilLimit(supposedPositiveInteger, tuple, -1)
      .then(() => filterResolutionParam(tuple, supposedPositiveInteger))
      .then(resolve)
      .catch(e=>reject(
        ConditionalByNameError.factory()
        .withError(e)
        ._if("IntegerValidationErrorToValue")
        ._then(new NegativeIntegersError())
        .defaultsTo(e)
        .decide()
      ));
  });

/**
 * Resolves an array of Strings if all arguments are strings.
 * @param  {...any} everything
 * @returns {Promise}
 */
export const validateAllArgsString = async (...everything) =>
  new Promise((resolve, reject) => {
    validateAllArgs(validateString, ...everything)
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves an array of numbers if all arguments are numbers.
 * @param  {...any} everything
 * @returns {Promise}
 */
export const validateAllArgsNumber = async (...everything) =>
  new Promise((resolve, reject) => {
    validateAllArgs(validateNumber, ...everything)
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves an array of the objecsts if all arguments is an object.
 * @param  {...any} everything
 * @returns {Promise}
 */
export const validateAllArgsObject = async (...everything) =>
  new Promise((resolve, reject) => {
    validateAllArgs(validateObject, ...everything)
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves an array of booleans if all arguments are booleans.
 * @param  {...any} everything
 * @returns {Promise}
 */
export const validateAllArgsBoolean = async (...everything) =>
  new Promise((resolve, reject) => {
    validateAllArgs(validateBoolean, ...everything)
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves an array of integers if all args passed are valid integers.
 * @param  {...any} everything 
 * @returns 
 */
export const validateAllArgsInteger = async (...everything) =>
  new Promise((resolve, reject) => {
    validateAllArgs(validateInteger, ...everything)
      .then(resolve)
      .catch(reject);
  });

/**
 * To be used as a helper for validateAllArgs of a function.
 * Validation rule will be applied to each arg according to the validationFunction param
 * @param { Array } args
 * @param { Function } validationFunction
 * @returns {Promise}
 */
export const validateAllArgs = async (validationFunction, ...args) =>
  new Promise((resolve, reject) => {
    validateFunction(validationFunction, [])
      .then(([f]) => [f, args.length > 0])
      .then(([f, hasAtLeastOneArg]) =>
        hasAtLeastOneArg
          ? Promise.all(args.map(f))
          : reject(new AllArgsNoArgsValidationError())
      )
      .then(resolve)
      .catch((e) =>
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("FunctionValidationError")
            ._then(new AllArgsValidationError())
            .defaultsTo(e)
            .decide()
        )
      );
  });

/**
 * Resolves an array of arrays (2D arrays) if all args passed are valid arrays.
 * @param  {...any} everything 
 * @returns 
 */
export const validateAllArgsArray = async (...everything) =>
  new Promise((resolve, reject) =>
    validateAllArgs(validateArray, ...everything)
      .then(resolve)
      .catch(reject)
  );
