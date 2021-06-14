import validateString from "../validations/validateString";
import fs from "fs"

/**
 * Resolves the fileDescriptor when file is open or rejects with an error.
 * @param {String} fileLocationAndName
 * @param {String} flag
 * @returns
 */
export default async function openFile(fileLocationAndName, flag = "r") {
  return new Promise((resolve, reject) => {
    // check if the fileLocationAndName is a string.
    validateString(fileLocationAndName)
      .then((fileLocationAndName) => validateString(flag))
      .then((flag) => {
        //Open the file for writting:
        fs.open(fileLocationAndName, flag, (err, fileDescriptor) => {
          if (err && !fileDescriptor) {
            reject(err);
          } else {
            resolve(fileDescriptor);
          }
        });
      })
      .catch((e) => reject(e));
  });
}
