import { readFile } from "../src/fileFunctions";

test("readFile will reject when param is null", () => {
  return expect(readFile(null)).rejects.toThrow(
    "The passed argument can't be null."
  );
});

test("readFile will reject when param is null", () => {
  return expect(readFile(1)).rejects.toThrow("Parameter must be a string.");
});

test("readFile will reject when param is null", () => {
  return expect(readFile("./notExisting.file")).rejects.toThrow(
    "ENOENT: no such file or directory, open './notExisting.file'"
  );
});
