import {
  validateString,
  validateNotNull,
  validateNotUndefined,
  validateTrim,
  filterResolutionParam,
} from "./validators";
import fs from "fs";

import regeneratorRuntime from "regenerator-runtime";

/**
 * File Functions is a special type of complex functions totaly dedicated to perform CRUD operations of files
 * and CRD (create read and delete) operations for dirs.
 */

/**
 * Lists the contents of a directory (files and subdirectories)
 * It doesn't list the contests of a subdirectory
 * Resolves the list if directory is not empty or rejects if empty or an error occurs.
 * @param {String} dirLocation
 * @param {Array} tuple
 * @returns {Promise}
 */
export const listDirContent = (dirLocation, tuple) =>
  new Promise((resolve, reject) => {
    validateString(dirLocation)
      .then(validateTrim)
      .then(
        (trimmedDirLocation) =>
          new Promise((res, rej) => {
            fs.readdir(trimmedDirLocation, (err, listOfFilesAndDirs) => {
              if (!err && listOfFilesAndDirs && listOfFilesAndDirs.length > 0) {
                res(listOfFilesAndDirs);
              } else if (!err && listOfFilesAndDirs.length == 0) {
                rej(
                  new Error(
                    `No files or folders were found in this directory. Directory location: ${trimmedDirLocation}`
                  )
                );
              } else {
                rej(err);
              }
            });
          })
      )
      .then((listOfFilesAndDirs) =>
        filterResolutionParam(tuple, listOfFilesAndDirs)
      )
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves the fileDescriptor when file is open or rejects with an error.
 * @param {String} fileLocationAndName
 * @param {String} flag
 * @param {Array} tuple
 * @returns {Promise}
 */
export const openFile = (fileLocationAndName, flag = "r", tuple) =>
  new Promise((resolve, reject) => {
    // check if the fileLocationAndName is a string.
    validateString(fileLocationAndName)
      .then(() => validateString(flag))
      .then(
        (flag) =>
          new Promise((res, rej) => {
            //Open the file for writting:
            fs.open(fileLocationAndName, flag, (err, fileDescriptor) => {
              if (err && !fileDescriptor) {
                rej(err);
              } else {
                res(fileDescriptor);
              }
            });
          })
      )
      .then((fileDescriptor) => filterResolutionParam(tuple, fileDescriptor))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves if found a file descriptor
 * Rejects if file descriptor isn't found or fileLocation isn't a string
 * @param {String} fileLocationAndName
 * @param {Array} tuple
 * @returns { Promise }
 */
export const openFileToUpdate = (fileLocationAndName, tuple) =>
  new Promise((resolve, reject) => {
    openFile(fileLocationAndName, "r+")
      .then((fileDescriptor) => filterResolutionParam(tuple, fileDescriptor))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves if found a file descriptor
 * Rejects if file descriptor isn't found or fileLocation isn't a string
 * @param {String} fileLocationAndName
 * @param {Array} tuple
 * @returns { Promise }
 */
export const openFileToWrite = async (fileLocationAndName, tuple) =>
  new Promise((resolve, reject) => {
    openFile(fileLocationAndName, "wx")
      .then((fileDescriptor) => filterResolutionParam(tuple, fileDescriptor))
      .then(resolve)
      .catch(reject);
  });

/**
 * Reads a file and resolves the content of the file.
 * It throws if the fileLocation parameter isn't a string.
 * It also throws if the file doesn't exist.
 * @param {String} fileLocation
 * @param {Array} tuple
 * @returns {Promise}
 */
export const readFile = async (fileLocation, tuple) =>
  new Promise((resolve, reject) => {
    // Checks if fileLocation is a string.
    validateNotNull(fileLocation)
      .then((fileLocation) => validateString(fileLocation))
      .then(
        (fileLocation) =>
          new Promise((res, rej) => {
            fs.readFile(fileLocation, "utf8", (err, data) => {
              if (err) {
                rej(err);
              } else {
                res(data); // resolves file content
              }
            });
          })
      )
      .then((fileData) => filterResolutionParam(tuple, fileData))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves if there is no errors trucating the file.
 * Rejects if there was any erros.
 * @param {*} fileDescriptor
 * @param {Array} tuple
 * @returns {Promise}
 */
export const truncateFile = async (fileDescriptor, tuple) =>
  new Promise((resolve, reject) => {
    fs.ftruncate(fileDescriptor, (err) => {
      if (!err) {
        filterResolutionParam(tuple, fileDescriptor)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error("Error truncating file."));
      }
    });
  });

/**
 * Resolves true if the file was updated or rejects if an error was encountered.
 * @param {String} fileLocationAndName
 * @param {String} content
 * @param {Array} tuple
 * @returns {Promise}
 */
export const updateFile = async (fileLocationAndName, content, tuple) =>
  new Promise((resolve, reject) => {
    validateNotUndefined(content)
      .then(validateNotNull)
      .then(() => fileExists(fileLocationAndName))
      .then(openFileToUpdate) // Only existing files can be updated
      .then(truncateFile)
      .then((fileDescriptor) => writeFile(fileDescriptor, content))
      .then(() => filterResolutionParam(tuple, fileLocationAndName))
      .then(resolve)
      .catch((e) =>
        e.message.includes("exist")
          ? reject(Error("Cannot update the file. It may not exist."))
          : reject(e)
      );
  });

/**
 * Writes content to a file and resolves true if it worked.
 * Rejects if the writing fails for any reason.
 * @param {String} fileLocationAndName
 * @param {String} content
 * @param {Array} tuple
 * @returns {Promise}
 */
export const writeFile = async (fileDescriptor, content = "--foo-bar--", tuple) =>
  new Promise((resolve, reject) => {
    validateNotNull(content)
      .then(validateNotUndefined)
      .then(
        (content) =>
          new Promise((res, rej) => {
            fs.writeFile(fileDescriptor, content, (err) => {
              if (!err) {
                // closes the file if no error
                res(closeFile(fileDescriptor));
              } else {
                //Rejects with the error
                rej(err);
              }
            });
          })
      )
      .then((fileDescriptor) => filterResolutionParam(tuple, fileDescriptor))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves true if the file was successfully deleted or rejects an error if it failed for any reason.
 * @param {String} fileLocationAndName
 * @param {Array} tuple
 * @returns {Promise}
 */
export const deleteFile = async (fileLocationAndName, tuple) =>
  new Promise((resolve, reject) => {
    validateString(fileLocationAndName)
      .then((fileLocationAndName) => fileExists(fileLocationAndName))
      .then(
        (fileLocation) =>
          new Promise((res, rej) => {
            fs.unlink(fileLocation, (err) => {
              if (!err) {
                res(fileLocation);
              } else {
                rej(err);
              }
            });
          })
      )
      .then((deletedLocation) => filterResolutionParam(tuple, deletedLocation))
      .then(resolve)
      .catch((e) =>
        e.message.includes("exist")
          ? reject(new Error("Error deleting file. It may not exist."))
          : reject(e)
      );
  });

/**
 * Resolves if the file is successfully created.
 * Rejects if the file is
 * @param {String} fileLocationAndName
 * @param {String} content
 * @param {Array} tuple
 * @returns {Promise}
 */
export const createFile = async (fileLocationAndName, content = "", tuple) =>
  new Promise((resolve, reject) => {
    fileDoesntExist(fileLocationAndName)
      .then(openFileToWrite)
      .then((fileDescriptor) => writeFile(fileDescriptor, content))
      .then(() => filterResolutionParam(tuple, fileLocationAndName)) // resolves the fileLocationAndName instead of the fileDescriptor
      .then(resolve)
      .catch((e) =>
        e.message.includes("exist")
          ? reject(
              new Error("Could not create the new file. It may already exist.")
            )
          : reject(e)
      );
  });

/**
 * Closes a file by a given file descriptor
 * Returns true if the closing succeeded or rejects if an error occurs
 * @param {Number} fileDescriptor
 * @param {Array} tuple
 * @returns {Promise}
 */
export const closeFile = async (fileDescriptor, tuple) =>
  new Promise((resolve, reject) => {
    //validate file descriptor to not null
    validateNotNull(fileDescriptor)
      .then(validateNotUndefined)
      .then(
        (fileDescriptor) =>
          new Promise((res, rej) => {
            fs.close(fileDescriptor, (err) => {
              if (err) {
                rej(err);
              } else {
                res(fileDescriptor);
              }
            });
          })
      )
      .then((fileDescriptor) => filterResolutionParam(tuple, fileDescriptor))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves true if file exists. Resolves false if file doesn't exist.
 * Rejects if the supposedFileLocation parameter is't a string
 * @param {String} supposedFileLocation
 * @param {Array} tuple
 * @returns {Promise}
 */
export const fileExists = async (supposedFileLocation, tuple) =>
  new Promise((resolve, reject) => {
    validateString(supposedFileLocation)
      .then(
        (supposedFileLocation) =>
          new Promise((res, rej) => {
            fs.readFile(supposedFileLocation, "utf8", (err) => {
              if (err) {
                rej(new Error("File doesn't exist."));
              } else {
                res(supposedFileLocation);
              }
            });
          })
      )
      .then((fileLocation) => filterResolutionParam(tuple, fileLocation))
      .then(resolve)
      .catch(reject);
  });

/**
 * Resolves the supposedFileLocation if it DOESN'T exist.
 * Rejects if an error occurs.
 * The accumulation tuple is opitional. It will resolves the tuple if passed as arg.
 * @param {String} supposedFileLocation
 * @param {Array} tuple Optional
 * @returns {Promise}
 */
export const fileDoesntExist = async (supposedFileLocation, tuple) =>
  new Promise((resolve, reject) => {
    fileExists(supposedFileLocation)
      .then(() => reject(new Error("The file exists.")))
      .catch(() =>
        filterResolutionParam(tuple, supposedFileLocation).then(resolve)
      );
  });

/**
 * Checks if the given parameter is a path to a directory.
 * Resolves true if it is a directory or false if not a directory.
 * Rejects if param isn't a string.
 * @param {String} dirPath
 * @param {Array} tuple
 * @returns {Promise}
 */
export const isDirectory = async (dirPath, tuple) =>
  new Promise((resolve, reject) => {
    validateString(dirPath)
      .then((dirPath) => {
        fs.stat(dirPath, (err, stat) => {
          if (err && !stat) {
            // If it gets here, is because directory doesn't exist.
            reject(
              new Error(
                `The given directory wasn't found. Directory: ${dirPath}`
              )
            );
          } else {
            if (stat.isDirectory()) {
              filterResolutionParam(tuple, dirPath).then(resolve).catch(reject);
            } else {
              reject(new Error(`The ${dirPath} isn't a directory!`));
            }
          }
        });
      })
      .catch(reject);
  });

/**
 * Resolves dirPath if dir exists or rejects if it doesn't exist.
 * The difference between checkIfDirExists and isDirectory is that isDirectory will assume
 * that the file or dir exist and it will throw an error if it doesn't whereas checkIfDirExists
 * won't throw if it doesn't exist in the file system.
 * @param {String} dirPath
 * @param {Array} tuple
 * @returns {Promise}
 */
export const dirExists = async (dirPath, tuple) =>
  new Promise((resolve, reject) => {
    isDirectory(dirPath)
      .then(() => filterResolutionParam(tuple, dirPath))
      .then(resolve)
      .catch(reject);
  });

/**
 * If the dir DOESN'T exist, it will resolve the dirPath, whereas if it exists, it will reject with an error.
 * It's the other way around of dirExists method.
 * @param {String} dirPath
 * @param {Array} tuple
 * @returns {Promise}
 */
export const dirDoesntExist = async (dirPath, tuple) =>
  new Promise((resolve, reject) => {
    dirExists(dirPath)
      .then(() => reject(new Error(`Directory already exists.`)))
      .catch((e) =>
        filterResolutionParam(tuple, dirPath).then(resolve).catch(reject)
      );
  });

/**
 * Creates a dir recursively. Resolves the dirPath if the creation was successfull or rejects if an error occurs
 * @param {*} dirPath
 * @param {Array} tuple
 * @returns
 */
export const createDir = async (dirPath, tuple) =>
  new Promise((resolve, reject) => {
    dirDoesntExist(dirPath)
      .then(() => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            filterResolutionParam(tuple, dirPath).then(resolve).catch(reject);
          }
        });
      })
      .catch((e) =>
        reject(new Error("Cannot create the directory. It may already exist."))
      );
  });

/**
 * Deletes a directory if it exists.
 * Resolves the dirPath or a tuple, with dirPath inside if passed as parameter.
 * Rejects if an error occurs.
 * @param {String} dirPath
 * @param {Array} tuple
 * @returns {Promise}
 */
export const deleteDir = (dirPath, tuple) =>
  new Promise((resolve, reject) => {
    dirExists(dirPath)
      .then(() =>
        fs.rmdir(dirPath, { recursive: true, force: true }, (err) => {
          if (err) {
            reject(
              new Error(
                `Failed to delete folder due to the following error: ${err.message}`
              )
            );
          } else {
            filterResolutionParam(tuple, dirPath).then(resolve).catch(reject);
          }
        })
      )
      .catch((e) =>
        reject(new Error("Could not delete the folder. It may not exist."))
      );
  });
