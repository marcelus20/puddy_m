import validateNotNull from "../validations/validateNotNull";
import validateNotUndefined from "../validations/validateNotUndefined";
import fs from "fs";

export default async function closeFile(fileDescriptor) {
  return new Promise((resolve, reject) => {
    //validate file descriptor to not null
    validateNotNull(fileDescriptor)
      .then((fileDescriptor) => validateNotUndefined(fileDescriptor))
      .then((fileDescriptor) => {
        fs.close(fileDescriptor, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        });
      })
      .catch((e) => reject(e));
  });
}
