import validateString from "../validations/validateString";
import fs from "fs";

/**
 * Resolves true if file exists. Resolves false if file doesn't exist.
 * Rejects if the supposedFileLocation parameter is't a string
 * @param {String} supposedFileLocation
 * @returns {Promise}
 */
export default async function checkIfFileExists(supposedFileLocation) {
  return new Promise((resolve, reject) => {
    validateString(supposedFileLocation)
      .then((supposedFileLocation) => {
        // If it gets here, the parameter is string, so read the file
        fs.readFile(supposedFileLocation, "utf8", (error) => {
          if (error) {
            // file doesn't exist.
            resolve(false);
          } else {
            resolve(true);
          }
        });
      })
      .catch((e) => reject(e));
  });
}
