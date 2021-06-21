import { PrimitiveTypes } from "./enums";
import {
  ArrayValidationError,
  BooleanValidationError,
  FunctionValidationError,
  InstanceValidationError,
  NotInstanceValidationError,
  NotNullValidationError,
  NotTypeValidationError,
  NotUndefinedValidationError,
  NumberValidationError,
  StringValidationError,
  TypeValidationError,
} from "./models/errors";

/**
 * This module is to keep only simple functions.
 * Definition of simple functions in this context is functions that DON'T use any other functions as part of its logic
 * excluding the most basic functions.
 *
 * Definition of "most basic functions" are functions that must be used in all functions in this lib.
 * They are the "validateType" and "filterResolutionParam" functions
 *
 * For example: validateString is a simple function, because it only utilises the most basic functions
 * in your scope, the validateType and filterResolutionParam. If it had used any other function, then it'd been
 * classified as Complex Functions and thus, it would not be part of this module.
 */

/**
 * Validates the argument to be not null.
 * Resolves if the variable isn't null.
 * Rejects if null.
 * @param {*} supposedNotNullArg
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateNotNull = (supposedNotNullArg, tuple) =>
  new Promise((resolve, reject) => {
    if (supposedNotNullArg == null) {
      reject(new NotNullValidationError());
    } else {
      filterResolutionParam(tuple, supposedNotNullArg)
        .then(resolve)
        .catch(reject);
    }
  });

/**
 * Validates the argument to be not undefined.
 * Resolves if the variable isn't null.
 * Rejects if undefined.
 * @param {*} supposedNotUndefinedArg
 * @param {Array} tuple
 * @returns { Promise }
 */
export const validateNotUndefined = (supposedNotUndefinedArg, tuple) =>
  new Promise((resolve, reject) => {
    validateNotType(PrimitiveTypes.UNDEFINED, supposedNotUndefinedArg, tuple)
      .then(resolve)
      .catch((e) => {
        reject(new NotUndefinedValidationError());
      });
  });

/**
 * Resolves the supposedNumber if it is type of number.
 * If not type of number, then it rejects
 * @param {*} supposedNumber
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateNumber = (supposedNumber, tuple) =>
  new Promise((resolve, reject) => {
    validateType(PrimitiveTypes.NUMBER, supposedNumber, tuple)
      .then(resolve)
      .catch(() => reject(new NumberValidationError()));
  });

/**
 * Resolves if supposedBoolean param is boolean or rejects if any other type.
 * If tuple is specified, it will resolve an array concating the supposedBoolean value.
 * @param {*} supposedBoolean
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateBoolean = (supposedBoolean, tuple) =>
  new Promise((resolve, reject) => {
    validateType(PrimitiveTypes.BOOLEAN, supposedBoolean, tuple)
      .then(resolve)
      .catch(() => reject(new BooleanValidationError()));
  });

/**
 * Makes validation upon primitive built-in javascript types, excluding complex/custom types (eg: classes and arrays).
 * Primitive examples:
 * "undefined"
 * "boolean"
 * "number"
 * "string"
 * "bigint"
 * "symbol".
 * @param {String} type
 * @param {*} arg
 * @param {Array} tuple
 * @returns
 */
export const validateType = (type, arg, tuple) =>
  new Promise((resolve, reject) => {
    if (typeof arg == type) {
      filterResolutionParam(tuple, arg).then(resolve).catch(reject);
    } else {
      reject(new TypeValidationError(arg, type));
    }
  });

export const validateNotType = (type, arg, tuple) =>
  new Promise((resolve, reject) => {
    validateType(type, arg)
      .then(() => reject(new NotTypeValidationError(arg, type)))
      .catch(() => filterResolutionParam(tuple, arg).then(resolve));
  });

export const validateInstance = (InstanceRef, supposedInstance, tuple) =>
  new Promise((resolve, reject) => {
    if (supposedInstance instanceof InstanceRef) {
      filterResolutionParam(tuple, supposedInstance).then(resolve);
    } else {
      reject(new InstanceValidationError(InstanceRef, supposedInstance));
    }
  });

export const validateNotInstance = (InstanceRef, supposedNotInstance, tuple) =>
  new Promise((resolve, reject) => {
    validateInstance(InstanceRef, supposedNotInstance, tuple)
      .then(() =>
        reject(new NotInstanceValidationError(InstanceRef, supposedInstance))
      )
      .catch((e) =>
        filterResolutionParam(tuple, supposedNotInstance).then(resolve)
      );
  });

/**
 * Resolves the same string if it is type of string.
 * If not type of string, then it rejects
 * @param {*} supposedString
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateString = (supposedString, tuple) =>
  new Promise((resolve, reject) => {
    validateType(PrimitiveTypes.STRING, supposedString, tuple)
      .then(resolve)
      .catch(() => reject(new StringValidationError()));
  });

/**
 * Resolves the arg if it is not undefined.
 * Rejects if it's undefined as it fails the validation check.
 * Resolves true if NOT undefined. Resolves false if it is undefined.
 * @param {*} supposedFunction
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateFunction = (supposedFunction, tuple) =>
  new Promise((resolve, reject) => {
    if (typeof supposedFunction != "function") {
      reject(new FunctionValidationError());
    } else {
      filterResolutionParam(tuple, supposedFunction)
        .then(resolve)
        .catch(reject);
    }
  });

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
export const filterResolutionParam = (tuple, singleValue) =>
  new Promise((resolve) => {
    if (Array.isArray(tuple)) {
      resolve([...tuple, singleValue]); // Concat the old values from the tuple with the new singleValue.
    } else {
      resolve(singleValue);
    }
  });

/**
 *
 * @param {Array} supposedArray
 * @param {Array} tuple
 * @returns {Promise}
 */
export const validateArray = (supposedArray, tuple) =>
  new Promise((resolve, reject) => {
    if (!Array.isArray(supposedArray)) {
      reject(new ArrayValidationError());
    } else {
      filterResolutionParam(tuple, supposedArray).then(resolve).catch(reject);
    }
  });
