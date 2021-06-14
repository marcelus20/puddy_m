import validatesNotNull from "./validateNotNull";

/**
 * Resolves the supposedNumber if it is type of number.
 * If not type of number, then it rejects
 * @param {Number?} supposedNumber
 */
export default async function validateNumber(supposedNumber) {
  return new Promise((resolve, reject) => {
    validatesNotNull(supposedNumber)
      .then((supposedNumber) => {
        if (typeof supposedNumber == "number") {
          resolve(supposedNumber);
        } else {
          reject(new TypeError("The passed argument isn't a number."));
        }
      })
      .catch((err) => reject(err));
  });
}
