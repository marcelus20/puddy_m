import "regenerator-runtime/runtime";
import createFile from "../src/fileFunctions/createFile";
import deleteFile from "../src/fileFunctions/deleteFile";

const fileName = ".test-data/toDelete.file";
const wrongFileName = ".test-data/toDelete___.file";

test("deleteFile will resolve true if file doesn't exist", () => {
  return expect(
    createFile(fileName, "to delete").then((created) => deleteFile(fileName))
  ).resolves.toBe(true);
});

test("deleteFile will reject if file doesn't exist", () => {
  return expect(deleteFile(wrongFileName)).rejects.toThrow(
    "Error deleting file. It may not exist."
  );
});

test("deleteFile will reject if parameter isn't string", () => {
  return expect(deleteFile(895)).rejects.toThrow(
    "The passed argument isn't a string."
  );
});

test("deleteFile will reject if first parameter is undefined", () => {
  return expect(deleteFile(undefined)).rejects.toThrow(
    "The passed argument isn't a string."
  );
});
