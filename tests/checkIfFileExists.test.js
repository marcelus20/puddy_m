import "regenerator-runtime/runtime";
import checkIfFileExists from "../src/fileFunctions/checkIfFileExists";

test("checkIfFileExists will resolve false when param file doesn't exist", () => {
  return expect(checkIfFileExists("./nonExistingFile")).resolves.toBe(false);
});

test("checkIfFileExists will resolve true when param file doesn't exist", () => {
  return expect(checkIfFileExists("tests/readFile.test.js")).resolves.toBe(
    true
  );
});

test("checkIfFileExists will reject when param is null", () => {
  return expect(checkIfFileExists(null)).rejects.toThrow(
    "The passed argument can't be null."
  );
});

test("checkIfFileExists will reject when param is not a string", () => {
  return expect(checkIfFileExists(true)).rejects.toThrow(
    "The passed argument isn't a string."
  );
});
