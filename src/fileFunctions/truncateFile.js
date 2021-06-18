import fs from "fs";

/**
 * Resolves if there is no errors trucating the file.
 * Rejects if there was any erros.
 * @param {*} fileDescriptor
 * @returns
 */
export default async function truncateFile(fileDescriptor) {
  return new Promise((resolve, reject) => {
    fs.ftruncate(fileDescriptor, (err) => {
      if (!err) {
        resolve(fileDescriptor);
      } else {
        reject(new Error("Error truncating file."));
      }
    });
  });
}
