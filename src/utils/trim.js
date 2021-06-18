/**
 * Resolves the trimmed version of the string passed as parameter or throws if the parameter isn't a string.
 * It won't check if parameter is indeed a string because this responsibility is for validateString.
 * @param {String} stringToTrim
 */
export default async function trim(stringToTrim) {
  return new Promise((resolve, reject) => {
    try {
      resolve(stringToTrim.trim());
    } catch (e) {
      reject(e);
    }
  });
}
