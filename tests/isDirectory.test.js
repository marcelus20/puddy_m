import { createFile, isDirectory } from "../src/fileFunctions";

test("isDirectory will resolve true if parameter is a path to a directory", () => {
  return expect(isDirectory(".test-data")).resolves.toBe(".test-data");
});

test("isDirectory will reject if parameter is a path to a file", () => {
  return expect(
    createFile(".test-data/dirCheck.file").then((created) =>
      isDirectory(".test-data/dirCheck.file")
    )
  ).rejects.toThrow("The .test-data/dirCheck.file isn't a directory!");
});

test("isDirectory will reject if parameter is a path to an inexisting dir or file", () => {
  return expect(isDirectory(".test-data/inexistingDir")).rejects.toThrow(
    "The given directory wasn't found. Directory: .test-data/inexistingDir"
  );
});
