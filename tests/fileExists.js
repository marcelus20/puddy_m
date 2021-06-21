import { createFile, fileExists } from "../src/fileFunctions";

test("fileExists will reject when param file doesn't exist", () => {
  return expect(fileExists("./nonExistingFile")).rejects.toThrow(
    "File doesn't exist."
  );
});

test("fileExists will resolve true when param file doesn't exist", () => {
  return expect(fileExists("tests/readFile.test.js")).resolves.toBe(
    "tests/readFile.test.js"
  );
});

test("fileExists will reject when param is null", () => {
  return expect(fileExists(null)).rejects.toThrow(
    "The passed argument can't be null."
  );
});

test("fileExists will reject when param is not a string", () => {
  return expect(fileExists(true)).rejects.toThrow(
    "The passed argument isn't a string."
  );
});

test("fileExists will resolve to a tuple conatining the parameters of the chained promises if the tuple parameter is passed.", () => {
  return expect(
    createFile(".test-data/toCheckIfFileExists.file", "Some content here!", [])
      .then((tuple) => fileExists(".test-data/toCheckIfFileExists.file", tuple))
      .then((tuple) => fileExists(".test-data/toCheckIfFileExists.file", tuple))
      .then((tuple) => fileExists(".test-data/toCheckIfFileExists.file", tuple))
  ).resolves.toEqual([
    ".test-data/toCheckIfFileExists.file",
    ".test-data/toCheckIfFileExists.file",
    ".test-data/toCheckIfFileExists.file",
    ".test-data/toCheckIfFileExists.file",
  ]);
});
