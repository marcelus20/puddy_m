import checkIfFileExists from "./checkIfFileExists";
import fs from "fs";

/**
 * Resolves true if the file was successfully deleted or rejects an error if it failed for any reason.
 * @param {String} fileLocationAndName
 * @returns
 */
export default async function deleteFile(fileLocationAndName) {
  return new Promise((resolve, reject) => {
    checkIfFileExists(fileLocationAndName)
      .then((exists) => {
        if (exists) {
          fs.unlink(fileLocationAndName, (err) => {
            if (!err) {
              resolve(true);
            } else {
              reject("Error deleting the file.");
            }
          });
        } else {
          reject(new Error("Error deleting file. It may not exist."));
        }
      })
      .catch((e) => reject(e));
  });
}
