import { createFile, dirExists } from "../src/fileFunctions";

test("checkIfDirExists will resolve true if parameter is a path to a directory", () => {
  return expect(dirExists(".test-data")).resolves.toBe(".test-data");
});

test("checkIfDirExists will reject if parameter is a path to a file", () => {
  return expect(
    createFile(".test-data/dirCheck1.file").then((created) =>
      dirExists(".test-data/dirCheck1.file")
    )
  ).rejects.toThrow("The .test-data/dirCheck1.file isn't a directory!");
});

test("checkIfDirExists will resolve false if parameter is a path to an inexisting dir or file", () => {
  return expect(dirExists(".test-data/inexistingDir1")).rejects.toThrow(`The given directory wasn't found. Directory: .test-data/inexistingDir1`);
});