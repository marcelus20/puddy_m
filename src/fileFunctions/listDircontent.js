import validateString from "../validations/validateString";
import fs from "fs";
import trim from "../utils/trim";

/**
 *
 * @param {String} dirLocation
 */
export default async function listDirContent(dirLocation) {
  return new Promise((resolve, reject) => {
    validateString(dirLocation)
      .then((dirLocation) => trim(dirLocation))
      .then((trimmedDirLocation) => {
        fs.readdir(trimmedDirLocation, (err, data) => {
          if (!err && data && data.length > 0) {
            resolve(data);
          } else if (!err && data.length == 0) {
            reject(
              new Error(
                `No files or folders were found in this directory. Directory location: ${trimmedDirLocation}`
              )
            );
          } else {
            reject(err);
          }
        });
      })
      .catch((e) => reject(e));
  });
}
