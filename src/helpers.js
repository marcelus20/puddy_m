import { filterResolutionParam, validateString } from "./validators/validators";
import crypto from "crypto";
import { ConditionalByMessageError, HashingAlgorithmError } from "./models/errors";
import { HashingAlgorithms } from "./enums";
import { validateAllArgsString } from "./validators/complexValidators";

/**
 *
 * @param {String} stringToHash
 * @param {String} secret
 * @param {Array} tuple
 * @returns {Promise<String>}
 */
export const hash = async (
  stringToHash,
  secret = "",
  hashingAlgorithm,
  tuple
) =>
  new Promise((resolve, reject) => {
    validateAllArgsString(stringToHash, secret, hashingAlgorithm)
      .then(([stringToHash, secret, hashingAlgorithm]) =>
        crypto
          .createHmac(hashingAlgorithm, secret)
          .update(stringToHash)
          .digest("hex")
      )
      .then((hash) => filterResolutionParam(tuple, hash))
      .then(resolve)
      .catch((e)=>reject(
        ConditionalByMessageError
        .factory()
        .withError(e)
        ._if("Unknown message")
        ._then(new HashingAlgorithmError())
        .defaultsTo(e)
        .decide()));
  });

/**
 * Creates a a hashed string using the HashingAlgorithms.SHA256 and resolves it. 
 * Rejects if an error occurs.
 * @param {String} stringToHash 
 * @param {String} secret 
 * @param {Array} tuple 
 * @returns 
 */
export const hashSHA256 = (stringToHash, secret = "", tuple) =>
  new Promise((resolve, reject) => {
    hash(stringToHash, secret, HashingAlgorithms.SHA256, tuple)
      .then((hash) => filterResolutionParam(tuple, hash))
      .then(resolve)
      .catch(reject);
  });

/**
 * 
 * @param {*} stringToHash 
 * @param {*} secret 
 * @param {*} tuple 
 * @returns 
 */
export const hashSHA512 = (stringToHash, secret = "", tuple) =>
  new Promise((resolve, reject) => {
    hash(stringToHash, secret, HashingAlgorithms.SHA512, tuple)
      .then((hash) => filterResolutionParam(tuple, hash))
      .then(resolve)
      .catch(reject);
  });
