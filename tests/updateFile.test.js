import { createFile, updateFile } from "../src/fileFunctions";

const fileName = ".test-data/toUpdate.file";

test("updateFile will resolve the fileName if file exists and update was successful", () => {
  return expect(
    createFile(fileName, "created...").then((created) =>
      updateFile(fileName, "Update 2")
    )
  ).resolves.toBe(fileName);
});

test("updateFile will reject if file doesn't exist", () => {
  return expect(
    updateFile(".test-data/toUpdate___.file", "Update 2")
  ).rejects.toThrow("Cannot update the file. It may not exist.");
});

test("updateFile will reject if first parameter isn't string", () => {
  return expect(updateFile(895, "Update 4")).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("updateFile will reject if first parameter is undefined", () => {
  return expect(updateFile(undefined, "Update 4")).rejects.toThrow(
    "Parameter must be a string."
  );
});

test("updateFile will reject if second parameter is null", () => {
  return expect(updateFile(fileName, null)).rejects.toThrow(
    "The passed argument can't be null."
  );
});

test("updateFile will reject if second parameter is undefined", () => {
  return expect(updateFile(fileName, undefined)).rejects.toThrow(
    "The passed argument can't be undefined."
  );
});
