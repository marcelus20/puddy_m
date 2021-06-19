import {
  validateString,
  validateNotNull,
  validateNotUndefined,
  validateTrim,
} from "./validators";
import fs from "fs";
import path from "path";
import { rejects } from "assert";

/**
 * Lists the contents of a directory (files and subdirectories)
 * It doesn't list the contests of a subdirectory
 * Resolves the list if directory is not empty or rejects if empty or an error occurs.
 * @param {String} dirLocation
 */
export function listDirContent(dirLocation) {
  return new Promise((resolve, reject) => {
    validateString(dirLocation)
      .then((dirLocation) => validateTrim(dirLocation))
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

/**
 * Resolves the fileDescriptor when file is open or rejects with an error.
 * @param {String} fileLocationAndName
 * @param {String} flag
 * @returns
 */
export function openFile(fileLocationAndName, flag = "r") {
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

/**
 * Resolves if found a file descriptor
 * Rejects if file descriptor isn't found or fileLocation isn't a string
 * @param {String} fileLocationAndName
 * @returns { Promise }
 */
export function openFileToUpdate(fileLocationAndName) {
  return new Promise((resolve, reject) => {
    openFile(fileLocationAndName, "r+")
      .then((fileDescriptor) => resolve(fileDescriptor))
      .catch((e) => reject(e));
  });
}

/**
 * Resolves if found a file descriptor
 * Rejects if file descriptor isn't found or fileLocation isn't a string
 * @param {String} fileLocationAndName
 * @returns { Promise }
 */
export function openFileToWrite(fileLocationAndName) {
  return new Promise((resolve, reject) => {
    openFile(fileLocationAndName, "wx")
      .then((fileDescriptor) => resolve(fileDescriptor))
      .catch((e) => reject(e));
  });
}

/**
 * Reads a file and resolves the content of the file.
 * It throws if the fileLocation parameter isn't a string.
 * It also throws if the file doesn't exist.
 * @param {String} fileLocation
 * @returns {Promise}
 * @throws {TypeError}
 */
export function readFile(fileLocation) {
  return new Promise((resolve, reject) => {
    // Checks if fileLocation is a string.
    validateString(fileLocation)
      .then((fileLocation) => {
        fs.readFile(fileLocation, "utf8", (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data); // resolves file content
          }
        });
      })
      .catch((err) => reject(err));
  });
}

/**
 * Resolves if there is no errors trucating the file.
 * Rejects if there was any erros.
 * @param {*} fileDescriptor
 * @returns
 */
export function truncateFile(fileDescriptor) {
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

/**
 * Resolves true if the file was updated or rejects if an error was encountered.
 * @param {String} fileLocationAndName
 * @param {*} content
 * @returns
 */
export function updateFile(fileLocationAndName, content) {
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

/**
 * Writes content to a file and resolves true if it worked.
 * Rejects if the writing fails for any reason.
 * @param {String} fileLocationAndName
 * @param {String} content
 * @returns {Promise}
 */
export function writeFile(fileDescriptor, content = "--foo-bar--") {
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

/**
 * Resolves true if the file was successfully deleted or rejects an error if it failed for any reason.
 * @param {String} fileLocationAndName
 * @returns
 */
export function deleteFile(fileLocationAndName) {
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

/**
 * Resolves if the file is successfully created.
 * Rejects if the file is
 * @param {String} fileLocationAndName
 * @param {String} content
 */
export function createFile(fileLocationAndName, content) {
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

/**
 * Closes a file by a given file descriptor
 * Returns true if the closing succeeded or rejects if an error occurs
 * @param {*} fileDescriptor
 * @returns
 */
export function closeFile(fileDescriptor) {
  return new Promise((resolve, reject) => {
    //validate file descriptor to not null
    validateNotNull(fileDescriptor)
      .then((fileDescriptor) => validateNotUndefined(fileDescriptor))
      .then((fileDescriptor) => {
        fs.close(fileDescriptor, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      })
      .catch((e) => reject(e));
  });
}

/**
 * Resolves true if file exists. Resolves false if file doesn't exist.
 * Rejects if the supposedFileLocation parameter is't a string
 * @param {String} supposedFileLocation
 * @returns {Promise}
 */
export function checkIfFileExists(supposedFileLocation) {
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

/**
 * Checks if the given parameter is a path to a directory.
 * Resolves true if it is a directory or false if not a directory.
 * Rejects if param isn't a string.
 * @param {String} dirPath
 * @returns {Promise}
 */
export function isDirectory(dirPath) {
  return new Promise((resolve, reject) => {
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
              resolve(resolve(dirPath));
            } else {
              reject(new Error(`The ${dirPath} isn't a directory!`));
            }
          }
        });
      })
      .catch((e) => reject(e));
  });
}

/**
 * Resolves dirPath if dir exists or rejects if it doesn't exist.
 * The difference between checkIfDirExists and isDirectory is that isDirectory will assume
 * that the file or dir exist and it will throw an error if it doesn't whereas checkIfDirExists
 * won't throw if it doesn't exist in the file system.
 * @param {String} dirPath
 * @returns
 */
export function dirExists(dirPath) {
  return new Promise((resolve, reject) => {
    isDirectory(dirPath)
      .then((isDir) => resolve(dirPath))
      .catch((e) => {
        reject(e);
      });
  });
}

/**
 * If the dir DOESN'T exist, it will resolve the dirPath, whereas if it exists, it will reject with an error.
 * It's the other way around of dirExists method.
 * @param {String} dirPath
 * @returns
 */
export function dirDoesntExist(dirPath) {
  return new Promise((resolve, reject) => {
    dirExists(dirPath)
      .then((dirPath) => reject(new Error(`Directory already exists.`)))
      .catch((e) => resolve(dirPath));
  });
}

/**
 * Creates a dir recursively. Resolves the dirPath if the creation was successfull or rejects if an error occurs
 * @param {*} dirPath
 * @returns
 */
export function createDir(dirPath) {
  return new Promise((resolve, reject) => {
    dirDoesntExist(dirPath)
      .then((notExists) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(dirPath);
          }
        });
      })
      .catch((e) =>
        reject(new Error("Cannot create the directory. It may already exist."))
      );
  });
}

/**
 *
 * @param {*} dirPath
 * @returns
 */
export function deleteDir(dirPath) {
  return new Promise((resolve, reject) => {
    dirExists(dirPath).then((exists) =>
      fs.rmdir(dirPath, { recursive: true, force: true }, (err) => {
        if (err) {
          reject(
            new Error(
              `Failed to delete folder due to the following error: ${err.message}`
            )
          );
        } else {
          resolve(dirPath);
        }
      })
    ).catch(e=>reject(new Error("Could not delete the folder. It may not exist.")));
  });
}
