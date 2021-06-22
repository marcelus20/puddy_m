import { validateObjectWithExistingKey } from "./complexValidators";
import { PrimitiveTypes } from "../enums";
import {
  ConditionalByNameError,
  ListOfTypeValidationError,
  NotUndefinedValidationError,
  ObjectWithExistingKeyValidationError,
} from "../models/errors";
import {
  filterResolutionParam,
  validateArray,
  validateInstance,
  validateNotUndefined,
  validateString,
  validateType,
} from "./validators";

import regeneratorRuntime from "regenerator-runtime";

/**
 * Resolves the list if all elements in it are of type specified in the "type" parameter.
 * The type parameter should be a string available in the PrimitiveType enum:
 *
 * Either insert PrimitiveTypes.UNDEFINED or "undefined",
 * or PrimitiveTypes.BOOLEAN or "boolean",
 * or PrimitiveTypes.NUMBER or "number",
 * or PrimitiveTypes.STRING or "string",
 * or PrimitiveTypes.BIG_INT or "bigint",
 * or PrimitiveTypes.SYMBOL or "symbol",
 * or PrimitiveTypes.OBJECT or "object",
 *
 * @param {String} type
 * @param {Array} list
 * @param {Array} tuple
 * @returns
 */
export const validateListOfType = async (type, list, tuple) =>
  new Promise((resolve, reject) => {
    validateString(type, [])
      .then((tuple) => validateArray(list, tuple))
      .then((tuple) =>
        validateObjectWithExistingKey(type.toUpperCase(), PrimitiveTypes, tuple)
      )
      .then(() => Promise.all(list.map((el) => validateType(type, el))))
      .then(() => filterResolutionParam(tuple, list))
      .then(resolve)
      .catch((e) =>
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("TypeValidationError")
            ._then(new ListOfTypeValidationError(type))
            ._if("ObjectWithExistingKeyValidationError")
            ._then(new ObjectWithExistingKeyValidationError())
            .defaultsTo(e)
            .decide()
        )
      );
  });

/**
 * Validates if the list contains only elements that are instance of InstanceReference.
 * Suppose you have a class in your code called User, then InstanceReference would be assigned User (capital U, the same way the class name has been declared)
 * Resolves the list if all elements of the list is of instance of InstanceReference.
 * @param {*} InstanceReference
 * @param {Array} list
 * @param {Array} tuple
 * @returns
 */
export const validateListOfInstance = async (InstanceReference, list, tuple) =>
  new Promise((resolve, reject) => {
    validateNotUndefined(InstanceReference)
      .then(() => validateArray(list))
      .then((list) => 
        Promise.all(list.map((el) => validateInstance(InstanceReference, el)))
      )
      .then(() => filterResolutionParam(tuple, list))
      .then(resolve)
      .catch((e) =>
        reject(
          ConditionalByNameError.factory()
            .withError(e)
            ._if("NotUndefinedValidationError")
            ._then(new NotUndefinedValidationError())
            .defaultsTo(e)
            .decide()
        )
      );
  });
