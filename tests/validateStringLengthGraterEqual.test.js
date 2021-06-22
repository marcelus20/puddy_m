import { StringLengthGreaterEqualError, StringLengthGreaterThanError, StringValidationError } from "../src/models/errors";
import { validateStringLengthGreaterEqual } from "../src/validators/complexValidators";

test("validateStringLengthGreaterThan should resolve if string length is greater than the integer length", () => {
    return expect(validateStringLengthGreaterEqual("fooo", 3)).resolves.toBe("fooo");
  });

  test("validateStringLengthGreaterThan should reject if the string has same length as parameter.", () => {
    return expect(validateStringLengthGreaterEqual("foo", 3)).resolves.toBe("foo");
  });

  test("validateStringLengthGreaterThan should reject if the string length is smaller than length param.", () => {
    return expect(validateStringLengthGreaterEqual("fo", 3)).rejects.toThrow(new StringLengthGreaterEqualError("fo", 3));
  });

  test("validateStringLengthGreaterThan should reject if parameter isn't a string.", () => {
    return expect(validateStringLengthGreaterEqual(null, 3)).rejects.toThrow(new StringValidationError().message);
  });