import {createFile, listDirContent} from "../src/fileFunctions";
import path from "path";

// the .data directory will be
const dirName = ".test-data";
const fileName = "sample.file";
const filePath = path.join(dirName, fileName);
const nonExistingDir = "foo";
const emptyDirectory = "empty";
const emptyDirPath = path.join(dirName, emptyDirectory);

test("listDirContent will resolve a list of strings if the file system directory isn't empty.", () => {
  return expect(
    createFile(filePath).then((created) => listDirContent(dirName))
  ).resolves.toEqual(["empty", "sample.file"]);
});

test("listDirContent will reject if the file system directory doesn't exsist.", () => {
  return expect(listDirContent(nonExistingDir)).rejects.toThrow(
    "ENOENT: no such file or directory, scandir 'foo'"
  );
});

test("listDirContent will reject if the file system directory is empty.", () => {
  return expect(listDirContent(emptyDirPath)).rejects.toThrow(
    "No files or folders were found in this directory. Directory location: .test-data/empty"
  );
});
