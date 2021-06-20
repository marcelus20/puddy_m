import { createDir } from "../src/fileFunctions";

test("createDir should create folders recursively and resolve the path when all folders are created", () => {
  return expect(createDir(".test-data/a/b/c/d")).resolves.toBe(
    ".test-data/a/b/c/d"
  );
});

test("createDir should create a single folder and resolve the path if successful", () => {
  return expect(createDir(".test-data/single-folder")).resolves.toBe(
    ".test-data/single-folder"
  );
});

test("createDir should throw when folder already exists", () => {
  return expect(createDir(".test-data")).rejects.toThrow(
    "Cannot create the directory. It may already exist."
  );
});

