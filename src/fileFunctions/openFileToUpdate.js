import openFile from "./openFile";

/**
 * Resolves if found a file descriptor
 * Rejects if file descriptor isn't found or fileLocation isn't a string
 * @param {String} fileLocationAndName
 * @returns { Promise }
 */
export default async function openFileToUpdate(fileLocationAndName) {
  return new Promise((resolve, reject) => {
    openFile(fileLocationAndName, "r+")
      .then((fileDescriptor) => resolve(fileDescriptor))
      .catch((e) => reject(e));
  });
}
