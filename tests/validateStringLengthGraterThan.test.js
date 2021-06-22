import { StringLengthGreaterThanError } from "../src/models/errors";
import { validateStringLengthGreaterThan } from "../src/validators/complexValidators";

test("validateStringLengthGreaterThan should resolve if string length is greater than the integer length", () => {
    return expect(validateStringLengthGreaterThan("fooo", 3)).resolves.toBe("fooo");
  });

  test("validateStringLengthGreaterThan should reject if the string has same length as parameter.", () => {
    return expect(validateStringLengthGreaterThan("foo", 3)).rejects.toThrow(new StringLengthGreaterThanError("foo", 3));
  });

  test("validateStringLengthGreaterThan should reject if the string length is smaller than length param.", () => {
    return expect(validateStringLengthGreaterThan("fo", 3)).rejects.toThrow(new StringLengthGreaterThanError("fo", 3));
  });

  test("validateStringLengthGreaterThan should reject if the string length is smaller than length param.", () => {
    return expect(validateStringLengthGreaterThan("fo", 3)).rejects.toThrow(new StringLengthGreaterThanError("fo", 3));
  });