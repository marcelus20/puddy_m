import { StringLengthGreaterThanError, StringLengthLowerThanError, StringValidationError } from "../src/models/errors";
import { validateStringLengthLowerThan } from "../src/validators/complexValidators";

test("validateStringLengthLowerThan should resolve if string length is greater than the integer length", () => {
    return expect(validateStringLengthLowerThan("fooo", 5)).resolves.toBe("fooo");
  });

  test("validateStringLengthLowerThan should reject if the string has same length as parameter.", () => {
    return expect(validateStringLengthLowerThan("foo", 3)).rejects.toThrow(new StringLengthLowerThanError("foo", 3).message);
  });

  test("validateStringLengthLowerThan should resolve if the string length is smaller than length param.", () => {
    return expect(validateStringLengthLowerThan("fo", 3)).resolves.toBe("fo");
  });

  test("validateStringLengthLowerThan should reject if the string length is smaller than length param.", () => {
    return expect(validateStringLengthLowerThan({}, 3)).rejects.toThrow(new StringValidationError());
  });