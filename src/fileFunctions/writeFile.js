import fs from "fs";
import closeFile from "./closeFile";
import validateNotNull from "../validations/validateNotNull";
import validateNotUndefined from "../validations/validateNotUndefined";

/**
 * Writes content to a file and resolves true if it worked.
 * Rejects if the writing fails for any reason.
 * @param {String} fileLocationAndName
 * @param {String} content
 * @returns {Promise}
 */
export default async function writeFile(
  fileDescriptor,
  content = "--foo-bar--"
) {
  return new Promise((resolve, reject) => {
    validateNotNull(content)
      .then((content) => validateNotUndefined(content))
      .then((content) => {
        fs.writeFile(fileDescriptor, content, (err) => {
          if (!err) {
            // closes the file if no error
            resolve(closeFile(fileDescriptor));
          } else {
            //Rejects with the error
            reject(err);
          }
        });
      })
      .catch((e) => reject(e));
  });
}
