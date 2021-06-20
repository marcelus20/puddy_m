
import {createFile} from "../src/fileFunctions";

test("createFile will resolve true if file doesn't exist", () => {
  return expect(
    createFile(".test-data/existing.file", "foo-bar")
  ).resolves.toBe(".test-data/existing.file");
});

test("createFile will reject if file exists", () => {
  return expect(
    createFile(".test-data/existing.file", "foo-bar")
  ).rejects.toThrow("Could not create the new file. It may already exist.");
});

test("createFile will reject if first parameter isn't string", () => {
  return expect(createFile(895, "foo-bar")).rejects.toThrow(
    "The passed argument isn't a string."
  );
});

test("createFile will reject if first parameter is undefined", () => {
  return expect(createFile(undefined, "foo-bar")).rejects.toThrow(
    "The passed argument isn't a string."
  );
});
