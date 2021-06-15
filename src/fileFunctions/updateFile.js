import checkIfFileExists from "./checkIfFileExists";
import openFileToUpdate from "./openFileToUpdate";
import truncateFile from "./truncateFile";
import writeFile from "./writeFile";
import validateNotNull from "../validations/validateNotNull";
import validateNotUndefined from "../validations/validateNotUndefined";

/**
 * Resolves true if the file was updated or rejects if an error was encountered.
 * @param {String} fileLocationAndName
 * @param {*} content
 * @returns
 */
export default async function updateFile(fileLocationAndName, content) {
  return new Promise((resolve, reject) => {
    validateNotNull(content)
      .then((content) => validateNotUndefined(content))
      .then((content) => checkIfFileExists(fileLocationAndName))
      .then((exists) => {
        if (exists) {
          return openFileToUpdate(fileLocationAndName); // Only existing files can be updated
        } else {
          reject(Error("Cannot update the file. It may not exist."));
        }
      })
      .then((fileDescriptor) => truncateFile(fileDescriptor))
      .then((fileDescriptor) => writeFile(fileDescriptor, content))
      .then((wrote) => resolve(wrote))
      .catch((e) => reject(e));
  });
}
