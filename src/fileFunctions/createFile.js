import checkIfFileExists from "./checkIfFileExists";
import openFileToWrite from "./openFileToWrite";
import writeFile from "./writeFile";

/**
 * Resolves if the file is successfully created.
 * Rejects if the file is
 * @param {String} fileLocationAndName
 * @param {String} content
 */
export default async function createFile(fileLocationAndName, content) {
  return new Promise((resolve, reject) => {
    checkIfFileExists(fileLocationAndName)
      .then((exists) => {
        if (exists) {
          reject(
            new Error("Could not create the new file. It may already exist.")
          );
        } else {
          // Open the file with wx flag
          return openFileToWrite(fileLocationAndName);
        }
      })
      .then((fileDescriptor) => writeFile(fileDescriptor, content))
      .then((wrote) => resolve(wrote)) // if the previous chained promise resolves, then it's always going to be true
      .catch((e) => reject(e));
  });
}
