import { createFile, dirExists } from "../src/fileFunctions";

test("dirExists will resolve to file name if parameter is a path to a directory", () => {
  return expect(dirExists(".test-data")).resolves.toBe(".test-data");
});

test("dirExists will throw if parameter is a path to a file", () => {
  return expect(
    createFile(".test-data/dirCheck1.file").then((created) =>
      dirExists(".test-data/dirCheck1.file")
    )
  ).rejects.toThrow("The .test-data/dirCheck1.file isn't a directory!");
});

test("dirExists will throw if parameter is a path to an inexisting dir or file", () => {
  return expect(dirExists(".test-data/inexistingDir1")).rejects.toThrow(`The given directory wasn't found. Directory: .test-data/inexistingDir1`);
});

