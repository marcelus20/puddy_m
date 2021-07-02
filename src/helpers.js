import { filterResolutionParam, validateString } from "./validators";
import crypto from "crypto";
import {
  ConditionalByMessageError,
  HashingAlgorithmError,
} from "./models/errors";
import { HashingAlgorithms } from "./enums";
import {
  validateAllArgsString,
  validateEmail,
  validatePositiveIntegers,
  validateStringLengthGreaterThan,
  validateTrim,
} from "./validators/complexValidators";

import regeneratorRuntime from "regenerator-runtime";


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
      .catch((e) =>
        reject(
          ConditionalByMessageError.factory()
            .withError(e)
            ._if("Unknown message")
            ._then(new HashingAlgorithmError())
            .defaultsTo(e)
            .decide()
        )
      );
  });

/**
 * Creates a a hashed string using the HashingAlgorithms.SHA256 and resolves it.
 * Rejects if an error occurs.
 * @param {String} stringToHash
 * @param {String} secret
 * @param {Array} tuple
 * @returns
 */
export const hashSHA256 = async (stringToHash, secret = "", tuple) =>
  new Promise((resolve, reject) => {
    hash(stringToHash, secret, HashingAlgorithms.SHA256)
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
export const hashSHA512 = async (stringToHash, secret = "", tuple) =>
  new Promise((resolve, reject) => {
    hash(stringToHash, secret, HashingAlgorithms.SHA512)
      .then((hash) => filterResolutionParam(tuple, hash))
      .then(resolve)
      .catch(reject);
  });

// Parse a JSON string to an object in all cases.
// If The string doesn't have a valid JSON format, it won't throw.
export const parseJsonToObject = async (str, tuple) =>
  new Promise((resolve) => {
    try {
      const obj = JSON.parse(str);
      return filterResolutionParam(tuple, obj).then(resolve);
    } catch (e) {
      return resolve({});
    }
  });

/**
 * Cut the slashes on the side of the string, but never in the middle
 * @param {String} path
 */
export const trimPath = async (path, tuple) => 
  new Promise((resolve, reject) => {
    validateString(path)
      .then(validateTrim)
      .then((trimmedPath) => {
        if (trimmedPath || trimmedPath.length === 0) {
          filterResolutionParam(
            tuple,
            trimmedPath.replace(/^\/+|\/+$/g, "")
          ).then(resolve)
        } else {
          filterResolutionParam(tuple, "").then(resolve);
        }
      })
      .catch(reject);
  });

/**
 * Resolves a shuffled version of a string by a given length
 * @param {Number} strLen 
 * @param {Array} tuple 
 * @returns 
 */
export const generateRandomString = async (strLen, tuple) => new Promise((resolve, reject)=>{
    validatePositiveIntegers(strLen, [])
    .then((tuple)=>shuffleString("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", tuple))
    .then(([length, shuffledStr])=>{
      // Start the final String
      let str = "";

      for(let i = 1; i <= length; i++){
          //Get a random character from the possible characters string
          const randomCharacter = shuffledStr.charAt(Math.floor(Math.random() * shuffledStr.length))
          // append this character to the final string
          str += randomCharacter;
      }
      // Return the final string
      filterResolutionParam(tuple, str).then(resolve)
    }).catch(reject)
})

/**
 * Resolves the shuffled version of the string. 
 * @param {string} str 
 * @param {*} tuple 
 * @returns 
 */
export const shuffleString = async(str, tuple)=> new Promise((resolve, reject)=>{
  validateString(str)
    .then(str=>{
      // Algorithm taken from the author Maximilian Lindsey, available at: https://jsfiddle.net/maximilian_lindsey/qa2w2k5z/
      var shuffledWord = '';
      str = str.split('');
      while (str.length > 0) {
        shuffledWord +=  str.splice(str.length * Math.random() << 0, 1);
      }
      filterResolutionParam(tuple, shuffledWord)
        .then(resolve)
    }).catch(reject) 
})

/**
 * This promise always resolves. 
 * True if email has a valid format or false if it doesn't. 
 * @param {string} email 
 * @param {array} tuple 
 * @returns 
 */
export const isEmailFormated = async (email, tuple) => new Promise((resolve)=>{
  validateEmail(email)
  .then(()=>filterResolutionParam(tuple, true))
  .then(resolve)
  .catch(()=>resolve(false))
})