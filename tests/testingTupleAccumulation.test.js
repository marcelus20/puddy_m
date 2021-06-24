import { validateObject } from "../src/validators/complexValidators";
import {
  createDir,
  createFile,
  deleteDir,
  dirExists,
  fileExists,
  isDirectory,
  listDirContent,
  readFile,
  updateFile,
} from "../src/fileFunctions";
import {
  validateListOfInstance,
  validateListOfType,
} from "../src/validators/listValidators";
import {
  validateBoolean,
  validateInstance,
  validateNotInstance,
  validateNotNull,
  validateNotUndefined,
  validateNumber,
  validateString,
} from "../src/validators";

test("functions will resolve to a tuple conatining the parameters of the chained promises if the tuple parameter is passed.", () => {
  return expect(
    dirExists(".test-data", [])
      .then((tuple) =>
        createFile(
          ".test-data/toCreateToTestTuple.file",
          "testing tuple",
          tuple
        )
      )
      .then((tuple) => dirExists(".test-data", tuple))
      .then((tuple) => fileExists(".test-data/toCreateToTestTuple.file", tuple))
      .then((tuple) => createDir(".test-data/toDeleteToTestTuple", tuple))
      .then((tuple) => deleteDir(".test-data/toDeleteToTestTuple", tuple))
      .then((tuple) => isDirectory(".test-data", tuple))
      .then((tuple) => createDir(".test-data/toListToTestTuple", tuple))
      .then((tuple) => createDir(".test-data/toListToTestTuple/dir1", tuple))
      .then((tuple) => createDir(".test-data/toListToTestTuple/dir2", tuple))
      .then((tuple) => listDirContent(".test-data/toListToTestTuple", tuple))
      .then((tuple) => readFile(".test-data/toCreateToTestTuple.file", tuple))
      .then((tuple) =>
        updateFile(".test-data/toCreateToTestTuple.file", "tested tuple", tuple)
      )
      .then((tuple) => validateNotNull("Foo", tuple))
      .then((tuple) => validateNotUndefined("Bar", tuple))
      .then((tuple) => validateNumber(1, tuple))
      .then((tuple) => validateString("string-example", tuple))
      .then((tuple) => validateBoolean(true, tuple))
      .then((tuple) => validateObject({}, tuple))
      .then((tuple) => validateNotInstance(Array, "", tuple))
      .then((tuple) => validateInstance(Array, [""], tuple))
      .then((tuple) => validateListOfType("object", [{}], tuple))
      .then((tuple) => validateListOfInstance(Array, [[], []], tuple))
  ).resolves.toEqual([
    ".test-data",
    ".test-data/toCreateToTestTuple.file",
    ".test-data",
    ".test-data/toCreateToTestTuple.file",
    ".test-data/toDeleteToTestTuple",
    ".test-data/toDeleteToTestTuple",
    ".test-data",
    ".test-data/toListToTestTuple",
    ".test-data/toListToTestTuple/dir1",
    ".test-data/toListToTestTuple/dir2",
    ["dir1", "dir2"],
    "testing tuple",
    ".test-data/toCreateToTestTuple.file",
    "Foo",
    "Bar",
    1,
    "string-example",
    true,
    {},
    "",
    [""],
    [{}],
    [[], []],
  ]);
});
