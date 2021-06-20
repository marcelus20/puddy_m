
import {deleteFile, createFile} from "../src/fileFunctions";

const fileName = ".test-data/toDelete.file";
const wrongFileName = ".test-data/toDelete___.file";

test("deleteFile will resolve fileName if file exists and is successfully deleted.", () => {
  return expect(
    createFile(fileName, "to delete").then((created) => deleteFile(fileName))
  ).resolves.toBe(fileName);
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
