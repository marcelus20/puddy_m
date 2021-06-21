import { createDir, deleteDir } from "../src/fileFunctions";

test("deleteDir should delete folders recursively and resolve true when all folders are deleted", () => {
  return expect(
    createDir(".test-data/f/g/h/i").then((created) => deleteDir(".test-data/f"))
  ).resolves.toBe(".test-data/f");
});

test("deleteDir should delete a single folder and resolve true if successful", () => {
  return expect(
    createDir(".test-data/f/g/h/i").then((created) =>
      deleteDir(".test-data/f/g/h/i")
    )
  ).resolves.toBe(".test-data/f/g/h/i");
});

test("deleteDir should throw when folder already exists", () => {
  return expect(deleteDir(".test-data___")).rejects.toThrow(
    "Could not delete the folder. It may not exist."
  );
});
