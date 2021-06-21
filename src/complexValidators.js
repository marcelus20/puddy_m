import { PrimitiveTypes } from "./enums";
import {
  ConditionalByNameError,
  NotUndefinedValidationError,
  ObjectValidationError,
  ObjectWithExistingKeyValidationError,
  ObjectWithKeysValidationError,
  StringValidationError,
} from "./models/errors";
import {
  filterResolutionParam,
  validateNotInstance,
  validateNotNull,
  validateNotUndefined,
  validateString,
  validateType,
} from "./validators";

import regeneratorRuntime from "regenerator-runtime";

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
export const validateObject = (supposedObject, tuple) =>
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
export const validateObjectWithKeys = (object, tuple, ...desiredKeys) =>
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
export const validateObjectWithExistingKey = (key, object, tuple) =>
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
export const validateTrim = (stringToTrim, tuple) =>
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
