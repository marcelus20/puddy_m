import checkIfFileExists from "./checkIfFileExists";
import closeFile from "./closeFile";
import createFile from "./createFile";
import deleteFile from "./deleteFile";
import listDirContent from "./listDircontent";
import openFile from "./openFile";
import openFileToUpdate from "./openFileToUpdate";
import openFileToWrite from "./openFileToWrite";
import readFile from "./readFile";
import truncateFile from "./truncateFile";
import updateFile from "./updateFile";
import writeFile from "./writeFile";



const fileFunctions = {
  checkIfFileExists,
  closeFile,
  createFile,
  openFile,
  openFileToWrite,
  readFile,
  writeFile,
  openFileToUpdate,
  truncateFile,
  updateFile,
  deleteFile,
  listDirContent
};
export default fileFunctions;
